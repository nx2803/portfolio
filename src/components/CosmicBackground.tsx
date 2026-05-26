import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTION_ORDER = ['intro', 'techstack', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'contact'];

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  const activeIndex = SECTION_ORDER.indexOf(activeSection);

  // 3개 레이어로 별 분배 생성 (먼 별, 중간 별, 가까운 별)
  const [deepStars, midStars, foreStars] = useMemo(() => {
    const deep: any[] = [];
    const mid: any[] = [];
    const fore: any[] = [];

    for (let i = 0; i < 400; i++) {
      const star = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 6 + 4, 
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.4 
      };

      const rand = Math.random();
      if (rand < 0.5) {
        // 50% 먼 별 (Deep Layer)
        deep.push({
          ...star,
          size: Math.random() * 0.6 + 0.5, // 0.5 ~ 1.1px
        });
      } else if (rand < 0.88) {
        // 38% 중간 별 (Mid Layer)
        mid.push({
          ...star,
          size: Math.random() * 0.7 + 1.1, // 1.1 ~ 1.8px
        });
      } else {
        // 12% 가까운 별 (Fore Layer)
        fore.push({
          ...star,
          size: Math.random() * 1.2 + 1.8, // 1.8 ~ 3.0px
        });
      }
    }

    return [deep, mid, fore];
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">

      {/* ── STARS MULTI-LAYER PARALLAX ── */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Layer 1: 먼 별 (Deep Space) — 느린 패럴랙스 (x 가중치 -1.8vw), 꼬리 없음 */}
        <motion.div
          animate={{ x: activeIndex * -1.8 + 'vw' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[120vw] h-[100vh] left-[-10vw] top-0 pointer-events-none"
        >
          {deepStars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                '--twinkle-duration': `${star.duration}s`,
                '--twinkle-delay': `${star.delay}s`,
                '--twinkle-min-opacity': star.opacity * 0.2,
                '--twinkle-max-opacity': star.opacity
              } as React.CSSProperties}
            />
          ))}
        </motion.div>

        {/* Layer 2: 중간 별 (Mid Space) — 중간 패럴랙스 (x 가중치 -3.8vw), 꼬리 없음 */}
        <motion.div
          animate={{ x: activeIndex * -3.8 + 'vw' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[135vw] h-[100vh] left-[-17.5vw] top-0 pointer-events-none"
        >
          {midStars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                '--twinkle-duration': `${star.duration}s`,
                '--twinkle-delay': `${star.delay}s`,
                '--twinkle-min-opacity': star.opacity * 0.2,
                '--twinkle-max-opacity': star.opacity
              } as React.CSSProperties}
            />
          ))}
        </motion.div>

        {/* Layer 3: 가까운 별 (Fore Space) — 빠른 패럴랙스 (x 가중치 -7.5vw), 꼬리 없음 */}
        <motion.div
          animate={{ x: activeIndex * -7.5 + 'vw' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[155vw] h-[100vh] left-[-27.5vw] top-0 pointer-events-none"
        >
          {foreStars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: `0 0 10px rgba(255,255,255,0.7)`,
                '--twinkle-duration': `${star.duration}s`,
                '--twinkle-delay': `${star.delay}s`,
                '--twinkle-min-opacity': star.opacity * 0.2,
                '--twinkle-max-opacity': star.opacity
              } as React.CSSProperties}
            />
          ))}
        </motion.div>
      </div>

      {/* ── SECTION COLOR VIGNETTE ── */}
      <motion.div
        className="absolute inset-0 transition-colors duration-1000"
        animate={{
          background: `radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 100%)`
        }}
      />

      {/* ── FOR THE TEAM: 정적 브루탈리스트 타이포그래피 백플레이트 ── */}
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
