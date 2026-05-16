import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss,
  SiNestjs, SiPython, SiFastapi, SiPostgresql, SiRedis,
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
    <section id="techstack" className="w-full h-screen relative flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 overflow-hidden bg-transparent text-(--foreground)">
      
      <div className="w-full max-w-[1800px] flex flex-col justify-center relative z-10">
        
        {/* ── HEADER ── */}
        <div className="mb-10 md:mb-16 flex items-center gap-10 relative overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-3xl md:text-6xl font-black uppercase tracking-tighter shrink-0"
          >
            TECH_STACK
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: easing, delay: 0.3 }}
            className="h-1.5 bg-current opacity-40 flex-1 origin-left"
          />
        </div>

        {/* ── ROWS ── */}
        <div className="flex flex-col relative border-t-2 border-current/10">
          {techGroups.map((group, groupIdx) => (
            <div key={group.category} className="group relative w-full py-10 md:py-14 border-b-2 border-current/10">
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: easing, delay: groupIdx * 0.15 + 0.5 }}
                className="absolute top-0 left-0 w-full h-px bg-current opacity-20 origin-left"
              />

              {/* Category Label (Tightened //) */}
              <div className="flex items-center gap-6 mb-8">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 0.8, delay: groupIdx * 0.2 + 1.2 }}
                  className="text-xs md:text-sm font-mono tracking-[0.5em] font-black text-(--accent)"
                >
                  {group.category}//
                </motion.span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: groupIdx * 0.2 + 0.6, duration: 0.8 }}
                  className="h-0.5 w-16 bg-(--accent) origin-left" 
                />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 md:gap-x-24 gap-y-10">
                {group.items.map((tech, techIdx) => (
                  <div key={tech.name} className="flex items-center gap-6 md:gap-10 group/item cursor-crosshair min-w-0">
                    <div className="relative shrink-0">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1, delay: 1.5 + techIdx * 0.05 }}
                      >
                        <tech.icon className="text-5xl md:text-7xl lg:text-[90px] text-white group-hover/item:text-(--accent) group-hover/item:scale-110 transition-all duration-700 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.8 + techIdx * 0.05, duration: 1 }}
                        className="absolute -left-4 top-0 w-1 h-full bg-(--accent) opacity-60 origin-top"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.6 + techIdx * 0.05 }}
                        className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase text-white group-hover/item:text-(--accent) transition-colors truncate"
                      >
                        {tech.name}
                      </motion.span>
                      
                      <div className="h-2 bg-white/10 mt-3 relative overflow-hidden">
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1 + techIdx * 0.05, duration: 1.5, ease: easing }}
                          className="absolute inset-y-0 left-0 w-full bg-(--accent) shadow-[0_0_20px_var(--accent)] origin-left" 
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
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12 flex justify-between items-center text-xs font-mono"
        >
          <div className="flex items-center gap-10">
            <span className="font-black tracking-widest text-(--accent)">INTEGRITY_CHECK: PASSED//</span>
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-8 h-2 bg-(--accent)" />
              ))}
            </div>
          </div>
          <span className="hidden md:block tracking-[0.4em]">SYSTEM_READY_OPERATIONAL//</span>
        </motion.div>

      </div>
    </section>
  );
}
