import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';

// 섹션 컴포넌트 직접 임포트
import HeroSection from './HeroSection';
import TechStackSection from './TechStackSection';
import ProjectTrilogySection from './ProjectTrilogySection';
import PeecemakerSection from './PeecemakerSection';
import ForTheTeamSection from './ForTheTeamSection';
import UfcSection from './UfcSection';
import Footer from './Footer';
import CosmicBackground from './CosmicBackground';
import MouseTrail from './MouseTrail';

// 섹션별 배경색 통합 관리
const getBgColors = (theme: 'light' | 'dark'): Record<string, string> => {
  const isDark = theme === 'dark';
  const deepSpace = '#050505';
  const spaceNavy = '#0a0a0f';

  return {
    intro: isDark ? deepSpace : '#f4f4f2',
    techstack: isDark ? spaceNavy : '#f4f4f2',
    trilogy_intro: isDark ? deepSpace : '#f4f4f2',
    peecemaker: '#020202', // Dark background for Peecemaker
    fortheteam: '#020202',  
    ufc: '#08090a',         
    contact: isDark ? deepSpace : '#f4f4f2',
  };
};

const getFgColors = (theme: 'light' | 'dark'): Record<string, string> => {
  const offWhite = '#f4f4f2';
  const deepBlack = '#0a0a0a';

  return {
    intro: offWhite,
    techstack: offWhite,
    trilogy_intro: offWhite,
    peecemaker: offWhite, // Light text for Peecemaker dark mode
    fortheteam: offWhite,   
    ufc: offWhite,          
    contact: offWhite,
  };
};

// 섹션 탐색 순서 정의
const SECTION_ORDER = ['intro', 'techstack', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'contact'];

export default function TrilogyContainer() {
  const activeSection = useStore($activeSection);
  const theme = 'dark';
  const bgColors = getBgColors(theme);
  const fgColors = getFgColors(theme);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // 프로젝트 상세 스크린샷 이미지 백그라운드 프리로드
    const screenshots = [
      '/projects/peecemaker.webp',
      '/projects/fortheteam.webp',
      '/projects/ufc.webp'
    ];
    screenshots.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // 모바일 스와이프 제스처 처리
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) return;

    const touchTarget = { current: null as Element | null };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchTarget.current = e.target as Element;
    };

    const isInsideHorizontalScroll = (el: Element | null): boolean => {
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowX = style.overflowX;
        if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      // 수직 스크롤이 더 크면 세션 전환 무시
      if (Math.abs(dy) > Math.abs(dx)) return;
      // 최소 스와이프 거리 50px
      if (Math.abs(dx) < 50) return;
      // 가로 스크롤 가능한 자식 요소 위에서 시작한 경우 무시
      if (isInsideHorizontalScroll(touchTarget.current)) return;

      const currentIndex = SECTION_ORDER.indexOf($activeSection.get());
      if (dx < 0 && currentIndex < SECTION_ORDER.length - 1) {
        updateActiveSection(SECTION_ORDER[currentIndex + 1]);
      } else if (dx > 0 && currentIndex > 0) {
        updateActiveSection(SECTION_ORDER[currentIndex - 1]);
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mounted]);

  const transitionConfig = { 
    duration: 1.0, 
    ease: [0.16, 1, 0.3, 1] as any 
  };

  if (!mounted) return <main className="min-h-screen bg-[#161618]" />;

  const isDetail = ['peecemaker', 'fortheteam', 'ufc'].includes(activeSection);

  return (
    <motion.main 
      animate={{ 
        backgroundColor: bgColors[activeSection] || '#000000',
        color: fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--foreground': fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--background': bgColors[activeSection] || (theme === 'dark' ? '#0a0a0a' : '#f4f4f2'),
        '--accent': activeSection === 'peecemaker' ? '#fb923c' : activeSection === 'fortheteam' ? '#e23645' : activeSection === 'ufc' ? '#00ff41' : '#ffffff'
      } as any}
      transition={transitionConfig} 
      className="w-full h-screen lg:h-screen relative flex items-center flex-col overflow-hidden"
    >
      {/* ── MOUSE TRAIL LAYER ── */}
      <MouseTrail activeSection={activeSection} />

      {/* ── COSMIC BACKGROUND LAYER ── */}
      <CosmicBackground activeSection={activeSection} />

      {/* ── GLOBAL HUD FRAME (Slants & Ticks) ── */}
      {/* Top Bar: 화면 밖(위)에서 안으로 강하게 밀고 들어옴 */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.3 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-full h-4 md:h-8 bold-slants z-20 pointer-events-none transition-colors duration-700" 
        style={{ color: 'var(--accent)' }}
      />
      {/* Bottom Bar: 화면 밖(아래)에서 안으로 강하게 밀고 들어옴 */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.3 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed bottom-0 left-0 w-full h-4 md:h-8 bold-slants z-20 pointer-events-none transition-colors duration-700" 
        style={{ color: 'var(--accent)' }}
      />
 
      {/* Left Ticks: 좌측 화면 밖에서 안으로 미끄러져 튀어나옴 */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 0.5 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="hidden md:flex fixed left-6 md:left-8 top-0 h-full flex flex-col items-center justify-center gap-10 z-20 pointer-events-none transition-colors duration-700" 
        style={{ color: 'var(--accent)' }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 md:w-6 h-px bg-current" />
        ))}
      </motion.div>
      
      {/* Right Ticks: 우측 화면 밖에서 안으로 미끄러져 튀어나옴 */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 0.5 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="hidden md:flex fixed right-6 md:right-8 top-0 h-full flex flex-col items-center justify-center gap-10 z-20 pointer-events-none transition-colors duration-700" 
        style={{ color: 'var(--accent)' }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 md:w-6 h-px bg-current" />
        ))}
      </motion.div>

      {/* 글로벌 Peecemaker 그라데이션 */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff]/20 via-[#ffe9c5]/20 to-[#e0f5ff]/20 pointer-events-none transition-opacity duration-1000"
        style={{ zIndex: 1, opacity: activeSection === 'peecemaker' ? 1 : 0 }}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        <AnimatePresence mode="wait" initial={true}>
          {activeSection === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <HeroSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'techstack' && (
            <motion.div
              key="techstack"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <TechStackSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'trilogy_intro' && (
            <motion.div
              key="trilogy_intro"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <ProjectTrilogySection />
              </div>
            </motion.div>
          )}

          {activeSection === 'peecemaker' && (
            <motion.div
              key="peecemaker"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <PeecemakerSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'fortheteam' && (
            <motion.div
              key="fortheteam"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <ForTheTeamSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'ufc' && (
            <motion.div
              key="ufc"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <UfcSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 0 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)', y: 0 }}
              transition={transitionConfig}
              className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full relative flex flex-col justify-center overflow-hidden">
                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
