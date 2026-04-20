import { motion } from 'framer-motion';
import { SiNextdotjs, SiSpringboot, SiPostgresql } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 md:py-40 flex flex-col items-center bg-transparent overflow-hidden">
      
      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 w-full px-6 md:px-20 mb-16 md:mb-24 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-6">
            <span className="text-white font-mono text-xs tracking-[0.6em] uppercase font-black opacity-40">
              SYSTEM_IDENTIFICATION
            </span>
            <div className="w-16 h-px bg-white opacity-20" />
          </div>
          <h2
            className="text-[clamp(2.5rem,10vw,8rem)] font-black uppercase text-white leading-none tracking-[-0.05em]"
            style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
          >
            ABOUT ME
          </h2>
        </motion.div>
      </div>

      {/* ── SPEC SHEET GRID ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-20 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        
        {/* LEFT: Core Specs */}
        <div className="md:col-span-5 flex flex-col gap-12">
          <div className="space-y-10">
            <div className="group">
              <span className="block text-xs md:text-sm font-mono text-white/40 tracking-[0.3em] uppercase mb-3">/ ROLE_IDENTIFIER</span>
              <h3 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase">
                Backend-driven System Engineer
              </h3>
            </div>

            <div className="group">
              <span className="block text-xs md:text-sm font-mono text-white/40 tracking-[0.3em] uppercase mb-4">/ CORE_SPECIALIZATION</span>
              <div className="flex flex-col gap-4">
                {[
                  'System Design & Architecture Thinking', 
                  'Backend Performance & Scalability', 
                  'Developer Experience Optimization'
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-white opacity-40 shrink-0" />
                    <span className="text-white/80 font-semibold tracking-tight uppercase text-base md:text-lg">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group">
              <span className="block text-xs md:text-sm font-mono text-white/40 tracking-[0.3em] uppercase mb-3">/ CURRENT_FOCUS</span>
              <h3 className="text-lg md:text-2xl font-bold text-white/90 leading-tight">
                Large-scale Data Systems & <br/> AI-driven Architecture Exploration
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT: Narrative Statement */}
        <div className="md:col-span-7 flex flex-col justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg md:text-2xl text-white font-medium leading-relaxed md:leading-snug tracking-tight">
              완성된 기술 스택보다, <span className="text-white font-bold italic">문제를 정의하고 구조화하는 과정</span>에 더 집중합니다.
            </p>
            
            <div className="h-px w-full bg-white/10" />
            
            <div className="space-y-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl font-light">
              <p>
                지속 가능한 코드가 비즈니스의 지속 가능성을 결정한다고 믿습니다. 정밀하게 설계된 아키텍처를 통해 엔지니어링의 복잡도를 관리하고, 사용자에게 매끄러운 경험을 전달하는 것을 설계의 최우선 순위로 고려합니다.
              </p>
              <p>
                최근에는 '완벽한 아키텍처'라는 환상에서 벗어나, 변화에 가장 유연하게 대응할 수 있는 <span className="text-white/90 italic border-b border-white/30 pb-1">적절한 구조</span>를 찾는 것에 집중하고 있습니다. 기술적 정답보다 합리적인 트레이드-오프를 고민하며 구조를 만들어가는 과정을 즐깁니다.
              </p>
            </div>
          </motion.div>

          {/* Updated: Primary Core Stack (2x2 Grid) */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <span className="text-xs font-mono text-white/30 tracking-[0.4em] uppercase shrink-0 md:mt-2">/ CORE_TECH_STACK</span>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-10"
            >
              {[
                { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6 md:w-8 md:h-8" /> },
                { name: 'React', icon: <FaReact className="w-6 h-6 md:w-8 md:h-8" /> },
                { name: 'Spring Boot', icon: <SiSpringboot className="w-6 h-6 md:w-8 md:h-8" /> },
                { name: 'PostgreSQL', icon: <SiPostgresql className="w-6 h-6 md:w-8 md:h-8" /> }
              ].map((skill, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="text-white/40 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shrink-0">
                    {skill.icon}
                  </div>
                  <span className="text-xl md:text-2xl font-black text-white/80 group-hover:text-white transition-colors tracking-tight uppercase whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-[0.03] -rotate-12 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />

    </section>
  );
}
