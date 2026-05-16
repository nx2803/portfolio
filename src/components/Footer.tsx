import React, { useEffect, useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="contact" className="min-h-screen" />;

  return (
    <section id="contact" className="w-full h-screen py-24 md:py-32 px-6 md:px-20 bg-transparent text-(--foreground) relative flex flex-col justify-center overflow-hidden">
      
      {/* ── BOLD DECORATION ── */}
      <div className="absolute top-0 left-0 w-full h-8 bold-slants opacity-40" />
      <div className="absolute bottom-0 left-0 w-full h-8 bold-slants opacity-40" />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-24 md:gap-40">
        
        {/* ── MAIN CONTACT AREA ── */}
        <div className="flex flex-col gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing }}
          >
            <span className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-8 block bg-(--foreground) text-(--background) px-4 py-1">
              Let's build the system //
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
            <motion.a 
              href="mailto:nx2803@gmail.com" 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing, delay: 0.1 }}
              className="group relative flex flex-col gap-6 p-10 md:p-16 border border-current/20 transition-all duration-700 overflow-hidden hover:border-current/40 bg-current/5"
            >
              {/* Brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity duration-500">Email_Connection</span>
                <div className="relative">
                  <MdEmail className="text-5xl md:text-8xl opacity-10 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
              <span className="text-2xl md:text-5xl lg:text-6xl font-stencil uppercase tracking-tight relative z-10 transition-colors duration-700 break-all">
                nx2803@gmail.com
              </span>
            </motion.a>

            <motion.a 
              href="https://github.com/nx2803" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing, delay: 0.2 }}
              className="group relative flex flex-col gap-6 p-10 md:p-16 border border-current/20 transition-all duration-700 overflow-hidden hover:border-current/40 bg-current/5"
            >
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity duration-500">Github_Repository</span>
                <div className="relative">
                  <SiGithub className="text-5xl md:text-8xl opacity-10 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </div>
              <span className="text-2xl md:text-5xl lg:text-6xl font-stencil uppercase tracking-tight relative z-10 transition-colors duration-700 break-all">
                github.com/nx2803
              </span>
            </motion.a>
          </div>
        </div>

        {/* ── BOTTOM INFO ── */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 pt-16 border-t border-current/30">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black uppercase tracking-tighter">NX2803 // ARCHITECT</span>
              <span className="text-xs font-bold opacity-40 tracking-[0.3em] uppercase">&copy; 2026_SYSTEM_OPERATIONAL</span>
            </div>
          </div>

          <div className="flex flex-col items-end opacity-10">
            <h2 className="text-6xl md:text-[12vw] font-stencil leading-none tracking-tighter select-none uppercase">
              CONTACT
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
