import { useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Star {
  x: number; // 0 ~ 100 (% of canvas width)
  y: number; // 0 ~ 100 (% of canvas height)
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/** 레이어별 패럴랙스 계수: [스크롤, 마우스X, 마우스Y] */
const LAYER_FACTORS: [number, number, number][] = [
  [0.08, 30, 20], // deep
  [0.15, 65, 45], // mid
  [0.25, 120, 80], // fore
];

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  // 별 데이터 생성 (1,600개, 3레이어로 그룹화해 프레임당 순회를 1회씩만)
  const starLayers = useMemo<Star[][]>(() => {
    const layers: Star[][] = [[], [], []];

    for (let i = 0; i < 1600; i++) {
      const rand = Math.random();
      const opacity = Math.random() * 0.6 + 0.4;
      const starBase = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        opacity,
      };

      if (rand < 0.65) {
        layers[0].push({ ...starBase, size: Math.random() * 0.5 + 0.3 });
      } else if (rand < 0.92) {
        layers[1].push({ ...starBase, size: Math.random() * 0.6 + 1.0 });
      } else {
        layers[2].push({ ...starBase, size: Math.random() * 1.0 + 1.6 });
      }
    }
    return layers;
  }, []);

  // 스크롤 Y 위치를 Ref로 추적 (렌더 루프가 직접 읽음)
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);

  // 마우스 오프셋 Ref
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 스크롤 이벤트 등록 (passive, 직접 ref만 갱신)
  useEffect(() => {
    if (reduceMotion) return;
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduceMotion]);

  // 마우스 무브 이벤트 (터치 디바이스 제외)
  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mousePosRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  // 애니메이션 루프 & 캔버스 드로잉
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const startTime = performance.now();

    const draw = (now: number) => {
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

      // ── 레이어 단위 배칭: fillStyle/shadowBlur를 별마다 바꾸지 않는다 ──
      for (let layer = 0; layer < starLayers.length; layer++) {
        const list = starLayers[layer];
        if (!list.length) continue;

        const [scrollFactor, mouseFactorX, mouseFactorY] = LAYER_FACTORS[layer];
        const scrollOffsetY = reduceMotion ? 0 : scrollY * scrollFactor;
        const mouseOffsetX = reduceMotion ? 0 : mouse.x * mouseFactorX;
        const mouseOffsetY = reduceMotion ? 0 : mouse.y * mouseFactorY;

        ctx.save();
        ctx.fillStyle = '#ffffff';
        if (layer === 2) {
          // 밝은 별만 광채 — 레이어 전체에 1회만 설정
          ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
          ctx.shadowBlur = 6;
        }

        for (let i = 0; i < list.length; i++) {
          const star = list[i];

          const rawX = (star.x / 100) * w - mouseOffsetX;
          const rawY = ((star.y / 100) * h) - (scrollOffsetY % h) - mouseOffsetY;

          // 화면 밖(Y)으로 나가면 반대편에서 순환 (tiling)
          const x = rawX;
          const y = ((rawY % h) + h) % h;

          let opacity = star.opacity;

          if (!reduceMotion) {
            // Twinkle 투명도
            const cycle = elapsed / star.duration;
            const cycleProgress = (cycle + star.delay / star.duration) % 1;
            const sinVal = Math.sin(cycleProgress * Math.PI * 2);
            const minOpacity = star.opacity * 0.2;
            opacity = minOpacity + (star.opacity - minOpacity) * (sinVal * 0.5 + 0.5);
          }

          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.globalAlpha = 1;

      // 방사형 그라데이션 오버레이 (중심부 약간 밝게, 가장자리 어둡게)
      const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(7, 7, 10, 0)');
      grad.addColorStop(0.5, 'rgba(7, 7, 10, 0.2)');
      grad.addColorStop(1, 'rgba(7, 7, 10, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      // 모션 감소 설정에서는 정지된 1프레임만 유지
      if (reduceMotion) draw(performance.now());
    };

    const loop = (now: number) => {
      draw(now);
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    if (!reduceMotion) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starLayers, reduceMotion]);

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
