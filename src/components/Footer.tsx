import React from 'react';
import { SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  // Hero 섹션 규격 공용 스타일
  const labelCls = "text-[8px] font-mono text-white/40 tracking-[0.4em] uppercase font-black mb-1.5";
  const textCls = "text-[10px] font-mono text-white/70 tracking-[0.25em] uppercase font-black leading-relaxed";

  return (
    <footer id="footer" className="w-full pt-20 pb-32 md:pt-32 md:pb-16 px-6 md:px-20 bg-transparent z-10 relative overflow-hidden">
      
      {/* ── TOP DIVIDER: Exact Hero Slanted Line (Aligned Width) ── */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center gap-0 relative h-6 md:h-10 mb-16 md:mb-24">
        <div 
          className="w-full h-2 md:h-4 relative"
          style={{
            background: "repeating-linear-gradient(45deg, white, white 8px, transparent 8px, transparent 24px)"
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* ── CENTER: CONTACT (Geologica + Optimized Size) ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 text-center px-4">
          <a 
            href="mailto:nx2803@gmail.com" 
            className="group flex items-center gap-3 md:gap-6 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white hover:opacity-70 transition-opacity duration-300 tracking-tighter uppercase"
            style={{ fontFamily: '"Geologica", sans-serif' }}
          >
            <MdEmail className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl" />
            <span>nx2803@gmail.com</span>
          </a>
          <a 
            href="https://github.com/nx2803" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 md:gap-6 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white hover:opacity-70 transition-opacity duration-300 tracking-tighter uppercase"
            style={{ fontFamily: '"Geologica", sans-serif' }}
          >
            <SiGithub className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl" />
            <span>github.com/nx2803</span>
          </a>
        </div>

        {/* ── BOTTOM ROW: IDENTITY & LOGO ── */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-8 pt-12 border-t border-white/10">
          <div className="flex flex-col items-center md:items-start">
            <span className={labelCls}>portfolio</span>
            <span className={textCls}>NX2803 / FULL STACK ENGINEER</span>
          </div>

          <div className="flex flex-col items-center md:items-end leading-none">
            <span 
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter select-none"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              PORTFOLIO
            </span>
          </div>
        </div>
      </div>

      {/* Copyright (Subtle) */}
      <div className="mt-12 md:mt-20 flex justify-center opacity-20">
        <span className="text-[7px] md:text-[8px] font-mono text-white tracking-[0.5em] font-black uppercase">
          &copy; 2026 NX2803 ALL RIGHTS RESERVED
        </span>
      </div>

    </footer>
  );
}
