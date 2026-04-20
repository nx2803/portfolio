import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';

// 섹션별 배경색 통합 관리 (Heavy Stealth Grey 적용)
const bgColors: Record<string, string> = {
  intro: '#121214',       // Hero (Heavy Stealth Grey)
  about: '#f2f2f2',       // About (Light Grey)
  techstack: '#121214',   // Tech Stack (Consistent Stealth Grey)
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
          if (entry.isIntersecting) {
            syncSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -25% 0px', threshold: 0.01 }
    );

    const sectionIds = ['intro', 'about', 'techstack', 'peecemaker', 'fortheteam', 'ufc'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.main 
      animate={{ backgroundColor: bgColors[activeSection] || '#121214' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
      className="w-full flex items-center flex-col min-h-screen relative"
    >
      {/* 글로벌 Peecemaker 그라데이션 (고정) */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff] via-[#ffe9c5] to-[#e0f5ff] pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{ opacity: activeSection === 'peecemaker' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        {children}
      </div>
    </motion.main>
  );
}
