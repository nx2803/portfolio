import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript,
  SiNestjs, SiPython, SiFastapi, SiPostgresql,
  SiPrisma, SiDocker, SiFlutter, SiSpringboot
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const techGroups = [
  {
    category: "FRONTEND_CORE",
    items: [
      { name: 'TYPESCRIPT', icon: SiTypescript },
      { name: 'NEXT.JS', icon: SiNextdotjs },
      { name: 'REACT', icon: SiReact },
      { name: 'FLUTTER', icon: SiFlutter },
    ]
  },
  {
    category: "BACKEND_INFRA",
    items: [
      { name: 'JAVA', icon: FaJava },
      { name: 'SPRING BOOT', icon: SiSpringboot },
      { name: 'NESTJS', icon: SiNestjs },
      { name: 'PYTHON', icon: SiPython },
    ]
  },
  {
    category: "DATA_LAYER",
    items: [
      { name: 'FASTAPI', icon: SiFastapi },
      { name: 'POSTGRESQL', icon: SiPostgresql },
      { name: 'PRISMA', icon: SiPrisma },
      { name: 'DOCKER', icon: SiDocker },
    ]
  }
];

export default function TechStackSection() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="techstack" className="h-screen" />;

  return (
    <section id="techstack" className="w-full h-full relative flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 pt-24 pb-28 lg:pt-[8.5dvh] lg:pb-[3.5dvh] overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-transparent text-(--foreground)" style={{ WebkitOverflowScrolling: 'touch' }}>

      <div className="w-full max-w-[1800px] flex flex-col justify-center relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-10 md:mb-16 flex items-center gap-8 relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-3xl md:text-6xl font-display font-extrabold uppercase tracking-tight shrink-0 text-white"
          >
            TECH STACK
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: easing, delay: 0.3 }}
            className="h-px bg-linear-to-r from-[#D4AF37]/60 via-white/20 to-transparent flex-1 origin-left mt-2"
          />
        </div>

        {/* ── ROWS ── */}
        <div className="flex flex-col relative border-t border-white/10">
          {techGroups.map((group, groupIdx) => (
            <div key={group.category} className="group relative w-full py-10 md:py-14 border-b border-white/10">

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: easing, delay: groupIdx * 0.15 + 0.5 }}
                className="absolute top-0 left-0 w-full h-px bg-[#D4AF37]/20 origin-left"
              />

              {/* Category Label */}
              <div className="flex items-center gap-4 mb-8">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.8, delay: groupIdx * 0.2 + 1.2 }}
                  className="text-xs md:text-sm font-display tracking-[0.35em] font-semibold text-[#D4AF37] uppercase"
                >
                  {group.category.replace('_', ' ')}
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: groupIdx * 0.2 + 0.6, duration: 0.8 }}
                  className="h-px w-12 bg-[#D4AF37]/50 origin-left"
                />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 md:gap-x-24 gap-y-10">
                {group.items.map((tech, techIdx) => (
                  <div key={tech.name} className="flex items-center gap-6 md:gap-8 group/item cursor-pointer min-w-0">
                    <div className="relative shrink-0">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1, delay: 1.5 + techIdx * 0.05 }}
                      >
                        <tech.icon className="text-5xl md:text-7xl lg:text-[80px] text-white/80 group-hover/item:text-[#D4AF37] group-hover/item:scale-105 transition-all duration-500 drop-shadow-[0_0_25px_rgba(212,175,55,0.15)]" />
                      </motion.div>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.6 + techIdx * 0.05 }}
                        className="text-xl md:text-3xl font-display font-bold tracking-tight leading-none uppercase text-white/90 group-hover/item:text-[#E5C378] transition-colors truncate"
                      >
                        {tech.name}
                      </motion.span>

                      <div className="h-0.5 bg-white/10 mt-3 relative overflow-hidden rounded-full">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1 + techIdx * 0.05, duration: 1.5, ease: easing }}
                          className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-[#D4AF37] to-[#E5C378] opacity-80 origin-left"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER SYSTEM LOG ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-10 flex justify-between items-center text-xs font-display tracking-widest text-white/60"
        >
          <div className="flex items-center gap-6">
            <span className="font-semibold text-[#D4AF37]">SYSTEM ARCHITECTURE INTEGRITY</span>
            <div className="hidden md:flex gap-1.5 opacity-60">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-0.5 bg-[#D4AF37]" />
              ))}
            </div>
          </div>
          <span className="hidden md:block tracking-[0.3em] uppercase">OPERATIONAL // OPTIMIZED</span>
        </motion.div>

      </div>
    </section>
  );
}
