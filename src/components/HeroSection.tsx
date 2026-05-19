import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="intro" className="min-h-screen" />;

  return (
    <section id="intro" className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-transparent text-(--foreground)">

      {/* ── ASYMMETRIC RETRO-FUTURISM LAYOUT ── */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-col justify-center items-start max-w-[2000px] mx-auto">

        <div className="w-full flex flex-col items-start relative mt-12 md:mt-16">

          {/* 1. Structural Top Line & Identity */}
          <div className="flex flex-col items-start gap-6 mb-8 md:mb-12 w-full">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              className="text-sm md:text-lg font-mono tracking-[0.8em] font-black uppercase ml-2"
            >
              FULL_STACK_ENGINEER//
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: easing, delay: 0.4 }}
              className="h-1 md:h-2 w-full max-w-[85vw] bg-current opacity-90 origin-left shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            />
          </div>

          {/* 2. Massive Left-Aligned Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="relative"
          >
            <h1 className="text-[18vw] md:text-[16vw] lg:text-[250px] xl:text-[280px] font-stencil leading-[0.75] tracking-tighter select-none uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] whitespace-nowrap">
              PORTFOLIO
            </h1>
          </motion.div>

          {/* 3. Philosophy Statement (Indented & Grounded) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="mt-16 md:mt-24 ml-2 md:ml-6 border-l-4 border-current/20 pl-8 md:pl-10 py-2 max-w-5xl"
          >
            <p className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter break-keep opacity-80">
              시스템의 정교함과 사용자의 감각을 연결하는 <br className="hidden md:block" />
              <motion.span
                initial={{ backgroundColor: "transparent", color: "var(--foreground)" }}
                animate={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="px-6 py-2 inline-block mt-6 transition-colors shadow-lg"
              >
                INTERFACE BUILDER
              </motion.span>
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── FOOTER LOGS (Bottom Right Aligned for Asymmetric Balance) ── */}
      <div className="absolute bottom-12 right-8 md:right-16 flex flex-col items-end gap-4 overflow-hidden z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 1.0 }}
          className="flex items-center gap-6"
        >
          <span className="text-micro font-mono opacity-40 tracking-[0.2em]">EST. 2026</span>
          <div className="w-12 h-px bg-current/20" />
          <span className="text-micro font-mono opacity-40 tracking-[0.2em]">SEOUL_HQ</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 1.0 }}
          className="flex gap-8"
        >
          <a href="mailto:nx2803@gmail.com" className="text-micro font-mono tracking-[0.2em] border-b border-current/20 hover:opacity-100 hover:border-current opacity-40 transition-all">EMAIL</a>
          <a href="https://github.com/nx2803" className="text-micro font-mono tracking-[0.2em] border-b border-current/20 hover:opacity-100 hover:border-current opacity-40 transition-all">GITHUB</a>
        </motion.div>
      </div>

    </section>
  );
}
