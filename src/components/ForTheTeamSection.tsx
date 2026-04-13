import { motion } from 'framer-motion';
import { SiNestjs, SiPrisma, SiNextdotjs, SiReact, SiTailwindcss, SiFramer, SiSocketdotio, SiOpentelemetry, SiRedis, SiDocker } from 'react-icons/si';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function ForTheTeamSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'fortheteam';

  return (
    <section id="fortheteam" className="relative w-full min-h-screen py-24 flex flex-col justify-center text-white bg-transparent overflow-hidden" style={{ fontFamily: 'var(--font-ftt-title)' }}>

      {/* Kinetic Typography Background */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden opacity-[0.35]">
        <div className="absolute w-[200vw] h-[200vh] top-[-50vh] left-[-50vw] flex flex-col justify-center">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex whitespace-nowrap"
              animate={{ x: i % 2 === 0 ? [0, -1500] : [-1500, 0] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40 + (i % 3) * 10,
              }}
            >
              {Array.from({ length: 12 }).map((_, j) => (
                <h1
                  key={j}
                  className="text-[14rem] font-bold italic uppercase tracking-tighter leading-[0.85] px-12 text-transparent"
                  style={{
                    WebkitTextStroke: '2px var(--color-ftt)',
                    opacity: 1
                  }}
                >
                  FORTHETEAM
                </h1>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Sporty Grid / Ticker Background */}
      <div className="absolute inset-0 bg-transparent overflow-hidden flex items-center justify-center pointer-events-none">
        <div className="w-[120%] h-[1px] bg-red-500/10 rotate-12 absolute -top-10" />
        <div className="w-[120%] h-[1px] bg-red-500/10 rotate-12 absolute" />
        <div className="w-[120%] h-[1px] bg-red-500/10 rotate-12 absolute -bottom-10" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row shadow-2xl bg-[#0a0a0a] border border-[#1a1a1a]"
        >
          {/* Content Block */}
          <div className="w-full md:w-5/12 lg:w-1/3 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#e23645] ftt-glow" />

            <div>
              <h3 className="text-[#dc3442] font-bold tracking-widest mb-2 uppercase text-sm">Enterprise-grade Sports Platform</h3>
              <h2 
                className="text-4xl md:text-5xl font-bold uppercase italic tracking-tighter mb-4 text-white leading-none"
                style={{ viewTransitionName: isTransitionTarget ? 'project-title' : 'none' }}
              >
                FOR THE <span className='text-[#dc3442]'>TEAM</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-sans mb-6 font-light leading-relaxed">
                유럽 5대 리그부터 야구, 농구, e스포츠(LCK)까지 전 세계 스포츠 데이터를 실시간 통합 관리하는 통합 스포츠 일정 플랫폼입니다.<br className="hidden lg:block"/>
                서로 다른 5개 이상의 외부 공급자 API 규격을 하나의 통합 도메인 모델(League, Team, Match)로 정규화(Normalization)하여 데이터 정합성을 완벽히 구현했습니다.
              </p>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 font-sans mb-6">
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiNextdotjs /> Next.js 16</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiReact /> React 19</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiTailwindcss /> Tailwind 4</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiFramer /> Framer</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiNestjs /> NestJS</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiPrisma /> Prisma</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiSocketdotio /> WebSockets</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiOpentelemetry /> OTLP</span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.6rem] font-bold"><SiRedis /> Redis</span>
              </div>
            </div>

            <div className="mt-6 font-sans space-y-2">
              <div className="bg-[#111111] p-3 border-l-2 border-[#e23645] flex flex-col xl:flex-row xl:items-center justify-between gap-1">
                <span className="text-xs text-gray-400">Next.js 16 PPR(Partial Prerendering) 및 Socket.io 기반의 실시간 점수 push/sync 파이프라인 구축</span>
                <span className="text-[#e23645] font-bold text-[0.6rem] uppercase tracking-widest hidden xl:block">Real-time Data</span>
              </div>
              <div className="bg-[#111111] p-3 text-xs text-gray-400">
                OpenTelemetry 기반 전 구간 분산 트레이싱을 도입하여 외부 API 연동 및 DB 쿼리 간의 성능 병목 지점 정밀 모니터링 및 추적
              </div>
              <div className="bg-[#111111] p-3 text-xs text-gray-400">
                휘도(Luminance) 연산 기반의 동적 대비 조정 알고리즘(Contrast Engine)으로 WCAG 표준 가독성을 준수하는 지능형 UI 구현
              </div>
            </div>

            <button className="mt-8 self-start px-5 py-2.5 bg-[#e23645] text-white font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-black hover:shadow-[0_0_20px_#e23645] transition-all duration-300">
              View Calendar
            </button>
          </div>

          {/* Image/Mockup Block */}
          <div className="w-full md:w-7/12 lg:w-2/3 bg-[#1a1a1a] h-[400px] md:h-[600px] relative overflow-hidden group flex items-center justify-center p-4">
             {/* Red diagonal clip path style decoration */}
            <div className="absolute inset-0 bg-[#e23645] opacity-5 clip-diagonal pointer-events-none" />
            <img src="/projects/fortheteam.png" alt="For The Team UI" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
