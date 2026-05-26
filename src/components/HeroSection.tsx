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
    <section id="intro" className="relative w-full h-screen overflow-hidden bg-transparent text-(--foreground)">

      {/* ── 모바일 레이아웃 (lg 미만) ── */}
      <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center pt-20 pb-20 px-6">

        {/* Identity Tag */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="text-[10px] font-mono tracking-[0.6em] uppercase mb-5 text-center"
        >
          FULL_STACK_ENGINEER//
        </motion.span>

        {/* 수평선 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
          className="h-[2px] w-full bg-current opacity-80 origin-left mb-8"
        />

        {/* PORTFOLIO — 메인 히어로 타이포그래피 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 1.0 }}
          className="w-full text-center overflow-visible"
        >
          <h1
            className="font-stencil uppercase leading-[0.85] tracking-[-0.02em] select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] w-full"
            style={{ fontSize: 'clamp(2.5rem, 13.5vw, 5.5rem)' }}
          >
            PORTFOLIO
          </h1>
        </motion.div>

        {/* 슬로건 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          className="mt-10 flex flex-col items-center gap-4 text-center max-w-[85vw]"
        >
          <p className="text-sm font-black uppercase tracking-tight opacity-60 leading-snug">
            시스템의 정교함과 사용자의 감각을 연결하는
          </p>
          <motion.span
            initial={{ backgroundColor: 'transparent', color: 'var(--foreground)' }}
            animate={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="px-4 py-1.5 text-sm font-black uppercase tracking-widest shadow-lg inline-block"
          >
            INTERFACE BUILDER
          </motion.span>
        </motion.div>

        {/* 하단 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3.0, duration: 1.0 }}
          className="absolute bottom-10 flex gap-8"
        >
          <a href="mailto:nx2803@gmail.com" className="text-[10px] font-mono tracking-[0.3em] uppercase border-b border-current/20 hover:opacity-100 transition-all">EMAIL</a>
          <a href="https://github.com/nx2803" className="text-[10px] font-mono tracking-[0.3em] uppercase border-b border-current/20 hover:opacity-100 transition-all">GITHUB</a>
        </motion.div>
      </div>

      {/* ── 데스크탑 레이아웃 (lg 이상) ── */}
      <div className="hidden lg:flex relative z-10 w-full h-full px-24 flex-col justify-center items-start max-w-[2000px] mx-auto">

        <div className="w-full flex flex-col items-start relative mt-16">

          {/* 1. Structural Top Line & Identity */}
          <div className="flex flex-col items-start gap-6 mb-8 w-full">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              className="text-lg font-mono tracking-[0.8em] font-black uppercase ml-2"
            >
              FULL_STACK_ENGINEER//
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: easing, delay: 0.4 }}
              className="h-2 w-full max-w-[85vw] bg-current opacity-90 origin-left shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            />
          </div>

          {/* 2. Massive Left-Aligned Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="relative"
          >
            <h1 className="text-[250px] xl:text-[280px] font-stencil leading-[0.75] tracking-tighter select-none uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] whitespace-nowrap">
              PORTFOLIO
            </h1>
          </motion.div>

          {/* 3. Philosophy Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="mt-24 ml-6 border-l-4 border-current/20 pl-10 py-2 max-w-5xl"
          >
            <p className="text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter break-keep opacity-80">
              시스템의 정교함과 사용자의 감각을 연결하는 <br />
              <motion.span
                initial={{ backgroundColor: 'transparent', color: 'var(--foreground)' }}
                animate={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="px-4 py-1.5 inline-block mt-6 transition-colors shadow-lg text-3xl"
              >
                INTERFACE BUILDER
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 데스크탑 Footer Logs ── */}
      <div className="hidden lg:flex absolute bottom-12 right-16 flex-col items-end gap-4 overflow-hidden z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 1.0 }}
          className="flex items-center gap-6"
        >
          <span className="text-micro font-mono opacity-40 tracking-[0.2em]">EST. 2026</span>
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


