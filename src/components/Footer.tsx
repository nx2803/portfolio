import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="contact" className="h-screen" />;

  return (
    <section id="contact" className="w-full h-full relative flex flex-col items-center px-6 md:px-16 lg:px-24 overflow-y-auto lg:overflow-hidden bg-transparent text-(--foreground) pt-28 pb-32 lg:pt-32 lg:pb-0 md:pt-40" style={{ WebkitOverflowScrolling: 'touch' }}>

      <div className="w-full max-w-[1800px] flex flex-col items-center relative z-10 flex-1 justify-center">

        {/* ── HEADER (Structural Title) ── */}
        <div className="mb-12 md:mb-24 lg:mb-32 flex items-center gap-6 md:gap-10 w-full overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-7xl lg:text-8xl font-stencil uppercase tracking-tighter shrink-0 whitespace-nowrap"
          >
            CONTACT_NODE//
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.4 }}
            className="h-1.5 bg-current flex-1 origin-left mt-2"
          />
        </div>

        {/* ── SYMMETRIC CONTACT GRID (HUD Assembly Sequence) ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 relative">

          {/* Vertical Separator */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="absolute left-1/2 top-0 w-0.5 h-full bg-current hidden md:block origin-top z-20"
          />

          {/* EMAIL PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 group">
            <div className="flex flex-col items-center gap-8 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.6, ease: easing }}
              >
                <MdEmail className="text-7xl md:text-[140px] lg:text-[160px] text-white opacity-80 transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="w-8 h-0.5 bg-white origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="text-xs font-mono tracking-[0.5em] font-black uppercase"
                  >
                    SMTP_LINK//
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  href="mailto:nx2803@gmail.com"
                  className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none transition-colors text-center break-all"
                >
                  nx2803@gmail.com
                </motion.a>
              </div>
            </div>
          </div>

          {/* 모바일 구분선 */}
          <div className="md:hidden w-full h-px bg-white/10 my-2" />

          {/* GITHUB PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 group">
            <div className="flex flex-col items-center gap-8 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: easing }}
              >
                <SiGithub className="text-7xl md:text-[140px] lg:text-[160px] text-white opacity-80 transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="w-8 h-0.5 bg-white origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-xs font-mono tracking-[0.5em] font-black uppercase"
                  >
                    GIT_NODE//
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.6 }}
                  href="https://github.com/nx2803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none transition-colors text-center"
                >
                  github.com/nx2803
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
