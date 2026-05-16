import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { MdEmail, MdArrowForward } from 'react-icons/md';

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
        
        {/* ── HEADER (Clean Title) ── */}
        <div className="mb-24 md:mb-36 flex items-center gap-10 w-full overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter shrink-0 whitespace-nowrap"
          >
            CONTACT
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="h-2 md:h-4 bg-current opacity-40 flex-1 origin-left mt-2"
          />
        </div>

        {/* ── SYMMETRIC CONTACT GRID ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.4 }}
            className="absolute left-1/2 top-0 w-px h-full bg-current opacity-20 hidden md:block origin-top" 
          />

          {/* EMAIL PORT */}
          <div className="relative flex flex-col items-center gap-12 p-12 md:p-16 lg:p-24 group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col items-center gap-12 w-full"
            >
              <MdEmail className="text-9xl md:text-[180px] text-white opacity-90 group-hover:text-(--accent) transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
              
              <div className="flex flex-col items-center gap-8 w-full max-w-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-(--accent) shadow-[0_0_15px_var(--accent)]" />
                  <span className="text-xs font-mono tracking-[0.5em] text-(--accent) font-black uppercase">
                    SMTP_LINK//
                  </span>
                </div>
                <a href="mailto:nx2803@gmail.com" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-none group-hover:text-(--accent) transition-colors text-center whitespace-nowrap">
                  nx2803@gmail.com
                </a>
                
                <div className="h-4 w-full bg-white/10 relative overflow-hidden mt-4">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 1.5, ease: easing }}
                    className="absolute inset-y-0 left-0 w-full bg-(--accent) shadow-[0_0_30px_var(--accent)] origin-left" 
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* GITHUB PORT */}
          <div className="relative flex flex-col items-center gap-12 p-12 md:p-16 lg:p-24 group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col items-center gap-12 w-full"
            >
              <SiGithub className="text-9xl md:text-[180px] text-white opacity-90 group-hover:text-(--accent) transition-all duration-700 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
              
              <div className="flex flex-col items-center gap-8 w-full max-w-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-(--accent) shadow-[0_0_15px_var(--accent)]" />
                  <span className="text-xs font-mono tracking-[0.5em] text-(--accent) font-black uppercase">
                    GIT_NODE//
                  </span>
                </div>
                <a href="https://github.com/nx2803" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-none group-hover:text-(--accent) transition-colors text-center whitespace-nowrap">
                  github.com/nx2803
                </a>
                
                <div className="h-4 w-full bg-white/10 relative overflow-hidden mt-4">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.0, duration: 1.5, ease: easing }}
                    className="absolute inset-y-0 left-0 w-full bg-(--accent) shadow-[0_0_30px_var(--accent)] origin-left" 
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── SIMPLE SYSTEM FOOTER ── */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end pt-20 pb-12 opacity-50 font-mono text-[10px] tracking-[0.4em] uppercase border-t-2 border-current/10 mt-auto">
          <div className="flex flex-col gap-2">
            <span className="font-black text-(--accent)">TERMINAL_HALT: SUCCESS//</span>
            <span>SEOUL_HQ / EST_2026</span>
          </div>
          <span className="font-black">&copy; 2026_NX2803_ARCHIVE_SECURED</span>
        </div>

      </div>

    </section>
  );
}
