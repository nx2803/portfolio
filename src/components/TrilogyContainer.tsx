import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';
import { $theme } from '../store/themeStore';

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
    footer: isDark ? gunmetalSteel : metallicSilver,
  };
};

// 섹션별 실제 적용되어야 할 전경색(텍스트) 결정
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
    footer: isDark ? offWhite : deepBlack,
  };
};

export default function TrilogyContainer({ children }: { children: ReactNode }) {
  const activeSection = useStore($activeSection);
  const theme = useStore($theme);
  const bgColors = getBgColors(theme);
  const fgColors = getFgColors(theme);

  // 테마 변경 시 클래스 및 스토리지 동기화
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 섹션 변경 시 전역 스토어 업데이트
  const syncSection = (id: string) => {
    if ($activeSection.get() !== id) {
      updateActiveSection(id);
    }
  };

  useEffect(() => {
    // 모든 섹션의 노출 높이를 추적하기 위한 Map
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 각 섹션의 현재 노출 높이 업데이트
          if (entry.isIntersecting) {
            visibilityMap.set(entry.target.id, entry.intersectionRect.height);
          } else {
            visibilityMap.delete(entry.target.id);
          }
        });

        // 현재 화면에서 가장 많이 보이는(높이가 가장 큰) 섹션 결정
        let maxProject = "";
        let maxHeight = -1;

        visibilityMap.forEach((height, id) => {
          if (height > maxHeight) {
            maxHeight = height;
            maxProject = id;
          }
        });

        if (maxProject) {
          syncSection(maxProject);
        }
      },
      { 
        rootMargin: '0px', 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] 
      }
    );

    const sectionIds = ['intro', 'techstack', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'footer'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const transitionConfig = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any };

  return (
    <motion.main 
      animate={{ 
        backgroundColor: bgColors[activeSection] || '#f4f4f2',
        color: fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--foreground': fgColors[activeSection] || (theme === 'dark' ? '#f4f4f2' : '#0a0a0a'),
        '--background': bgColors[activeSection] || (theme === 'dark' ? '#0a0a0a' : '#f4f4f2')
      } as any}
      transition={transitionConfig} 
      className="w-full flex items-center flex-col min-h-screen relative"
    >
      {/* 글로벌 Peecemaker 그라데이션 (고정) */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff] via-[#ffe9c5] to-[#e0f5ff] pointer-events-none"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSection === 'peecemaker' ? 1 : 0 }}
        transition={transitionConfig}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        {children}
      </div>
    </motion.main>
  );
}
