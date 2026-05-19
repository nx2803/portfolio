import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection, type ViewMode } from '../store/sectionStore';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

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
  fortheteam: '#e23645',
  ufc: '#00ff41',
};

export default function Header() {
  const activeSection = useStore($activeSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentColor = themeColors[activeSection] || '#ffffff';

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const handleNavClick = (id: string, mode: ViewMode) => {
    updateActiveSection(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLabel = sections.find(s => s.id === activeSection)?.label || 'Intro';

  if (!mounted) return null;

  return (
    <>
      {/* ── PC HEADER: 미니멀리즘 전술 네비게이션 ── */}
      <header className="hidden md:block fixed top-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-6">
        <nav className="relative px-9 py-4 flex items-center gap-8 whitespace-nowrap">

          {/* 3. Actual Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center gap-8 text-white z-10 w-full"
          >
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('intro', 'portal')}
              className="flex items-center gap-2 group shrink-0"
            >
              <span className="text-[15px] font-extrabold tracking-[0.2em] uppercase font-mono text-white/70 group-hover:text-white transition-colors">
                PORTFOLIO
              </span>
            </button>

            <div className="h-4 w-px bg-white/15 shrink-0" />

            {/* Navigation Links */}
            <div className="flex gap-7 items-center">
              {sections.map(({ id, label, mode }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id, mode)}
                  className={`
                    relative py-1 text-[14px] font-extrabold tracking-[0.18em] uppercase transition-all duration-300
                    ${activeSection === id
                      ? 'font-black'
                      : 'text-white/50 hover:text-white/90'
                    }
                  `}
                  style={{ color: activeSection === id ? currentColor : undefined }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeTabHeader"
                      className="absolute -bottom-1.5 left-0 w-full h-[2.5px] rounded-none"
                      style={{ backgroundColor: currentColor }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </nav>
      </header>

      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[210] w-full max-w-[90vw] px-4">
        <div className="relative px-5 py-3 flex items-center justify-between">

          {/* 3. Actual Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1 flex items-center justify-between z-10 text-white w-full"
          >
            <div className="flex-1 flex items-center justify-start px-1 overflow-hidden">
              <span 
                className="text-[13px] font-mono tracking-[0.18em] uppercase truncate transition-colors duration-300"
                style={{ color: currentColor }}
              >
                {isMenuOpen ? 'CLOSE MENU' : `NODE::${activeLabel.toUpperCase()}`}
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 transition-colors shrink-0"
              style={{ color: currentColor }}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
          </motion.div>

        </div>
      </header>

      {/* ── MOBILE OVERLAY MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-[#050505] text-white flex flex-col p-8 pt-12 overflow-y-auto"
          >
            <div className="mb-12 flex justify-between items-center relative">
              <span className="text-xl font-bold font-mono tracking-[0.2em] text-white/50">
                MENU_SYSTEM
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-2 text-white/60 hover:text-white transition-colors"
                style={{ color: currentColor }}
              >
                <HiX className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {sections.map(({ id, label, mode }, idx) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavClick(id, mode)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-end group text-left relative"
                >
                  <span 
                    className="text-3xl font-mono text-white/5 group-hover:text-white/10 transition-colors w-16 shrink-0"
                    style={{ color: activeSection === id ? currentColor : undefined }}
                  >
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col pb-1">
                    <span className="text-[8px] font-mono text-white/20 tracking-[0.4em] uppercase">node: {id}</span>
                    <span 
                      className={`text-lg font-bold uppercase tracking-tighter leading-none transition-colors`}
                      style={{ color: activeSection === id ? currentColor : 'rgba(255,255,255,0.4)' }}
                    >
                      {label}
                    </span>
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
