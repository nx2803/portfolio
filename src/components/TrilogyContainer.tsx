import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';
import { $theme } from '../store/themeStore';

// 섹션 컴포넌트 직접 임포트
import HeroSection from './HeroSection';
import TechStackSection from './TechStackSection';
import ProjectTrilogySection from './ProjectTrilogySection';
import PeecemakerSection from './PeecemakerSection';
import ForTheTeamSection from './ForTheTeamSection';
import UfcSection from './UfcSection';
import Footer from './Footer';

// 섹션별 배경색 통합 관리
const getBgColors = (theme: 'light' | 'dark'): Record<string, string> => {
  const isDark = theme === 'dark';
  const metallicSilver = '#e5e5e5';
  const gunmetalSteel = '#161618';

  return {
    intro: isDark ? gunmetalSteel : metallicSilver,
    techstack: isDark ? gunmetalSteel : metallicSilver,
    trilogy_intro: isDark ? gunmetalSteel : metallicSilver,
    peecemaker: '#fdfdfd', 
    fortheteam: '#0a0a0a',  
    ufc: '#16181c',         
    contact: isDark ? gunmetalSteel : metallicSilver,
  };
};

const getFgColors = (theme: 'light' | 'dark'): Record<string, string> => {
  const isDark = theme === 'dark';
  const offWhite = '#f4f4f2';
  const deepBlack = '#0a0a0a';

  return {
    intro: isDark ? offWhite : deepBlack,
    techstack: isDark ? offWhite : deepBlack,
    trilogy_intro: isDark ? offWhite : deepBlack,
    peecemaker: deepBlack,  
    fortheteam: offWhite,   
    ufc: offWhite,          
    contact: isDark ? offWhite : deepBlack,
  };
};

export default function TrilogyContainer() {
  const activeSection = useStore($activeSection);
  const theme = useStore($theme);
  const bgColors = getBgColors(theme);
  const fgColors = getFgColors(theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 테마 변경 시 클래스 동기화
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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
        backgroundColor: bgColors[activeSection] || '#f4f4f2',
        color: fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--foreground': fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--background': bgColors[activeSection] || (theme === 'dark' ? '#0a0a0a' : '#f4f4f2'),
        '--accent': activeSection === 'peecemaker' ? '#fb923c' : activeSection === 'fortheteam' ? '#e23645' : activeSection === 'ufc' ? '#00ff41' : '#ffffff'
      } as any}
      transition={transitionConfig} 
      className="w-full min-h-screen flex items-center flex-col relative overflow-x-hidden"
    >
      {/* 글로벌 Peecemaker 그라데이션 */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff] via-[#ffe9c5] to-[#e0f5ff] pointer-events-none transition-opacity duration-1000"
        style={{ zIndex: 0, opacity: activeSection === 'peecemaker' ? 1 : 0 }}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
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
