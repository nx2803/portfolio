import React, { useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTION_ORDER = ['intro', 'techstack', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'contact'];

interface Star {
  id: number;
  x: number; // 0 ~ 100
  y: number; // 0 ~ 100
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  layer: number; // 0: deep, 1: mid, 2: fore
}

interface ClickMarker {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  decay: number;
}

// 큐빅 베지어 (p1x, p1y, p2x, p2y) 수학적 해결 함수 (Newton-Raphson 기법)
function solveCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (x: number) {
    if (x === 0 || x === 1) return x;
    
    // X에 대한 t 근사치 수렴 계산
    let t = x;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * t * (1 - t) * (1 - t) * p1x + 3 * t * t * (1 - t) * p2x + t * t * t;
      const derivativeX = 3 * (1 - t) * (1 - t) * p1x + 6 * t * (1 - t) * (p2x - p1x) + 3 * t * t;
      if (Math.abs(currentX - x) < 1e-6) break;
      t -= (currentX - x) / derivativeX;
    }
    
    // 계산된 t를 기반으로 Y(가중치) 계산
    return 3 * t * (1 - t) * (1 - t) * p1y + 3 * t * t * (1 - t) * p2y + t * t * t;
  };
}

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  const activeIndex = SECTION_ORDER.indexOf(activeSection);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1000개 고해상도 별 데이터 생성 및 유지 (Canvas 최적화로 성능 저하 없음)
  const stars = useMemo<Star[]>(() => {
    const list: Star[] = [];
    const starCount = 1600;
    
    for (let i = 0; i < starCount; i++) {
      const rand = Math.random();
      const opacity = Math.random() * 0.6 + 0.4;
      const starBase = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        opacity,
      };

      if (rand < 0.65) {
        // Deep Space (Layer 0) - 원경 별 비중 확대 (65%)하여 깊이감 추가
        list.push({
          ...starBase,
          size: Math.random() * 0.5 + 0.3, // 0.3 ~ 0.8px (더욱 미세하게)
          layer: 0,
        });
      } else if (rand < 0.92) {
        // Mid Space (Layer 1) - 27%
        list.push({
          ...starBase,
          size: Math.random() * 0.6 + 1.0, // 1.0 ~ 1.6px
          layer: 1,
        });
      } else {
        // Fore Space (Layer 2) - 8%
        list.push({
          ...starBase,
          size: Math.random() * 1.0 + 1.6, // 1.6 ~ 2.6px
          layer: 2,
        });
      }
    }
    return list;
  }, []);

  // 실시간 패럴랙스 오프셋 좌표 보존 Ref
  const curOffsetsRef = useRef({
    deep: activeIndex * -5,
    mid: activeIndex * -10,
    fore: activeIndex * -18
  });

  // 전환 물리 정보 관리 Ref
  const transitionRef = useRef({
    startXDeep: activeIndex * -5,
    startXMid: activeIndex * -10,
    startXFore: activeIndex * -18,
    targetXDeep: activeIndex * -5,
    targetXMid: activeIndex * -10,
    targetXFore: activeIndex * -18,
    startTime: 0,
    isTransitioning: false
  });

  // 실시간 마우스 오프셋 좌표 및 물리 보간 관리 Ref
  const mousePosRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  const clickMarkersRef = useRef<ClickMarker[]>([]);

  const lastActiveIndex = useRef(activeIndex);

  // activeIndex가 변경될 때마다 이전 물리 위치를 이어받아 큐빅 베지어 전환 궤적 가동
  useEffect(() => {
    if (activeIndex !== lastActiveIndex.current) {
      const trans = transitionRef.current;
      const cur = curOffsetsRef.current;

      // 현재 렌더링되던 실시간 물리 좌표를 전환 시작점으로 확보
      trans.startXDeep = cur.deep;
      trans.startXMid = cur.mid;
      trans.startXFore = cur.fore;

      // 다음 목표 오프셋 지정
      trans.targetXDeep = activeIndex * -5;
      trans.targetXMid = activeIndex * -10;
      trans.targetXFore = activeIndex * -18;

      trans.startTime = performance.now();
      trans.isTransitioning = true;

      lastActiveIndex.current = activeIndex;
    }
  }, [activeIndex]);

  // 마우스 무브 이벤트 감지 등록 (터치 디바이스 제외)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // 화면 중앙(0,0) 기준으로 -0.5 ~ 0.5 오프셋 비율 연산
      mousePosRef.current.targetX = (e.clientX / w) - 0.5;
      mousePosRef.current.targetY = (e.clientY / h) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 클릭 시 나사펑크 텔레메트리 마커 생성 이벤트 감지 (터치 디바이스 제외)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // 액센트 컬러 동기화
      let accent = '#ffffff';
      if (activeSection === 'peecemaker') {
        accent = '#fb923c';
      } else if (activeSection === 'fortheteam') {
        accent = '#e23645';
      } else if (activeSection === 'ufc') {
        accent = '#00ff41';
      }

      // 클릭 지점에 초대형으로 스윕하는 레이더 타겟 마커 단일 생성
      clickMarkersRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 360, // 적정 레이더 반경 (지름 720px)
        color: accent,
        alpha: 0.85, // 은은하지만 선명하게 보이는 시작 불투명도 복구
        decay: 0.0095 // 약 1.2초 동안 서서히 사라지도록 최적화
      });
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [activeSection]);

  // 애니메이션 루프 및 캔버스 드로잉
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // 기존 framer-motion Easing [0.16, 1, 0.3, 1]과 수학적으로 100% 동일한 곡선 베지어
    const easeOutExpo = solveCubicBezier(0.16, 1, 0.3, 1);

    // 창 크기 조절 대응 및 DPR 반영 함수
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // 최초 실행

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // 초 단위 경과 시간
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 화면 지우기 (배경색 검은색 유지)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      const trans = transitionRef.current;
      const cur = curOffsetsRef.current;
      const mouse = mousePosRef.current;

      // 1.2초 전환 큐빅 베지어 보간 연산
      if (trans.isTransitioning) {
        const transElapsed = (now - trans.startTime) / 1000;
        const duration = 1.2; // 1.2초 듀레이션
        const progress = Math.min(transElapsed / duration, 1);
        
        const easeFactor = easeOutExpo(progress);

        cur.deep = trans.startXDeep + (trans.targetXDeep - trans.startXDeep) * easeFactor;
        cur.mid = trans.startXMid + (trans.targetXMid - trans.startXMid) * easeFactor;
        cur.fore = trans.startXFore + (trans.targetXFore - trans.startXFore) * easeFactor;

        if (progress === 1) {
          trans.isTransitioning = false;
        }
      } else {
        // 전환 중이 아닐 때는 타겟 값 유지
        cur.deep = activeIndex * -5;
        cur.mid = activeIndex * -10;
        cur.fore = activeIndex * -18;
      }

      // 마우스 오프셋 댐핑 적용 (은은하고 묵직한 Lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 별 그리기 루프
      stars.forEach((star) => {
        // 레이어별 X 패럴랙스 오프셋 적용
        let layerOffsetX = 0;
        let layerWidthFactor = 1.0;
        
        if (star.layer === 0) {
          // deep layer: left: -30vw, width: 160vw (마지막 섹션 패럴랙스 방어)
          layerOffsetX = (cur.deep / 100) * w;
          layerWidthFactor = 1.6;
        } else if (star.layer === 1) {
          // mid layer: left: -70vw, width: 240vw (마지막 섹션 패럴랙스 방어)
          layerOffsetX = (cur.mid / 100) * w;
          layerWidthFactor = 2.4;
        } else {
          // fore layer: left: -120vw, width: 340vw (마지막 섹션 패럴랙스 방어)
          layerOffsetX = (cur.fore / 100) * w;
          layerWidthFactor = 3.4;
        }

        // 별의 초기 좌측 여백(left) 보정 (마지막 섹션 X축 공백 영구 방어)
        let baseLeft = 0;
        if (star.layer === 0) baseLeft = -0.30 * w;
        else if (star.layer === 1) baseLeft = -0.70 * w;
        else baseLeft = -1.20 * w;

        // 마우스 3D 패럴랙스 오프셋 계산 (가중치 2.3배 이상 증폭)
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        if (star.layer === 0) {
          mouseOffsetX = mouse.x * 30; // deep: 가로 최대 15px
          mouseOffsetY = mouse.y * 20;
        } else if (star.layer === 1) {
          mouseOffsetX = mouse.x * 65; // mid: 가로 최대 32.5px
          mouseOffsetY = mouse.y * 45;
        } else {
          mouseOffsetX = mouse.x * 120; // fore: 가로 최대 60px
          mouseOffsetY = mouse.y * 80;
        }

        // 최종 그릴 x, y 좌표 구하기 (스크롤 패럴랙스 + 마우스 패럴랙스 결합)
        const starXPercent = star.x / 100;
        const starYPercent = star.y / 100;

        const x = baseLeft + (starXPercent * w * layerWidthFactor) + layerOffsetX - mouseOffsetX;
        const y = starYPercent * h - mouseOffsetY;

        // Twinkle(반짝임) 투명도 연산
        const t = elapsed;
        const minOpacity = star.opacity * 0.2;
        const maxOpacity = star.opacity;
        const cycle = t / star.duration;
        const cycleProgress = (cycle + star.delay / star.duration) % 1;
        
        const sinVal = Math.sin(cycleProgress * Math.PI * 2);
        const currentOpacity = minOpacity + (maxOpacity - minOpacity) * (sinVal * 0.5 + 0.5);

        // 별 그리기
        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);

        if (star.layer === 2) {
          // 가까운 별은 글로우 섀도우 효과 추가
          ctx.save();
          ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
        }
      });

      // 🌌 나사펑크 레이더 스윕 펄스 업데이트 및 렌더링
      const markers = clickMarkersRef.current;
      for (let i = markers.length - 1; i >= 0; i--) {
        const m = markers[i];
        
        // 초대형 스케일에 걸맞은 극도로 부드러운 감속 팽창 이징 (0.035)
        m.radius += (m.maxRadius - m.radius) * 0.035;
        m.alpha -= m.decay;

        if (m.alpha <= 0) {
          markers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 1.0;

        // 1. 첫 번째 메인 레이더 팽창 링 (선명도 확보)
        ctx.globalAlpha = m.alpha * 0.72;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.stroke();

        // 2. 두 번째 지연 링
        const secondRadius = m.radius * 0.68;
        if (secondRadius > 5) {
          ctx.globalAlpha = m.alpha * 0.45;
          ctx.beginPath();
          ctx.arc(m.x, m.y, secondRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 3. 바깥쪽 점선 보조 레이더 가이드 링 (1.35배 크기)
        const outerRadius = m.radius * 1.35;
        ctx.strokeStyle = m.color;
        ctx.globalAlpha = m.alpha * 0.25;
        ctx.beginPath();
        ctx.arc(m.x, m.y, outerRadius, 0, Math.PI * 2);
        ctx.setLineDash([3, 8]);
        ctx.stroke();
        ctx.setLineDash([]); // 대시 복구

        // 4. 레이더 방위각 눈금선 (동서남북 4군데 틱, 스케일에 비례해 8px 크기 확보)
        ctx.globalAlpha = m.alpha * 0.32;
        ctx.beginPath();
        // 북
        ctx.moveTo(m.x, m.y - m.radius - 8);
        ctx.lineTo(m.x, m.y - m.radius + 2);
        // 남
        ctx.moveTo(m.x, m.y + m.radius + 8);
        ctx.lineTo(m.x, m.y + m.radius - 2);
        // 서
        ctx.moveTo(m.x - m.radius - 8, m.y);
        ctx.lineTo(m.x - m.radius + 2, m.y);
        // 동
        ctx.moveTo(m.x + m.radius + 8, m.y);
        ctx.lineTo(m.x + m.radius - 2, m.y);
        ctx.stroke();

        ctx.restore();
      }
      ctx.globalAlpha = 1.0; // 복구

      // 그라데이션 오버레이 레이어 그리기
      const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, activeIndex]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* ── 단일 고성능 CANVAS ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ── FOR THE TEAM: 정적 브루탈리스트 타이포그래피 백플레이트 (동일하게 유지) ── */}
      <AnimatePresence>
        {activeSection === 'fortheteam' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex flex-col justify-center gap-6 isolate"
            style={{
              fontFamily: '"Oswald", sans-serif',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            {/* 1행: 좌측 무한 루프 스크롤 */}
            <div
              className="flex whitespace-nowrap animate-ticker-left"
              style={{
                animationDuration: '40s',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
            </div>

            {/* 2행: 우측 무한 루프 스크롤 */}
            <div
              className="flex whitespace-nowrap animate-ticker-right"
              style={{
                animationDuration: '48s',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
            </div>

            {/* 3행: 좌측 무한 루프 스크롤 */}
            <div
              className="flex whitespace-nowrap animate-ticker-left"
              style={{
                animationDuration: '36s',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
            </div>

            {/* 4행: 우측 무한 루프 스크롤 */}
            <div
              className="flex whitespace-nowrap animate-ticker-right"
              style={{
                animationDuration: '44s',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
            </div>

            {/* 5행: 좌측 무한 루프 스크롤 */}
            <div
              className="flex whitespace-nowrap animate-ticker-left"
              style={{
                animationDuration: '32s',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
              <span
                className="text-[8rem] md:text-[13rem] font-bold italic uppercase tracking-tighter leading-none text-transparent shrink-0"
                style={{
                  WebkitTextStroke: '1.4px #e23645',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                FOR THE TEAM FOR THE TEAM FOR THE TEAM FOR THE TEAM&nbsp;
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
