import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';

// 섹션별 배경색 통합 관리 (Heavy Stealth Grey 적용)
const bgColors: Record<string, string> = {
  intro: '#121214',       // Hero (Heavy Stealth Grey)
  about: '#f2f2f2',       // About (Light Grey)
  techstack: '#121214',   // Tech Stack (Consistent Stealth Grey)
  philosophy: '#121214',  // Philosophy (Dark)
  peecemaker: '#fdfdfd',  // Peecemaker (White Contrast)
  fortheteam: '#0a0a0a',  // For The Team (Deep Black)
  ufc: '#16181c',         // UFC (Industrial Slate)
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 확실하게 화면의 20% 이상을 차지할 때만 업데이트
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            syncSection(entry.target.id);
          }
        });
      },
      { 
        // 화면 중앙부를 기준으로 감지 (상하 25% 여백)
        rootMargin: '-25% 0px -25% 0px', 
        threshold: [0.2] 
      }
    );

    const sectionIds = ['intro', 'about', 'techstack', 'philosophy', 'peecemaker', 'fortheteam', 'ufc'];
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
        animate={{ opacity: activeSection === 'peecemaker' ? 1 : 0 }}
        transition={transitionConfig}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        {children}
      </div>
    </motion.main>
  );
}
