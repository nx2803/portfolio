import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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
    </div>
  );
}
