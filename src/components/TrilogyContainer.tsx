import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';

const bgColors: Record<string, string> = {
  intro: '#0d0d0d',       // Hero 서론 (기본 진회색)
  techstack: '#111214',   // 테크 스택 블루블랙
  peecemaker: '#fdfdfd',  // 피스메이커 화이트/유리
  fortheteam: '#050505',  // 스포츠 매치 딥블랙
  ufc: '#1e2024',         // 옵시디언 알루미늄
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
      { rootMargin: '-40% 0px -50% 0px' }
    );

    const sectionIds = ['intro', 'techstack', 'peecemaker', 'fortheteam', 'ufc'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Store를 바라보므로 의존성 배열에서 activeSection 제거

  return (
    <motion.main 
      animate={{ backgroundColor: bgColors[activeSection] }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
      className="w-full flex items-center flex-col min-h-screen relative"
    >
      {/* 글로벌 Peecemaker 그라데이션 背景 (고정) */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff] via-[#ffe9c5] to-[#e0f5ff] pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{ opacity: activeSection === 'peecemaker' ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <div className="relative w-full z-10 flex flex-col items-center">
        {children}
      </div>
    </motion.main>
  );
}
