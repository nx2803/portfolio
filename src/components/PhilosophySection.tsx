import { motion } from 'framer-motion';
import React from 'react';

export default function PhilosophySection() {
  const philosophies = [
    {
      label: "PERFORMANCE_OPTIMIZATION",
      title: "Performance-Driven Engineering",
      titleKr: "성능 한계를 돌파하는 최적화 역량",
      desc: "Java 21 Virtual Threads를 이용한 고성능 I/O 처리와 수천 개의 위치 데이터를 병목 없이 렌더링하는 알고리즘 최적화 등, 시스템의 임계 성능을 이해하고 극대화하는 데 집중합니다.",
      tags: ["High-Throughput", "Latency Optimization", "System Efficiency"]
    },
    {
      label: "SYSTEM_RELIABILITY",
      title: "Fault-Tolerant System Design",
      titleKr: "장애 내성과 데이터 무결성의 확보",
      desc: "다중 외부 소스 통합 시의 Failover 전략 구축과 AI 할루시네이션 방지 로직 설계 등, 어떤 환경에서도 서비스의 지속 가능성과 데이터 신뢰도를 보장하는 시스템을 설계합니다.",
      tags: ["Fail-Safe", "Data Integrity", "Service Continuity"]
    },
    {
      label: "FULLSTACK_CRAFTSMANSHIP",
      title: "Modern Full-Stack Craftsmanship",
      titleKr: "최신 스택 기반의 정교한 구현력",
      desc: "Astro 6, React 19 등 최신 생태계를 실무에 능숙하게 적용하며, 폰트 피처와 인터랙션 디테일까지 정밀하게 제어하여 기획 의도를 완벽한 사용자 경험으로 치환합니다.",
      tags: ["Modern Ecosystem", "Precision UI", "Interactive UX"]
    }
  ];

  return (
    <section id="philosophy" className="relative w-full py-60 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* ── BACKGROUND DECORATION (Hero Style) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-x border-white/30" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header: Tactical Style matching Hero/TechStack */}
        <div className="flex flex-col mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-6">
              <span className="text-white font-mono text-xs tracking-[0.6em] uppercase font-black opacity-80">
                CORE_PHILOSOPHY
              </span>
              <div className="w-24 h-px bg-white opacity-40" />
            </div>

            <div className="flex items-center gap-8 mt-2">
              <h2 
                className="text-[clamp(3rem,10vw,8rem)] font-black uppercase text-white leading-none tracking-[-0.04em]"
                style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
              >
                ENGINEERING <br /> <span className="text-white/40">MANIFESTO</span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ── PHILOSOPHY LAYERS (Clean Layout) ── */}
        <div className="flex flex-col">
          {philosophies.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center py-20 border-t border-white/20 last:border-b last:border-white/20"
            >
              {/* Index Number (Hero Style Large Stencil) - Cleaned */}
              <div className="relative mb-8 md:mb-0 md:w-1/4">
                <span 
                  className="text-8xl md:text-[10rem] font-black text-white/15 group-hover:text-white/40 transition-colors duration-700 leading-none select-none"
                  style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Content Block */}
              <div className="md:w-3/4 flex flex-col md:flex-row gap-8 md:gap-20">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-white/60 tracking-[0.4em] uppercase">{item.label}</span>
                    <div className="w-8 h-px bg-white/30" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none" style={{ fontFamily: '"Geologica", sans-serif', fontFeatureSettings: '"cv02", "cv03", "cv04", "ss01"' }}>
                    {item.title}
                  </h3>
                  <h4 className="text-sm text-white/60 font-medium tracking-tight uppercase">
                    {item.titleKr}
                  </h4>
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                  <p className="text-base text-[#e1e4e8] leading-relaxed mb-8 font-light font-sans max-w-lg">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-white/50 uppercase font-mono tracking-widest group-hover:text-white/80 transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/40 rounded-full" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SIDE LABEL (Hero Style) ── */}
      <div className="absolute right-12 top-1/2 -rotate-90 origin-right translate-y-1/2 hidden xl:block">
        <span className="text-[10px] font-mono text-white/20 tracking-[1em] uppercase font-black">
          TRILOGY_MANIFESTO_VER_1.0
        </span>
      </div>

    </section>
  );
}
