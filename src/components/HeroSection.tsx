import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

const titleReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    scaleY: 1.4,
    filter: "blur(20px)"
  },
  show: {
    opacity: 1,
    y: 0,
    scaleY: 1.15,
    filter: "blur(0px)",
    transition: {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export default function HeroSection() {
  const title = "TRILOGY";
  const containerRef = useRef(null);
  const [time, setTime] = useState(new Date());

  // 1초마다 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative w-full h-screen overflow-hidden bg-transparent select-none text-white flex items-center justify-center"
    >
      {/* ── BACKGROUND: COMPLETELY EMPTY ── */}

      {/* ── THE GRAND PURE WHITE LOGO ── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-20 flex flex-col items-center"
        initial="hidden" animate="show" variants={containerVariants}
      >
        <div className="relative">
          <motion.h1
            className="text-[clamp(6rem,18vw,22rem)] font-black uppercase text-white leading-none tracking-[-0.03em] drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            style={{
              fontFamily: "'Saira Stencil One', sans-serif",
              transformOrigin: "center center"
            }}
            variants={titleReveal}
          >
            {title}
          </motion.h1>
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.5 }}
        >
          <div className="w-64 h-0.5 bg-white shadow-[0_0_15px_white]" />
          <span className="text-white font-mono text-[11px] tracking-[1.2em] uppercase font-black italic">
            UNIT_NX_280_ALPHA
          </span>
        </motion.div>
      </motion.div>

      {/* ── HUD: SHARP & PURE WHITE ── */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 flex flex-col justify-between text-white font-mono opacity-60">
        <div className="flex justify-between items-start text-[10px] tracking-[0.5em] uppercase font-black">
          <div className="flex flex-col gap-1">
            <span>Status: Online</span>
            <div className="w-20 h-px bg-white" />
          </div>

          {/* 실시간 디지털 클락 (Mission Time) */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[#ffffff]">TIME : {formattedTime}</span>
            <div className="w-32 h-px bg-white" />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-3">
            <div className="w-48 h-px bg-white shadow-[0_0_10px_white]" />
            <span className="text-[9px] tracking-[0.4em] uppercase font-black">Coordinates: 37.56 / 126.97</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-12 h-0.5 bg-white shadow-[0_0_10px_white]" />
            <span className="text-[8px] tracking-[0.2em] uppercase font-black opacity-40">SERIAL: TR-280-ALPHA</span>
          </div>
        </div>
      </div>

      {/* ── SIMPLE TACTICAL SCROLL ── */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 cursor-pointer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
      >
        <span className="text-[10px] font-mono tracking-[0.8em] uppercase font-black text-white mb-1">
          SCRL_TO_DEPLOY
        </span>
        <div className="flex flex-col items-center -space-y-1">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              className="w-10 h-4 flex items-center justify-center"
            >
              <div className="w-6 h-0.5 bg-white rotate-35 origin-right shadow-[0_0_15px_white]" />
              <div className="w-6 h-0.5 bg-white -rotate-35 origin-left shadow-[0_0_15px_white]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
