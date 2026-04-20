import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    id: "01",
    project: "PEECEMAKER",
    tag: "DEBUT_PROJECT",
    description: "엔지니어로서 첫 발을 뗄 때 정밀함과 기본기를 확립한 입문작입니다. Atomic Design 원칙 기반의 모듈화와 상태 관리 패턴을 도입하여, 트릴로지 전체가 유지해야 할 기술적 정밀함의 토대를 구축했습니다.",
    accent: "#fb923c"
  },
  {
    id: "02",
    project: "FOR THE TEAM",
    tag: "PASSION_DRIVEN",
    description: "가장 뜨거운 열정으로 즐겁게 몰입하며 시스템의 체급을 키운 작품입니다. WebSocket 기반의 실시간 통신 인프라와 이벤트 중심 설계를 통해, 대규모 트래픽 환경에서도 확장성을 보장하는 기술적 성장을 실현했습니다.",
    accent: "#dc3442"
  },
  {
    id: "03",
    project: "UFC",
    tag: "CHALLENGE_RESOLVED",
    description: "가장 치열한 시행착오와 기술적 난관을 극복하며 완성한 지능형 시스템의 정점입니다. RAG 아키텍처와 AI 에이전트를 결합하여, 복잡한 지식 베이스로부터 인사이트를 도출하는 최종 진화를 구현했습니다.",
    accent: "#00ff41"
  }
];

export default function ProjectTrilogySection() {
  return (
    <section id="trilogy_intro" className="relative py-32 bg-transparent overflow-hidden">
      {/* ── HEADER AREA ── */}
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-white/40 font-mono text-sm tracking-[0.3em] uppercase">System_Evolution_Roadmap</span>
            <div className="w-16 h-px bg-white opacity-20" />
          </div>
          <h2
            className="text-[clamp(2.5rem,10vw,7rem)] font-black uppercase text-white leading-none tracking-[-0.05em]"
            style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
          >
            TRILOGY <span className="text-white/20">INTRODUCE</span>
          </h2>
        </motion.div>
      </div>

      {/* ── CUMULATIVE ROADMAP (Mini-Project Previews) ── */}
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="relative group flex flex-col">
              {/* ── TACTICAL CONNECTOR LINE (Desktop: Horizontal / Mobile: Vertical) ── */}
              {idx < phases.length - 1 && (
                <>
                  {/* Desktop Horizontal Line */}
                  <div className="hidden md:block absolute top-[45%] -right-10 w-10 h-4 z-0 pointer-events-none overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + idx * 0.3, duration: 0.6 }}
                      className="w-full h-full origin-left opacity-30"
                      style={{
                        background: "repeating-linear-gradient(45deg, white, white 4px, transparent 4px, transparent 12px)"
                      }}
                    />
                  </div>
                  {/* Mobile Vertical Line */}
                  <div className="md:hidden absolute -bottom-10 left-10 w-4 h-12 z-0 pointer-events-none overflow-hidden">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + idx * 0.3, duration: 0.6 }}
                      className="w-full h-full origin-top opacity-30"
                      style={{
                        background: "repeating-linear-gradient(45deg, white, white 4px, transparent 4px, transparent 12px)"
                      }}
                    />
                  </div>
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`
                  relative h-full min-h-0 md:min-h-[520px] p-6 md:p-10 flex flex-col transition-all duration-700 overflow-hidden
                  border border-white/5 hover:border-white/20 hover:-translate-y-2 z-10
                  ${idx === 0 ? 'bg-linear-to-tr from-[#f0f9ff] via-[#fff5e6] to-[#f0f9ff] shadow-[0_20px_50px_rgba(255,255,255,0.05)]' : ''}
                  ${idx === 1 ? 'bg-[#0a0a0a] shadow-[0_20px_50px_rgba(220,52,66,0.05)]' : ''}
                  ${idx === 2 ? 'bg-[#16181c] shadow-[0_20px_50px_rgba(0,255,65,0.05)]' : ''}
                `}
              >
                {/* Desktop Identity Overlays (Hidden on Mobile) */}
                <div className="hidden md:block">
                  {idx === 0 && (
                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fb923c10 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                  )}
                  {idx === 1 && (
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(220,52,66,0.1) 1px, transparent 1px)', backgroundSize: '100% 20px' }} />
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-6 md:gap-0 relative z-10 h-full">
                  {/* LEFT / TOP: ID & TAG (Fixed Width on Mobile for Perfect Alignment) */}
                  <div className="flex flex-col shrink-0 w-32 md:w-auto">
                    <span className={`text-6xl md:text-8xl font-black font-mono tracking-tighter leading-none transition-colors duration-500 ${idx === 0 ? 'text-black/60' : 'text-white/80 '}`}>
                      {phase.id}
                    </span>
                    <span
                      className="mt-2 md:mt-4 text-[8px] md:text-[10px] font-mono px-2 md:px-3 py-0.5 md:py-1 rounded-full self-start tracking-[0.15em] md:tracking-[0.2em] font-bold uppercase transition-all"
                      style={{
                        backgroundColor: idx === 0 ? phase.accent + '15' : 'transparent',
                        border: `1px solid ${phase.accent}40`,
                        color: phase.accent
                      }}
                    >
                      {phase.tag}
                    </span>
                  </div>

                  {/* RIGHT / BOTTOM: Title & Description */}
                  <div className="flex flex-col flex-1 mt-0 md:mt-12 space-y-3 md:space-y-6 min-w-0">
                    <h3
                      className="text-xl md:text-5xl font-black uppercase tracking-tighter leading-none md:leading-tight md:h-[180px] md:flex md:items-center"
                      style={{
                        fontFamily: "'Saira Stencil One', sans-serif",
                        color: idx === 0 ? '#1a1a1a' : '#ffffff'
                      }}
                    >
                      {phase.project}
                    </h3>

                    <div className={`hidden md:block w-12 h-1 group-hover:w-full transition-all duration-1000 overflow-hidden relative ${idx === 0 ? 'bg-black/5' : 'bg-white/10'}`}>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ background: `linear-gradient(90deg, transparent, ${phase.accent}, transparent)` }} />
                    </div>

                    <p className={`text-[11px] md:text-base leading-relaxed md:leading-relaxed font-medium break-keep transition-colors duration-500 ${idx === 0 ? 'text-black/60' : 'text-white/40 group-hover:text-white/70'}`}>
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Unique Accents */}
                <div className="absolute bottom-0 left-0 w-full h-1 opacity-20" style={{ backgroundColor: phase.accent }} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Narrative Connection (Professional & Direct) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-12 border-l-2 border-white/20 pl-8"
        >
          <div className="max-w-4xl">
            <p className="text-white/80 font-bold text-lg md:text-xl tracking-tight leading-snug text-left mb-4 break-keep uppercase">
              프론트엔드 아키텍처에서 AI 데이터 분석까지의 기술적 통합
            </p>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl font-medium break-keep">
              단순한 결과물을 넘어, 각 프로젝트가 서로의 기술적 토대가 되어 발전하는 선순환 구조를 지향합니다.
              효율적인 설계가 혁신적인 서비스로 이어지는 과정을 증명하는 세 가지 이정표입니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0)', backgroundSize: '60px 60px' }} />
    </section>
  );
}
