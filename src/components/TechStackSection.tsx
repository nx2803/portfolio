import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript, SiFlutter, SiTailwindcss,
  SiReactquery, SiFramer, SiSpringboot, SiNestjs,
  SiPython, SiFastapi, SiGooglegemini, SiPostgresql, SiRedis,
  SiPrisma, SiDocker, SiVercel, SiHuggingface
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface TechItem {
  name: string;
  icon: any;
}

const allTechs: TechItem[] = [
  { name: 'TYPESCRIPT', icon: SiTypescript },
  { name: 'NEXT.JS', icon: SiNextdotjs },
  { name: 'REACT', icon: SiReact },
  { name: 'NESTJS', icon: SiNestjs },
  { name: 'FLUTTER', icon: SiFlutter },
  { name: 'JAVA', icon: FaJava },
  { name: 'SPRING BOOT', icon: SiSpringboot },
  { name: 'PYTHON', icon: SiPython },
  { name: 'FASTAPI', icon: SiFastapi },
  { name: 'POSTGRESQL', icon: SiPostgresql },
];

export default function TechStackSection() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="techstack" className="min-h-[40vh]" />;

  return (
    <section id="techstack" className="relative w-full py-10 md:py-16 flex flex-col items-center bg-transparent overflow-hidden">
      
      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 w-full px-6 md:px-20 mb-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-(--foreground) font-mono text-[10px] tracking-[0.5em] uppercase font-black opacity-30">
            SYSTEM_ARCHITECTURE_CORE // 2026
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter opacity-80">
            CORE ENGINE INTEGRATION
          </h2>
        </motion.div>
      </div>

      {/* ── BOLD LOGO GRID ── */}
      <div className="w-full max-w-350 mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-24 gap-x-12 md:gap-x-20">
          {allTechs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 1, ease: easing }}
              className="flex flex-col items-center justify-center gap-8 group"
            >
              <div className="relative">
                <item.icon className="text-6xl md:text-8xl lg:text-[100px] text-current opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                
                {/* Sharp Underline on Hover */}
                <div 
                  className="absolute -bottom-4 left-0 w-full h-1 bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                />
              </div>
              
              <span className="text-[10px] md:text-[12px] font-black font-mono tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all duration-700 text-center uppercase whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
