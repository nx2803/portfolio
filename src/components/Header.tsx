import { motion, useScroll, useSpring } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'techstack', label: 'Tech Stacks' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'peecemaker', label: 'Peecemaker' },
  { id: 'fortheteam', label: 'For The Team' },
  { id: 'ufc', label: 'UFC' },
];

const themeColors: Record<string, string> = {
  intro: '#ffffff',
  techstack: '#ffffff',
  philosophy: '#ffffff',
  peecemaker: '#fb923c',
  fortheteam: '#dc3442',
  ufc: '#00ff41',
};

export default function Header() {
  const activeSection = useStore($activeSection);
  const isLightSection = activeSection === 'peecemaker' || activeSection === 'about';

  const { scrollYProgress } = useScroll();
  const scaleX = useScroll().scrollYProgress;
  
  const currentColor = themeColors[activeSection] || '#ffffff';

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundColor: currentColor,
          boxShadow: `0 0 15px ${currentColor}80`
        }}
        animate={{
          backgroundColor: currentColor,
        }}
        transition={{ duration: 0.5 }}
      />

      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6">
        <nav 
          className={`
            relative px-8 py-3.5 rounded-full border transition-all duration-500 flex items-center gap-8 whitespace-nowrap
            ${isLightSection 
              ? 'bg-white/70 border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-black' 
              : 'bg-[#0c0d0f]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white'
            }
            backdrop-blur-xl
          `}
        >
          {/* Logo */}
          <a href="#intro" className="flex items-center group shrink-0">
            <span 
              className={`text-lg font-black tracking-tight uppercase transition-all duration-500 ${isLightSection ? 'text-black' : 'text-white'}`}
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              PORTFOLIO
            </span>
          </a>

          {/* Divider */}
          <div className={`h-5 w-px shrink-0 ${isLightSection ? 'bg-black/10' : 'bg-white/10'}`} />

          {/* Nav Links */}
          <div className="flex gap-7 items-center">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  relative py-1 text-[12px] font-mono font-black uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap
                  ${activeSection === id 
                    ? (isLightSection ? 'text-black' : 'text-white') 
                    : (isLightSection ? 'text-black/30 hover:text-black/70' : 'text-white/30 hover:text-white/70')
                  }
                `}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeTabHeader"
                    className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: currentColor }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
