import { useEffect, useState } from 'react';
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

export default function TrilogyContainer() {
  const activeSection = useStore($activeSection);
  const theme = 'dark'; // Force dark theme for cosmic experience
  const bgColors = getBgColors(theme);
  const fgColors = getFgColors(theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 테마 변경 시 클래스 동기화
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const transitionConfig = { 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] as any 
  };

  if (!mounted) return <main className="min-h-screen bg-[#161618]" />;

  const isDetail = ['peecemaker', 'fortheteam', 'ufc'].includes(activeSection);

  // 현재 활성화된 섹션 컴포넌트 결정
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'intro': return <HeroSection />;
      case 'techstack': return <TechStackSection />;
      case 'trilogy_intro': return <ProjectTrilogySection />;
      case 'peecemaker': return <PeecemakerSection />;
      case 'fortheteam': return <ForTheTeamSection />;
      case 'ufc': return <UfcSection />;
      case 'contact': return <Footer />;
      default: return <HeroSection />;
    }
  };

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
      className="w-full h-screen flex items-center flex-col relative overflow-hidden"
    >
      {/* ── COSMIC BACKGROUND LAYER ── */}
      <CosmicBackground activeSection={activeSection} />

      {/* 글로벌 Peecemaker 그라데이션 (우주 배경과 공존) */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff]/20 via-[#ffe9c5]/20 to-[#e0f5ff]/20 pointer-events-none transition-opacity duration-1000"
        style={{ zIndex: 1, opacity: activeSection === 'peecemaker' ? 1 : 0 }}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 1, filter: 'blur(5px)', y: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)', 
              y: 0
            }}
            exit={{ opacity: 0, scale: 1, filter: 'blur(5px)', y: 0 }}
            transition={transitionConfig}
            className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* 현재 섹션 렌더링 */}
            <div className="w-full h-full flex flex-col justify-center overflow-hidden">
              {renderActiveSection()}
            </div>

            {/* 상세 프로젝트 페이지인 경우 뒤로가기 버튼 제거됨 (헤더 이용) */}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
