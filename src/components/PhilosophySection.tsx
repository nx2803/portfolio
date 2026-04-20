import { motion } from 'framer-motion';
import React from 'react';

export default function PhilosophySection() {
  const philosophies = [
    {
      label: "PRODUCTION_RESILIENCE",
      title: "Resilient Integrity",
      titleKr: "데이터 정합성과 시스템의 회복 탄력성",
      desc: "외부 API의 불안정성과 데이터 공백에 대응하기 위해 정교한 Retry 및 Fallback 파이프라인을 구축합니다. 기술적 예외 상황에서도 사용자에게 도달하는 정보가 무결함을 유지하도록 데이터 정합성을 최우선으로 설계합니다.",
      tags: ["Spring Retry", "Data Interpolation", "Fail-Safe Architecture"]
    },
    {
      label: "DESIGN_ENGINEERING",
      title: "Algorithmic Craftsmanship",
      titleKr: "알고리즘으로 구현하는 정밀한 인터페이스",
      desc: "시각적 감각을 엔지니어링의 관점에서 코드로 정밀하게 제어합니다. WCAG 기준의 휘도 계산 엔진을 직접 구현하여 가독성 문제를 해결하는 등, 심미적 완성도가 기술적 논리 위에서 구현될 때 비로소 지속 가능한 UI가 완성된다고 믿습니다.",
      tags: ["Contrast Engine", "Dynamic CSS Injection", "Precision UI/UX"]
    },
    {
      label: "SYSTEM_EVOLUTION",
      title: "Systemic Evolution",
      titleKr: "확장을 위한 점진적 기술 고도화",
      desc: "공공 서비스(Peecemaker)에서 글로벌 실시간 데이터 동기화(For The Team), 그리고 AI 통합 인사이트 플랫폼(UFC)으로 이어지는 기술적 확장을 추구합니다. 각 단계에서 가상 스레드와 분산 트레이싱 등 고도화된 기술을 도입하며, 시스템 빌더로서의 서사를 체계적으로 완성해 왔습니다.",
      tags: ["Virtual Threads", "Next.js 16 PPR", "OTEL Tracing", "FastAPI AI Engine"]
    }
  ];

  return (
    <section id="philosophy" className="relative w-full py-60 flex flex-col items-center justify-center bg-transparent overflow-hidden">

      {/* ── BACKGROUND DECORATION (Hero Style) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full border-x border-white/30" />
      </div>

      <div className="w-full max-w-400 mx-auto px-6 md:px-20 relative z-10">

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
              <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
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
