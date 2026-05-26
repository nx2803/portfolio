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
    font: '"Chiron GoRound TC", sans-serif',
    description: "엔지니어로서 첫 발을 떼며 기본기와 데이터 정밀함을 확립한 데뷔작입니다. 불완전한 공공데이터 정제부터 시작하여, Supabase RLS 무서버 보안 아키텍처와 Docker Standalone 경량 패키징을 직접 조율하여 신뢰성 높은 인프라의 토대를 다졌습니다.",
  },
  {
    id: "02",
    sectionId: "fortheteam",
    project: "FOR THE TEAM",
    tag: "PASSION",
    accent: "#e23645",
    font: '"Oswald", sans-serif',
    isItalic: true,
    description: "가장 뜨거운 열정으로 몰입하며 시스템의 체급과 아키텍처 범위를 확장한 성장작입니다. 다중 스포츠 API를 어댑터 패턴으로 정규화하고, KBO 리버스 엔지니어링 및 Redis 분산 캐시 폴백을 도입해 엔터프라이즈급 안정성을 실현했습니다.",
  },
  {
    id: "03",
    sectionId: "ufc",
    project: "UFC.",
    tag: "EVOLUTION",
    accent: "#00ff41",
    font: '"Geologica", sans-serif',
    description: "가장 복잡한 기술적 한계와 비즈니스 정합성을 극복하며 완성한 지능형 시스템의 최종 진화형입니다. Java 21 가상 스레드와 Spring Batch 6 기반의 배치 파이프라인에 Gemini AI 해설 에이전트를 결합하여 가용성 높은 분석 서비스를 구축했습니다.",
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
    <section id="trilogy_intro" className="relative w-full h-full flex flex-col justify-center pt-28 pb-32 lg:py-0 overflow-y-auto lg:overflow-hidden bg-transparent text-(--foreground)" style={{ WebkitOverflowScrolling: 'touch' }}>

      {/* ── HEADER AREA (Structural Boot-up) ── */}
      <div className="w-full px-6 md:px-10 mb-16 md:mb-24 relative z-10 max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xs md:text-sm font-mono tracking-[0.5em] font-black text-(--accent) uppercase"
            >
              PROJECT_INDEX_MAPPING//
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 w-16 bg-(--accent) origin-left"
            />
          </div>

          <div className="flex items-center gap-10 relative overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-4xl md:text-[7vw] font-stencil leading-none tracking-tighter select-none uppercase shrink-0"
            >
              THE_TRILOGY
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: easing, delay: 0.6 }}
              className="h-1.5 bg-current flex-1 origin-left"
            />
          </div>
        </div>
      </div>

      {/* ── ROADMAP GRID (Structural Grid Drawing) ── */}
      <div className="w-full px-4 md:px-8 relative z-10 max-w-[1800px] mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0">

          {/* Main Horizontal Grid Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.2 }}
            className="absolute top-0 left-0 w-full h-0.5 bg-current origin-left z-20"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: easing, delay: 1.4 }}
            className="absolute bottom-0 left-0 w-full h-0.5 bg-current origin-left z-20"
          />

          {phases.map((phase, idx) => (
            <div
              key={phase.id}
              onClick={() => handleProjectClick(phase.sectionId)}
              className="relative group p-10 md:p-14 flex flex-col gap-12 transition-all duration-700 overflow-hidden cursor-pointer hover:bg-current/5"
              style={{ '--accent': phase.accent } as any}
            >
              {/* Vertical Grid Line Separator (between items) */}
              {idx > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: easing, delay: 1.6 + idx * 0.2 }}
                  className="absolute left-0 top-0 w-0.5 h-full bg-current origin-top hidden md:block"
                />
              )}

              <div className="relative z-10 flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 2.0 + idx * 0.1 }}
                  >
                    <span className="text-7xl md:text-8xl lg:text-9xl font-stencil opacity-15 group-hover:opacity-40 group-hover:text-[var(--accent)] transition-all leading-none duration-700 block">
                      {phase.id}
                    </span>
                  </motion.div>
                  <div className="flex flex-col items-end gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.4 + idx * 0.1 }}
                    >
                      <span className="text-[10px] font-bold border border-current/20 px-4 py-1 transition-all group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-(--background) block">
                        {phase.tag}//
                      </span>
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.8, x: 0 }}
                      transition={{ duration: 0.8, delay: 2.4 + idx * 0.1 }}
                      className="text-[10px] font-bold text-[var(--accent)] block"
                    >
                      VIEW PROJECT →
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.6 + idx * 0.1 }}
                  >
                    <h3
                      className={`text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-tight transition-colors duration-700 group-hover:text-[var(--accent)] ${phase.isItalic ? 'italic' : ''}`}
                      style={{ fontFamily: phase.font }}
                    >
                      {phase.project}
                    </h3>
                  </motion.div>

                  {/* Decorative Bar under Title */}
                  <div className="h-1 w-full bg-current/10 relative overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, ease: easing, delay: 2.8 + idx * 0.1 }}
                      className="absolute inset-y-0 left-0 w-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)] origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 3.0 + idx * 0.1 }}
                  >
                    <p className="text-lg md:text-xl xl:text-2xl leading-relaxed tracking-tight break-keep opacity-75 group-hover:opacity-98 transition-opacity duration-700 font-light">
                      {phase.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
