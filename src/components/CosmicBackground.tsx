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

  // 400개 별 데이터 생성 및 유지
  const stars = useMemo<Star[]>(() => {
    const list: Star[] = [];
    for (let i = 0; i < 400; i++) {
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

      if (rand < 0.5) {
        // Deep Space (Layer 0)
        list.push({
          ...starBase,
          size: Math.random() * 0.6 + 0.5,
          layer: 0,
        });
      } else if (rand < 0.88) {
        // Mid Space (Layer 1)
        list.push({
          ...starBase,
          size: Math.random() * 0.7 + 1.1,
          layer: 1,
        });
      } else {
        // Fore Space (Layer 2)
        list.push({
          ...starBase,
          size: Math.random() * 1.2 + 1.8,
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

      // 별 그리기 루프
      stars.forEach((star) => {
        // 레이어별 X 패럴랙스 오프셋 적용
        let layerOffsetX = 0;
        let layerWidthFactor = 1.0;
        
        if (star.layer === 0) {
          // deep layer: left: -20vw, width: 140vw
          layerOffsetX = (cur.deep / 100) * w;
          layerWidthFactor = 1.4;
        } else if (star.layer === 1) {
          // mid layer: left: -35vw, width: 170vw
          layerOffsetX = (cur.mid / 100) * w;
          layerWidthFactor = 1.7;
        } else {
          // fore layer: left: -55vw, width: 210vw
          layerOffsetX = (cur.fore / 100) * w;
          layerWidthFactor = 2.1;
        }

        // 별의 초기 좌측 여백(left) 보정
        let baseLeft = 0;
        if (star.layer === 0) baseLeft = -0.20 * w;
        else if (star.layer === 1) baseLeft = -0.35 * w;
        else baseLeft = -0.55 * w;

        // 최종 그릴 x, y 좌표 구하기
        const starXPercent = star.x / 100;
        const starYPercent = star.y / 100;

        const x = baseLeft + (starXPercent * w * layerWidthFactor) + layerOffsetX;
        const y = starYPercent * h;

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
