import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { updateActiveSection, updateViewMode } from '../store/sectionStore';

const phases = [
  {
    id: "01",
    sectionId: "peecemaker",
    project: "PEECEMAKER",
    tag: "DEBUT",
    accent: "#fb923c",
    description: "엔지니어로서 첫 발을 뗄 때 정밀함과 기본기를 확립한 입문작입니다. Atomic Design 원칙 기반의 모듈화와 상태 관리 패턴을 도입하여, 기술적 정밀함의 토대를 구축했습니다.",
  },
  {
    id: "02",
    sectionId: "fortheteam",
    project: "FOR THE TEAM",
    tag: "PASSION",
    accent: "#e23645",
    description: "가장 뜨거운 열정으로 즐겁게 몰입하며 시스템의 체급을 키운 작품입니다. WebSocket 기반의 실시간 통신 인프라와 이벤트 중심 설계를 통해, 대규모 트래픽 환경에서도 확장성을 보장하는 기술적 성장을 실현했습니다.",
  },
  {
    id: "03",
    sectionId: "ufc",
    project: "UFC",
    tag: "EVOLUTION",
    accent: "#00ff41",
    description: "가장 치열한 시행착오와 기술적 난관을 극복하며 완성한 지능형 시스템의 정점입니다. RAG 아키텍처와 AI 에이전트를 결합하여, 복잡한 지식 베이스로부터 인사이트를 도출하는 최종 진화를 구현했습니다.",
  }
];

export default function ProjectTrilogySection() {
  const [mounted, setMounted] = useState(false);
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProjectClick = (sectionId: string) => {
    updateActiveSection(sectionId);
    updateViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return <section id="trilogy_intro" className="min-h-[80vh] md:min-h-screen" />;

  return (
    <section id="trilogy_intro" className="relative py-12 md:py-16 overflow-hidden bg-transparent text-(--foreground)">

      {/* ── HEADER AREA ── */}
      <div className="w-full px-6 md:px-10 mb-20 md:mb-32 relative z-10">
        <div className="flex flex-col gap-4">
          {/* Subtitle with Tight // Decoration */}
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs md:text-sm font-mono tracking-[0.5em] font-black text-(--accent) uppercase"
          >
            PROJECT_INDEX_MAPPING//
          </motion.span>
          
          <div className="flex items-center gap-10 relative overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="text-6xl md:text-[8vw] font-stencil leading-none tracking-tighter select-none uppercase shrink-0"
            >
              THE_TRILOGY
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
              className="h-1.5 bg-current opacity-40 flex-1 origin-left"
            />
          </div>
        </div>
      </div>

      {/* ── ROADMAP GRID ── */}
      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-current/20">
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.5 }}
            className="absolute top-0 left-0 w-full h-px bg-current opacity-20 origin-left"
          />

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 0.55 }}
            className="absolute bottom-0 left-0 w-full h-px bg-current opacity-20 origin-left"
          />

          {phases.map((phase, idx) => (
            <div
              key={phase.id}
              onClick={() => handleProjectClick(phase.sectionId)}
              className="relative group p-10 md:p-16 flex flex-col gap-16 transition-all duration-700 overflow-hidden cursor-pointer hover:bg-current/5"
              style={{ '--accent': phase.accent } as any}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 + idx * 0.1 }}
                className="relative z-10 flex flex-col gap-12"
              >
                <div className="flex justify-between items-start">
                  <span className="text-7xl md:text-9xl font-stencil opacity-15 group-hover:opacity-30 group-hover:text-[var(--accent)] transition-all leading-none duration-700">
                    {phase.id}
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold border border-current/20 px-4 py-1 transition-all group-hover:border-(--accent) group-hover:bg-(--accent) group-hover:text-(--background)">
                      {phase.tag}//
                    </span>
                    <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all text-(--accent) animate-pulse">
                      VIEW PROJECT →
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-4xl md:text-6xl font-stencil uppercase tracking-tighter leading-tight transition-colors duration-700 group-hover:text-(--accent)">
                    {phase.project}
                  </h3>

                  <div className="h-1.5 w-full bg-current/10 relative overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0.15 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ delay: 1 + idx * 0.1, duration: 1.2, ease: easing }}
                      className="absolute inset-y-0 left-0 w-full bg-current opacity-40 group-hover:bg-(--accent) group-hover:opacity-100 origin-left transition-colors duration-500"
                    />
                  </div>

                  <p className="text-base md:text-2xl font-medium leading-relaxed break-keep group-hover:opacity-100 opacity-60 transition-opacity duration-700">
                    {phase.description}
                  </p>
                </div>
              </motion.div>

              <div className="absolute inset-0 bold-slants opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
