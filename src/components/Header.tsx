import { motion, useScroll, useSpring } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'peecemaker', label: 'Peecemaker' },
  { id: 'fortheteam', label: 'For The Team' },
  { id: 'ufc', label: 'UFC' },
];

const progressColors: Record<string, string> = {
  intro: '#ffffff',
  techstack: '#ffffff',
  peecemaker: '#fb923c',
  fortheteam: '#dc3442',
  ufc: '#4ade80',
};

export default function Header() {
  const activeSection = useStore($activeSection);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001
  });

  const currentColor = progressColors[activeSection] || '#ffffff';

  // 헤더 로고 박히는 애니메이션 설정
  const logoText = "PORTFOLIO";
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 5, scale: 1.1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-100 origin-left"
        style={{
          scaleX,
          backgroundColor: currentColor,
          boxShadow: `0 0 20px ${currentColor}`
        }}
        animate={{
          backgroundColor: currentColor,
          boxShadow: `0 0 20px ${currentColor}`
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full max-w-7xl px-6">
        <nav className="bg-black/40 backdrop-blur-md px-12 py-4 flex justify-between items-center w-full border-b border-white/10 relative overflow-hidden">

          {/* LOGO: STAMPED-IN REVEAL */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex items-center"
          >
            {logoText.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={child}
                className="text-white text-2xl uppercase tracking-[-0.02em] font-black inline-block"
                style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex gap-10">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative py-1 text-xs uppercase tracking-[0.35em] transition-all duration-300 font-mono font-black flex items-center gap-3 ${activeSection === id ? 'text-white' : 'text-white/30 hover:text-white'
                  }`}
              >

                <span>{label}</span>
                {activeSection === id && (
                  <motion.div
                    layoutId="activeTabHeader"
                    animate={{ backgroundColor: currentColor, boxShadow: `0 0 10px ${currentColor}` }}
                    className="absolute -bottom-1 left-0 w-full h-px"
                    transition={{ type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                  />
                )}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
