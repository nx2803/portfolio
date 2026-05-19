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
    <section id="contact" className="w-full h-screen relative flex flex-col items-center px-6 md:px-16 lg:px-24 overflow-hidden bg-transparent text-(--foreground) pt-32 md:pt-40">

      <div className="w-full max-w-[1800px] flex flex-col items-center relative z-10 flex-1 justify-center">

        {/* ── HEADER (Structural Title) ── */}
        <div className="mb-24 md:mb-32 flex items-center gap-10 w-full overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl lg:text-8xl font-stencil uppercase tracking-tighter shrink-0 whitespace-nowrap"
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
          <div className="relative flex flex-col items-center justify-center p-12 md:p-16 lg:p-24 group">
            <div className="flex flex-col items-center gap-10 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.6, ease: easing }}
              >
                <MdEmail className="text-8xl md:text-[140px] lg:text-[160px] text-white opacity-80  transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-6 w-full max-w-lg">
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
                    className="text-xs font-mono tracking-[0.5em]  font-black uppercase"
                  >
                    SMTP_LINK//
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  href="mailto:nx2803@gmail.com"
                  className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none  transition-colors text-center whitespace-nowrap"
                >
                  nx2803@gmail.com
                </motion.a>
              </div>
            </div>
          </div>

          {/* GITHUB PORT */}
          <div className="relative flex flex-col items-center justify-center p-12 md:p-16 lg:p-24 group">
            <div className="flex flex-col items-center gap-10 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: easing }}
              >
                <SiGithub className="text-8xl md:text-[140px] lg:text-[160px] text-white opacity-80  transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-6 w-full max-w-lg">
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
                    className="text-xs font-mono tracking-[0.5em]  font-black uppercase"
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
                  className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none transition-colors text-center whitespace-nowrap"
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
