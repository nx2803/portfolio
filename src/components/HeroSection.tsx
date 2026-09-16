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
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="text-[11px] font-display tracking-[0.5em] uppercase mb-4 text-[#D4AF37] font-semibold text-center"
        >
          FULL STACK ENGINEER
        </motion.span>

        {/* 수평선 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
          className="h-px w-full max-w-xs bg-linear-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-8"
        />

        {/* PORTFOLIO — 메인 히어로 타이포그래피 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 1.0 }}
          className="w-full text-center overflow-visible"
        >
          <h1
            className="font-display font-extrabold uppercase leading-[0.85] tracking-[-0.03em] select-none text-white drop-shadow-[0_0_50px_rgba(212,175,55,0.15)] w-full"
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
          <p className="text-sm font-medium tracking-tight opacity-75 leading-snug">
            시스템의 정교함과 사용자의 감각을 연결하는
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E5C378] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] inline-block backdrop-blur-md"
          >
            INTERFACE BUILDER
          </motion.span>
        </motion.div>

        {/* 하단 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3.0, duration: 1.0 }}
          className="absolute bottom-10 flex gap-8"
        >
          <a href="mailto:nx2803@gmail.com" className="text-[10px] tracking-[0.3em] uppercase border-b border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">EMAIL</a>
          <a href="https://github.com/nx2803" className="text-[10px] tracking-[0.3em] uppercase border-b border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">GITHUB</a>
        </motion.div>
      </div>

      {/* ── 데스크탑 레이아웃 (lg 이상) ── */}
      <div className="hidden lg:flex relative z-10 w-full h-full px-24 flex-col justify-center items-start max-w-[2000px] mx-auto lg:pt-36 lg:pb-16">

        <div className="w-full flex flex-col items-start relative mt-6">

          {/* 1. Structural Top Line & Identity */}
          <div className="flex flex-col items-start gap-4 mb-6 w-full">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              className="text-base font-display tracking-[0.6em] font-semibold text-[#D4AF37] uppercase ml-1"
            >
              FULL STACK ENGINEER
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: easing, delay: 0.4 }}
              className="h-px w-full max-w-[85vw] bg-linear-to-r from-[#D4AF37]/50 via-white/20 to-transparent origin-left"
            />
          </div>

          {/* 2. Massive Left-Aligned Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="relative"
          >
            <h1 className="text-[230px] xl:text-[260px] font-display font-extrabold leading-[0.78] tracking-[-0.04em] select-none uppercase text-white drop-shadow-[0_0_60px_rgba(212,175,55,0.1)] whitespace-nowrap">
              PORTFOLIO
            </h1>
          </motion.div>

          {/* 3. Philosophy Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="mt-16 ml-2 border-l border-[#D4AF37]/40 pl-8 py-2 max-w-5xl"
          >
            <p className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight break-keep opacity-90 text-white/90">
              시스템의 정교함과 사용자의 감각을 연결하는 <br />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="px-6 py-2.5 inline-block mt-6 transition-all rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E5C378] text-2xl lg:text-3xl font-bold tracking-[0.15em] backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              >
                INTERFACE BUILDER
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 데스크탑 Footer Logs ── */}
      <div className="hidden lg:flex absolute bottom-12 right-16 flex-col items-end gap-3 overflow-hidden z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 1.0 }}
          className="flex items-center gap-6"
        >
          <span className="text-micro opacity-50 tracking-[0.2em] text-white">EST. 2026</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 1.0 }}
          className="flex gap-8"
        >
          <a href="mailto:nx2803@gmail.com" className="text-micro tracking-[0.2em] border-b border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37] opacity-60 transition-all">EMAIL</a>
          <a href="https://github.com/nx2803" className="text-micro tracking-[0.2em] border-b border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37] opacity-60 transition-all">GITHUB</a>
        </motion.div>
      </div>

    </section>
  );
}


