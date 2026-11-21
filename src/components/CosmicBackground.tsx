import React, { useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number; // 0 ~ 100 (% of canvas width)
  y: number; // 0 ~ 100 (% of canvas height)
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

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 별 데이터 생성 (1600개, 3레이어)
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
        list.push({ ...starBase, size: Math.random() * 0.5 + 0.3, layer: 0 });
      } else if (rand < 0.92) {
        list.push({ ...starBase, size: Math.random() * 0.6 + 1.0, layer: 1 });
      } else {
        list.push({ ...starBase, size: Math.random() * 1.0 + 1.6, layer: 2 });
      }
    }
    return list;
  }, []);

  // 스크롤 Y 위치를 Ref로 추적 (렌더 루프가 직접 읽음)
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);

  // 마우스 오프셋 Ref
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const clickMarkersRef = useRef<ClickMarker[]>([]);

  // 스크롤 이벤트 등록 (passive, 직접 ref만 갱신)
  useEffect(() => {
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 마우스 무브 이벤트 (터치 디바이스 제외)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mousePosRef.current.targetX = (e.clientX / w) - 0.5;
      mousePosRef.current.targetY = (e.clientY / h) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 애니메이션 루프 & 캔버스 드로잉
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 스크롤 Y를 부드럽게 Lerp (관성 느낌)
      scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.06;
      const scrollY = scrollYRef.current;

      // 마우스 오프셋 댐핑
      const mouse = mousePosRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 배경 클리어
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // 별 그리기
      stars.forEach((star) => {
        // ── 세로 패럴랙스 오프셋 (레이어별 속도 차등) ──
        // deep: 느리게 올라감 (0.08), mid: 중간 (0.15), fore: 빠르게 (0.25)
        let scrollOffsetY = 0;
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;

        if (star.layer === 0) {
          scrollOffsetY = scrollY * 0.08;
          mouseOffsetX = mouse.x * 30;
          mouseOffsetY = mouse.y * 20;
        } else if (star.layer === 1) {
          scrollOffsetY = scrollY * 0.15;
          mouseOffsetX = mouse.x * 65;
          mouseOffsetY = mouse.y * 45;
        } else {
          scrollOffsetY = scrollY * 0.25;
          mouseOffsetX = mouse.x * 120;
          mouseOffsetY = mouse.y * 80;
        }

        // 별의 최종 화면 좌표 계산
        // Y: 화면 높이 기준으로 별 위치 + 패럴랙스 오프셋 → 위로 올라가는 효과
        // 화면 밖으로 나가면 반대편에서 순환 (모듈로 연산)
        const rawX = (star.x / 100) * w - mouseOffsetX;
        const rawY = ((star.y / 100) * h) - (scrollOffsetY % h) - mouseOffsetY;

        // Y가 화면 위로 벗어나면 아래에서 다시 등장 (tiling)
        const x = rawX;
        const y = ((rawY % h) + h) % h;

        // Twinkle 투명도
        const cycle = elapsed / star.duration;
        const cycleProgress = (cycle + star.delay / star.duration) % 1;
        const sinVal = Math.sin(cycleProgress * Math.PI * 2);
        const minOpacity = star.opacity * 0.2;
        const maxOpacity = star.opacity;
        const currentOpacity = minOpacity + (maxOpacity - minOpacity) * (sinVal * 0.5 + 0.5);

        // 별 렌더링
        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);

        if (star.layer === 2) {
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

      // 방사형 그라데이션 오버레이 (중심부 약간 밝게, 가장자리 어둡게)
      const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(7, 7, 10, 0)');
      grad.addColorStop(0.5, 'rgba(7, 7, 10, 0.2)');
      grad.addColorStop(1, 'rgba(7, 7, 10, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* 단일 고성능 CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* FOR THE TEAM: 브루탈리스트 타이포그래피 배경 플레이트 */}
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
            {[
              { dir: 'left', dur: '40s' },
              { dir: 'right', dur: '48s' },
              { dir: 'left', dur: '36s' },
              { dir: 'right', dur: '44s' },
              { dir: 'left', dur: '32s' },
            ].map(({ dir, dur }, i) => (
              <div
                key={i}
                className={`flex whitespace-nowrap ${dir === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'}`}
                style={{ animationDuration: dur, willChange: 'transform', transform: 'translateZ(0)' }}
              >
                {[0, 1].map((j) => (
                  <span
                    key={j}
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
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
