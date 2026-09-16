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
    <section id="contact" className="w-full h-full relative flex flex-col items-center px-6 md:px-16 lg:px-24 overflow-y-auto lg:overflow-hidden bg-transparent text-(--foreground) pt-24 pb-28 lg:pt-[8.5dvh] lg:pb-[3.5dvh] md:pt-32" style={{ WebkitOverflowScrolling: 'touch' }}>

      <div className="w-full max-w-[1800px] flex flex-col items-center relative z-10 flex-1 justify-center">

        {/* ── HEADER ── */}
        <div className="mb-12 md:mb-20 lg:mb-24 flex items-center gap-6 md:gap-10 w-full overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight shrink-0 whitespace-nowrap text-white"
          >
            CONTACT
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.4 }}
            className="h-px bg-linear-to-r from-[#D4AF37]/60 via-white/20 to-transparent flex-1 origin-left mt-2"
          />
        </div>

        {/* ── SYMMETRIC CONTACT GRID ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 relative">

          {/* Vertical Separator */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="absolute left-1/2 top-0 w-px h-full bg-white/10 hidden md:block origin-top z-20"
          />

          {/* EMAIL PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-14 lg:p-20 group">
            <div className="flex flex-col items-center gap-6 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.6, ease: easing }}
              >
                <MdEmail className="text-6xl md:text-[120px] lg:text-[140px] text-white/80 transition-all duration-500 group-hover:scale-105 group-hover:text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-3 w-full max-w-lg">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="w-6 h-px bg-[#D4AF37]/60 origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="text-xs font-display tracking-[0.3em] font-semibold text-[#D4AF37] uppercase"
                  >
                    EMAIL CONTACT
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  href="mailto:nx2803@gmail.com"
                  className="text-xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase leading-none transition-colors text-center break-all text-white group-hover:text-[#E5C378]"
                >
                  nx2803@gmail.com
                </motion.a>
              </div>
            </div>
          </div>

          {/* 모바일 구분선 */}
          <div className="md:hidden w-full h-px bg-white/10 my-2" />

          {/* GITHUB PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-14 lg:p-20 group">
            <div className="flex flex-col items-center gap-6 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: easing }}
              >
                <SiGithub className="text-6xl md:text-[120px] lg:text-[140px] text-white/80 transition-all duration-500 group-hover:scale-105 group-hover:text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-3 w-full max-w-lg">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="w-6 h-px bg-[#D4AF37]/60 origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="text-xs font-display tracking-[0.3em] font-semibold text-[#D4AF37] uppercase"
                  >
                    GITHUB PROFILE
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.6 }}
                  href="https://github.com/nx2803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase leading-none transition-colors text-center text-white group-hover:text-[#E5C378]"
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
