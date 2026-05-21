import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  // 별 입자 생성 
  const stars = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      id: i,
      size: Math.random() > 0.95 ? Math.random() * 1.5 + 1.5 : Math.random() * 1 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 4, 
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.4 
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">

      {/* ── STARS (화면 전체에 400개를 응축, 확실한 반짝임) ── */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              boxShadow: star.size > 1.5 ? `0 0 8px rgba(255,255,255,0.6)` : 'none',
              '--twinkle-duration': `${star.duration}s`,
              '--twinkle-delay': `${star.delay}s`,
              '--twinkle-min-opacity': star.opacity * 0.2,
              '--twinkle-max-opacity': star.opacity
            } as React.CSSProperties}
          />
        ))}
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
            {/* 1행: 좌측 무한 루프 스크롤 (Double Span 구조로 무한 연결) */}
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
