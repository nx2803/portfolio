import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection, $viewMode, updateViewMode, type ViewMode } from '../store/sectionStore';
import { $theme, toggleTheme } from '../store/themeStore';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';

const sections = [
  { id: 'intro', label: 'Intro', mode: 'portal' as ViewMode },
  { id: 'techstack', label: 'Tech Stack', mode: 'portal' as ViewMode },
  { id: 'trilogy_intro', label: 'Trilogy', mode: 'portal' as ViewMode },
  { id: 'peecemaker', label: 'Peecemaker', mode: 'detail' as ViewMode },
  { id: 'fortheteam', label: 'For The Team', mode: 'detail' as ViewMode },
  { id: 'ufc', label: 'UFC', mode: 'detail' as ViewMode },
  { id: 'contact', label: 'Contact', mode: 'portal' as ViewMode },
];

const themeColors: Record<string, string> = {
  peecemaker: '#fb923c',
  fortheteam: '#dc3442',
  ufc: '#00ff41',
};

export default function Header() {
  const activeSection = useStore($activeSection);
  const viewMode = useStore($viewMode);
  const theme = useStore($theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEffectiveLight = mounted && (
    (activeSection === 'peecemaker') ||
    (theme === 'light' && ['intro', 'techstack', 'trilogy_intro', 'contact'].includes(activeSection))
  );

  const currentColor = themeColors[activeSection] || (isEffectiveLight ? '#000000' : '#ffffff');

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const handleNavClick = (id: string, mode: ViewMode) => {
    updateActiveSection(id);
    updateViewMode(mode);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLabel = sections.find(s => s.id === activeSection)?.label || 'Intro';

  return (
    <>
      {/* ── PC HEADER ── */}
      <header className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6">
        <motion.nav
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`
            relative px-8 py-3.5 rounded-full border transition-all duration-500 flex items-center gap-8 whitespace-nowrap backdrop-blur-xl
            ${isEffectiveLight
              ? 'bg-[#e5e5e5]/80 border-black shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-black'
              : 'bg-[#161618]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white'
            }
          `}
        >
          <button 
            onClick={() => handleNavClick('intro', 'portal')}
            className="flex items-center group shrink-0"
          >
            <span className="text-lg font-black tracking-tight uppercase font-stencil">
              PORTFOLIO
            </span>
          </button>

          <div className={`h-5 w-px shrink-0 ${isEffectiveLight ? 'bg-black/20' : 'bg-white/10'}`} />

          <div className="flex gap-7 items-center">
            {sections.map(({ id, label, mode }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id, mode)}
                className={`
                  relative py-1 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300
                  ${activeSection === id
                    ? (isEffectiveLight ? 'text-black' : 'text-white')
                    : (isEffectiveLight ? 'text-black/30 hover:text-black' : 'text-white/30 hover:text-white')
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
              </button>
            ))}
          </div>

          <div className={`h-5 w-px shrink-0 ${isEffectiveLight ? 'bg-black/20' : 'bg-white/10'}`} />

          <button
            onClick={toggleTheme}
            className="p-1 hover:opacity-60 transition-opacity"
          >
            {theme === 'light' ? <HiMoon className="text-xl" /> : <HiSun className="text-xl" />}
          </button>
        </motion.nav>
      </header>

      {/* ── MOBILE HEADER ── */}
      <motion.header
        initial={{ y: 200, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed bottom-6 left-1/2 z-210 w-full max-w-[90vw] px-4"
      >
        <div
          className={`
            relative px-6 py-3 rounded-full border flex items-center justify-between backdrop-blur-xl transition-all duration-500
            ${isEffectiveLight && !isMenuOpen
              ? 'bg-[#e5e5e5]/80 border-black shadow-lg text-black'
              : 'bg-[#161618]/80 border-white/10 shadow-2xl text-white'
            }
          `}
        >
          <button
            onClick={toggleTheme}
            className="p-1 hover:opacity-60 transition-opacity shrink-0"
          >
            {theme === 'light' ? <HiMoon className="text-lg" /> : <HiSun className="text-lg" />}
          </button>

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
            className="fixed inset-0 z-200 bg-[#e5e5e5] text-black flex flex-col p-8 pt-12 overflow-y-auto"
          >
            <div className="mb-12">
              <span className="text-2xl font-black font-stencil">
                MENU_SYSTEM
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {sections.map(({ id, label, mode }, idx) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavClick(id, mode)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-end group text-left"
                >
                  <span className="text-4xl md:text-5xl font-black text-black/10 group-hover:text-black/40 transition-colors w-16 shrink-0 font-stencil">
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col pb-1">
                    <span className="text-[8px] font-mono text-black/30 tracking-[0.4em] uppercase">section_id: {id}</span>
                    <span className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">{label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
