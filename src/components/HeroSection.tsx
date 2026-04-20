import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiAstro, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import React from 'react';

export default function HeroSection() {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setFormattedTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const logoText = "TRILOGY";
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  // 공용 라벨 스타일 
  const labelCls = "text-[8px] font-mono text-white/25 tracking-[0.4em] uppercase font-black mb-1.5";
  // 공용 텍스트 스타일
  const textCls = "text-[10px] font-mono text-white/55 tracking-[0.25em] uppercase font-black leading-relaxed";

  const techStack: { icon: React.ReactNode; label: string }[] = [
    { icon: <SiAstro />, label: 'Astro' },
    { icon: <SiReact />, label: 'React' },
    { icon: <SiTypescript />, label: 'TypeScript' },
    { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
    { icon: <SiFramer />, label: 'Framer Motion' },
  ];

  const cornerAnim = { delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any };

  return (
    <section id="intro" className="relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden">

      {/* ── TOP-LEFT: PORTFOLIO IDENTITY ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={cornerAnim}
        className="absolute top-16 left-16 flex flex-col"
      >
        <span className={labelCls}>portfolio_system</span>
        <span className="text-[14px] font-mono text-white/75 tracking-[0.3em] uppercase font-black leading-tight">NX2803</span>
        <span className={textCls}>Full Stack Engineer</span>
      </motion.div>

      {/* ── TOP-RIGHT: TIME ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={cornerAnim}
        className="absolute top-16 right-16 flex flex-col items-end will-change-transform"
      >
        <span className={labelCls}>time</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-white/60 animate-pulse" />
          <span className="text-[14px] font-mono text-white/75 tracking-[0.2em] font-black leading-tight tabular-nums">
            {formattedTime || '00:00:00'}
          </span>
        </div>
      </motion.div>

      {/* ── MAIN LOGO: TRILOGY ── */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex"
        >
          {logoText.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={child}
              className="text-[18vw] md:text-[16vw] font-black leading-none text-white tracking-[-0.05em] select-none pointer-events-none inline-block will-change-transform"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle: Tactical Slanted Lines (High-Contrast White) */}
        <div className="mt-4 w-full max-w-6xl px-12 flex items-center gap-8 relative h-10">
          <div className="flex-1 flex items-center justify-end">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-4 origin-right relative will-change-transform"
              style={{
                background: "repeating-linear-gradient(45deg, white, white 8px, transparent 8px, transparent 24px)"
              }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base font-mono text-white uppercase font-black italic whitespace-nowrap tracking-[0.8em] will-change-transform"
          >
            architect_of_logic
          </motion.span>

          <div className="flex-1 flex items-center justify-start">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-4 origin-left relative will-change-transform"
              style={{
                background: "repeating-linear-gradient(45deg, white, white 8px, transparent 8px, transparent 24px)"
              }}
            />
          </div>
        </div>
      </div>

      {/* ── BOTTOM-LEFT: TECH STACK ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={cornerAnim}
        className="absolute bottom-16 left-16 flex flex-col"
      >
        <span className={labelCls}>tech_stack</span>
        <div className="flex flex-col gap-1">
          {techStack.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-white/60 text-[13px]">{icon}</span>
              <span className={textCls}>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── BOTTOM-RIGHT: CONTACT ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={cornerAnim}
        className="absolute bottom-16 right-16 flex flex-col items-end"
      >
        <span className={labelCls}>contact</span>
        <div className="flex flex-col items-end gap-1">
          <a
            href="mailto:nx2803@gmail.com"
            className="flex items-center gap-2 group"
          >
            <span className={`${textCls} group-hover:text-white/90 transition-colors duration-200`}>nx2803@gmail.com</span>
            <MdEmail className="text-[11px] text-white/40 group-hover:text-white/80 transition-colors duration-200" />
          </a>
          <a
            href="https://github.com/nx2803"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <span className={`${textCls} group-hover:text-white/90 transition-colors duration-200`}>github.com/nx2803</span>
            <SiGithub className="text-[11px] text-white/40 group-hover:text-white/80 transition-colors duration-200" />
          </a>
        </div>
      </motion.div>

      {/* ── STENCIL SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none"
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[0.4em]"
          style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
        >
          scroll down
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50 text-2xl"
        >
          <FiChevronDown strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* ── CORNER MARKINGS ── */}
      {[
        "absolute top-6 left-6 border-t-2 border-l-2",
        "absolute top-6 right-6 border-t-2 border-r-2",
        "absolute bottom-6 left-6 border-b-2 border-l-2",
        "absolute bottom-6 right-6 border-b-2 border-r-2",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className={`${cls} w-10 h-10 border-white/20`}
        />
      ))}

    </section>
  );
}
