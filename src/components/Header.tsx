import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection, type ViewMode } from '../store/sectionStore';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

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
  const activeIndex = sections.findIndex(s => s.id === activeSection);

  const navigatePrev = () => {
    if (activeIndex > 0) {
      const prev = sections[activeIndex - 1];
      handleNavClick(prev.id, prev.mode);
    }
  };

  const navigateNext = () => {
    if (activeIndex < sections.length - 1) {
      const next = sections[activeIndex + 1];
      handleNavClick(next.id, next.mode);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── PC HEADER: 미니멀리즘 전술 네비게이션 ── */}
      <header className="hidden md:block fixed top-12 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit px-6">
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
      <header className="md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-[210] w-full max-w-[90vw] px-4">
        <div
          className={`relative px-5 py-3 flex items-center justify-between rounded-xl transition-all duration-300 ${isMenuOpen ? '' : 'bg-[#08080a]/90 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'}`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center justify-between z-10 text-white w-full gap-2"
          >
            {/* 이전 섹션 버튼 */}
            <button
              onClick={navigatePrev}
              disabled={activeIndex === 0}
              className="p-1 shrink-0 transition-colors disabled:opacity-20"
              style={{ color: currentColor }}
              aria-label="Previous section"
            >
              <HiChevronLeft className="text-2xl" />
            </button>

            {/* 현재 섹션 라벨 (탭하면 메뉴 오픈) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex-1 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span
                className="text-[13px] font-mono tracking-[0.18em] uppercase truncate transition-colors duration-300 font-bold"
                style={{ color: currentColor }}
              >
                {isMenuOpen ? 'CLOSE' : activeLabel.toUpperCase()}
              </span>
              {!isMenuOpen && (
                <HiMenu className="text-lg shrink-0" style={{ color: currentColor }} />
              )}
              {isMenuOpen && (
                <HiX className="text-lg shrink-0" style={{ color: currentColor }} />
              )}
            </button>

            {/* 다음 섹션 버튼 */}
            <button
              onClick={navigateNext}
              disabled={activeIndex === sections.length - 1}
              className="p-1 shrink-0 transition-colors disabled:opacity-20"
              style={{ color: currentColor }}
              aria-label="Next section"
            >
              <HiChevronRight className="text-2xl" />
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
            className="fixed inset-0 z-200 bg-[#050505]/98 backdrop-blur-sm text-white flex flex-col overflow-y-auto"
          >
            {/* 메뉴 아이템 목록 — pt-28로 상단 플로팅 헤더와 겹치지 않게 여백 확보 */}
            <div className="flex flex-col gap-1 px-6 pt-28 pb-16">
              {sections.map(({ id, label, mode }, idx) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavClick(id, mode)}
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
                  <div className="flex flex-col">
                    <span
                      className="text-2xl font-bold uppercase tracking-tight leading-none transition-colors"
                      style={{ color: activeSection === id ? currentColor : 'rgba(255,255,255,0.55)' }}
                    >
                      {label}
                    </span>
                  </div>
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
