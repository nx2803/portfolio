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

  if (!mounted) return <footer id="footer" className="min-h-[60vh] md:min-h-[80vh]" />;

  return (
    <footer id="footer" className="w-full py-32 md:py-56 px-6 md:px-20 bg-transparent text-(--foreground) relative overflow-hidden">
      
      {/* ── BOLD TOP DECORATION ── */}
      <div className="absolute top-6 left-0 w-full h-12 bold-slants opacity-5" />

      <div className="w-full relative z-10 flex flex-col gap-40">
        
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <motion.a 
              href="mailto:nx2803@gmail.com" 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing, delay: 0.1 }}
              className="group relative flex flex-col gap-6 p-12 border border-current/10 transition-all duration-700 overflow-hidden hover:border-current/30"
            >
              {/* Brackets (Subtler) */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-500">Email_Contact</span>
                <div className="relative">
                  <MdEmail className="text-5xl md:text-7xl opacity-10 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 blur-xl transition-opacity" />
                </div>
              </div>
              <span className="text-3xl md:text-6xl font-stencil uppercase tracking-tight relative z-10 transition-colors duration-700">
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
              className="group relative flex flex-col gap-6 p-12 border border-current/10 transition-all duration-700 overflow-hidden hover:border-current/30"
            >
              {/* Brackets (Subtler) */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-500">Github_Repo</span>
                <div className="relative">
                  <SiGithub className="text-5xl md:text-7xl opacity-10 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 blur-xl transition-opacity" />
                </div>
              </div>
              <span className="text-3xl md:text-6xl font-stencil uppercase tracking-tight relative z-10 transition-colors duration-700">
                github.com/nx2803
              </span>
            </motion.a>
          </div>
        </div>

        {/* ── BOTTOM INFO ── */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 pt-16 border-t border-current/10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-black uppercase tracking-tighter">NX2803 // ARCHITECT</span>
              <span className="text-sm font-bold opacity-20 tracking-widest uppercase">&copy; 2026 ALL RIGHTS RESERVED</span>
            </div>
            <div className="w-48 h-8 bold-slants opacity-10" />
          </div>

          <div className="flex flex-col items-end">
            <h2 className="text-7xl md:text-[10vw] font-stencil leading-none tracking-tighter select-none uppercase opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
              PORTFOLIO
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
