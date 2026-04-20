import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';

// 섹션별 배경색 통합 관리 (Heavy Stealth Grey 적용)
const bgColors: Record<string, string> = {
  intro: '#121214',       // Hero (Heavy Stealth Grey)
  about: '#0c0d0f',       // About (Match Deep Black)
  techstack: '#121214',   // Tech Stack (Consistent Stealth Grey)
  standards: '#121214',   // Standards (Dark)
  trilogy_intro: '#0c0d0f', // Trilogy Intro (Deep Black)
  peecemaker: '#fdfdfd',  // Peecemaker (White Contrast)
  fortheteam: '#0a0a0a',  // For The Team (Deep Black)
  ufc: '#16181c',         // UFC (Industrial Slate)
  footer: '#08080a',      // Footer (Deep Tactical Black)
};

export default function TrilogyContainer({ children }: { children: ReactNode }) {
  const activeSection = useStore($activeSection);

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

    const sectionIds = ['intro', 'about', 'techstack', 'standards', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'footer'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const transitionConfig = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any };

  return (
    <motion.main 
      animate={{ backgroundColor: bgColors[activeSection] || '#121214' }}
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
