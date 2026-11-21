import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import { scrollToSection } from '../lib/scroll';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'trilogy_intro', label: 'Trilogy' },
  { id: 'peecemaker', label: 'Peecemaker' },
  { id: 'fortheteam', label: 'For The Team' },
  { id: 'ufc', label: 'UFC' },
  { id: 'contact', label: 'Contact' },
];

const themeColors: Record<string, string> = {
  peecemaker: '#fb923c',
  fortheteam: '#e23645',
  ufc: '#00ff41',
};

export default function Header() {
  const activeSection = useStore($activeSection);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isMenuOpen]);

  const currentColor = themeColors[activeSection] || '#D4AF37';

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* ── PC HEADER ── */}
      <header className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit px-6">
        <nav
          className="relative px-8 py-3.5 flex items-center gap-8 whitespace-nowrap rounded-full backdrop-blur-2xl backdrop-saturate-150 border shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-500"
          style={{
            backgroundColor: scrolled ? 'rgba(10,10,13,0.72)' : 'rgba(10,10,13,0.42)',
            borderColor: scrolled ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.09)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-white z-10 w-full"
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('intro')}
              className="flex items-center gap-2 group shrink-0"
            >
              <span className="text-[14px] font-bold tracking-[0.2em] uppercase font-display text-white/80 group-hover:text-[#D4AF37] transition-colors">
                NX280 <span className="text-[#D4AF37] font-semibold">.</span>
              </span>
            </button>

            <div className="h-3.5 w-px bg-white/15 shrink-0" />

            {/* Navigation Links */}
            <div className="flex gap-6 items-center">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`
                    relative py-1 text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-300
                    ${activeSection === id ? 'font-bold' : 'text-white/60 hover:text-white'}
                  `}
                  style={{ color: activeSection === id ? currentColor : undefined }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeTabHeader"
                      className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full"
                      style={{ backgroundColor: currentColor, boxShadow: `0 0 10px ${currentColor}` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </nav>
      </header>

      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-[210] w-full max-w-[90vw] px-4">
        <div
          className={`relative px-5 py-3 flex items-center justify-between rounded-xl transition-all duration-300 ${isMenuOpen ? '' : 'bg-[#08080a]/70 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'}`}
          style={{
            WebkitTapHighlightColor: 'transparent',
            backdropFilter: isMenuOpen ? undefined : 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: isMenuOpen ? undefined : 'blur(18px) saturate(160%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-between z-10 text-white w-full gap-2"
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('intro')}
              className="shrink-0"
            >
              <span className="text-[13px] font-bold tracking-[0.2em] uppercase font-display" style={{ color: currentColor }}>
                NX280<span className="text-[#D4AF37]">.</span>
              </span>
            </button>

            {/* 현재 섹션 라벨 */}
            <span
              className="text-[11px] font-mono tracking-[0.18em] uppercase font-bold flex-1 text-center truncate"
              style={{ color: currentColor }}
            >
              {sections.find(s => s.id === activeSection)?.label?.toUpperCase() || 'INTRO'}
            </span>

            {/* 메뉴 토글 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 shrink-0"
              style={{ color: currentColor }}
            >
              {isMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
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
            className="fixed inset-0 z-[200] bg-[#050505]/98 backdrop-blur-sm text-white flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-1 px-6 pt-28 pb-16">
              {sections.map(({ id, label }, idx) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-5 group text-left relative py-4 border-b border-white/[0.05] last:border-0"
                >
                  <span
                    className="text-sm font-mono w-8 shrink-0 transition-colors"
                    style={{ color: activeSection === id ? currentColor : 'rgba(255,255,255,0.15)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-2xl font-bold uppercase tracking-tight leading-none transition-colors"
                    style={{ color: activeSection === id ? currentColor : 'rgba(255,255,255,0.55)' }}
                  >
                    {label}
                  </span>
                  {activeSection === id && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: currentColor, boxShadow: `0 0 6px ${currentColor}` }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
