import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const sections = [
  { id: 'intro', label: 'Intro', shortLabel: 'IN' },
  { id: 'techstack', label: 'Tech Stacks', shortLabel: 'TS' },
  { id: 'standards', label: 'Engineering Standards', shortLabel: 'STD' },
  { id: 'peecemaker', label: 'Peecemaker', shortLabel: 'PM' },
  { id: 'fortheteam', label: 'For The Team', shortLabel: 'FTT' },
  { id: 'ufc', label: 'UFC', shortLabel: 'UFC' },
  { id: 'footer', label: 'Contact', shortLabel: 'CON' },
];

const themeColors: Record<string, string> = {
  intro: '#ffffff',
  techstack: '#ffffff',
  standards: '#ffffff',
  peecemaker: '#fb923c',
  fortheteam: '#dc3442',
  ufc: '#00ff41',
  footer: '#ffffff',
};

export default function Header() {
  const activeSection = useStore($activeSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLightSection = activeSection === 'peecemaker';
  
  const { scrollYProgress } = useScroll();
  const currentColor = themeColors[activeSection] || '#ffffff';

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const activeLabel = sections.find(s => s.id === activeSection)?.label || 'Intro';

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
        animate={{ backgroundColor: currentColor }}
        transition={{ duration: 0.5 }}
      />

      {/* ── PC HEADER (Desktop Only) ── */}
      <header className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`
            relative px-8 py-3.5 rounded-full border transition-all duration-500 flex items-center gap-8 whitespace-nowrap backdrop-blur-xl
            ${isLightSection 
              ? 'bg-white/70 border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-black' 
              : 'bg-[#0c0d0f]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white'
            }
          `}
        >
          <a href="#intro" className="flex items-center group shrink-0">
            <span 
              className="text-lg font-black tracking-tight uppercase"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              PORTFOLIO
            </span>
          </a>

          <div className={`h-5 w-px shrink-0 ${isLightSection ? 'bg-black/10' : 'bg-white/10'}`} />

          <div className="flex gap-7 items-center">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  relative py-1 text-[12px] font-mono font-black uppercase tracking-[0.15em] transition-all duration-300
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
        </motion.nav>
      </header>

      {/* ── MOBILE HEADER (Mobile Only) ── */}
      <motion.header 
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed bottom-6 left-1/2 z-[210] w-full max-w-[90vw] px-4"
      >
        <div 
          className={`
            relative px-6 py-3 rounded-full border flex items-center justify-between backdrop-blur-xl transition-all duration-500
            ${isLightSection && !isMenuOpen
              ? 'bg-white/80 border-black/5 shadow-lg text-black' 
              : 'bg-[#0c0d0f]/80 border-white/10 shadow-2xl text-white'
            }
          `}
        >
          <span 
            className="text-sm font-black tracking-tighter uppercase"
            style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
          >
            PORTFOLIO
          </span>
          
          <div className="flex-1 flex items-center justify-center px-2 overflow-hidden">
            <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-60 truncate">
              {isMenuOpen ? 'CLOSE_MENU' : activeLabel}
            </span>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:opacity-60 transition-opacity shrink-0"
          >
            {isMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE OVERLAY MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[200] bg-[#0c0d0f] flex flex-col p-8 pt-12 overflow-y-auto"
          >
            {/* Overlay Header Label */}
            <div className="mb-12">
              <span 
                className="text-2xl font-black text-white"
                style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
              >
                MENU_SYSTEM
              </span>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-6">
              {sections.map(({ id, label }, idx) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-end group"
                >
                  <span 
                    className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/40 transition-colors w-16 shrink-0"
                    style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
                  >
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col pb-1">
                    <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">section_id: {id}</span>
                    <span className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">{label}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
