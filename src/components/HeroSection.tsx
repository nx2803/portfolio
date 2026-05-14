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
    <section id="intro" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent text-(--foreground)">

      {/* ── BOLD DECORATIVE SLANTS (Background Layer) ── */}
      <div className="absolute top-0 left-0 w-full h-24 bold-slants opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bold-slants opacity-5 pointer-events-none" />

      {/* ── FLOATING TICKS (Repetitive Geometric) ── */}
      <div className="absolute left-6 top-0 h-full flex flex-col items-center justify-center gap-6 opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-0.5 bg-current" />
        ))}
      </div>
      <div className="absolute right-6 top-0 h-full flex flex-col items-center justify-center gap-6 opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-0.5 bg-current" />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full px-12 md:px-24 flex flex-col items-start">

        <div className="flex flex-col gap-0 relative">
          {/* Refined Vertical Guide */}
          <div className="absolute -left-8 top-0 w-px h-full bg-current opacity-20" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: easing }}
            className="relative"
          >
            <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-4 flex items-center gap-4">
              Full Stack Engineer //
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.1 }}
            className="relative"
          >
            <h1 className="massive-text font-stencil select-none leading-none">
              PORTFOLIO
            </h1>

            {/* Sharp Underline Decoration */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: easing, delay: 0.6 }}
              className="h-2 md:h-4 bg-current mt-4"
            />
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easing, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <p className="text-2xl md:text-4xl font-black leading-tight max-w-2xl uppercase tracking-tighter break-keep">
              시스템의 정교함과 <br />
              사용자의 감각을 연결하는 <br />
              <span className="bg-(--foreground) text-(--background) px-4 py-1 italic inline-block mt-4">
                인터페이스 빌더
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER DATA ── */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-6"
        >
          <span className="text-micro opacity-40">EST. 2026</span>
          <div className="w-12 h-px bg-current/10" />
          <span className="text-micro opacity-40">SEOUL_HQ</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex gap-12"
        >
          <a href="mailto:nx2803@gmail.com" className="text-micro border-b border-current/20 hover:opacity-50 transition-all">EMAIL</a>
          <a href="https://github.com/nx2803" className="text-micro border-b border-current/20 hover:opacity-50 transition-all">GITHUB</a>
        </motion.div>
      </div>

    </section>
  );
}
