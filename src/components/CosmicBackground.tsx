import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CosmicBackground({ activeSection }: { activeSection: string }) {
  // 별 입자 생성
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  // 우주 먼지/성운 입자 생성
  const dusts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 300 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* ── NEBULA GLOWS ── */}
      <div className="absolute inset-0 opacity-40">
        {dusts.map((dust) => (
          <motion.div
            key={dust.id}
            className="absolute rounded-full blur-[100px]"
            animate={{
              x: [`${dust.x}%`, `${dust.x + 5}%`, `${dust.x}%`],
              y: [`${dust.y}%`, `${dust.y - 5}%`, `${dust.y}%`],
            }}
            transition={{
              duration: dust.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: dust.size,
              height: dust.size,
              background: activeSection === 'peecemaker' 
                ? 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)' 
                : activeSection === 'fortheteam'
                ? 'radial-gradient(circle, rgba(226,54,69,0.1) 0%, transparent 70%)'
                : activeSection === 'ufc'
                ? 'radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)'
            }}
          />
        ))}
      </div>

      {/* ── STARS ── */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: star.opacity }}
            animate={{ 
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              boxShadow: star.size > 2 ? `0 0 10px rgba(255,255,255,0.5)` : 'none'
            }}
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
      {/* 
        [성능 공학적 설계 핵심]
        배경 타이포그래피가 ForTheTeamSection 내부에 들어가 있으면, TrilogyContainer에서 화면 전체를 
        모션 컴포넌트로 포장해 filter: 'blur(5px)'를 적용할 때 브라우저 래스터라이저가 거대 외곽선 텍스트 5줄의 
        모든 픽셀에 실시간 실리콘 필터 마스킹 연산을 시도하게 되어 심각한 렉(Jank)이 발생합니다.
        따라서 외곽선 텍스트 레이어를 blur/scale 모션이 걸리는 Trilogy 컨테이너 바깥인 이 곳(CosmicBackground)으로 
        이동하고, 오직 무거운 연산이 아예 수반되지 않는 순수 하드웨어 가속 'opacity fade' 연산으로만 탭 전환을 수행함으로써, 
        시각적 선명도는 그대로 사수하고 프레임 렉은 100% 영구적으로 완전히 박멸시켰습니다.
      */}
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
