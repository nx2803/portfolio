import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiNestjs, SiPrisma, SiNextdotjs, SiReact, SiTailwindcss, SiFramer, SiSocketdotio, SiOpentelemetry, SiRedis } from 'react-icons/si';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function ForTheTeamSection() {
  const [mounted, setMounted] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'fortheteam';
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="fortheteam" className="min-h-screen" />;

  return (
    <section id="fortheteam" className="relative w-full h-screen flex flex-col justify-center text-white bg-transparent overflow-hidden" style={{ fontFamily: 'var(--font-ftt-title)' }}>

      {/* Kinetic Typography Background */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden opacity-[0.25]">
        <div className="absolute w-[200vw] h-[200vh] top-[-50vh] left-[-50vw] flex flex-col justify-center">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex whitespace-nowrap"
              animate={{ x: i % 2 === 0 ? [0, -1500] : [-1500, 0] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 45 + (i % 3) * 12,
              }}
            >
              {Array.from({ length: 12 }).map((_, j) => (
                <h1
                  key={j}
                  className="text-[8rem] md:text-[14rem] font-bold italic uppercase tracking-tighter leading-[0.85] px-8 md:px-12 text-transparent"
                  style={{
                    WebkitTextStroke: '1px var(--color-ftt)',
                    opacity: 1
                  }}
                >
                  FOR THE TEAM
                </h1>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex flex-col md:flex-row shadow-2xl bg-[#0a0a0a] border border-[#1a1a1a] relative"
        >
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#e23645] z-20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#e23645] z-20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#e23645] z-20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#e23645] z-20" />
          {/* Content Block */}
          <div className="w-full md:w-5/12 lg:w-1/3 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#e23645] ftt-glow" />

            <div>
              <h3 className="text-[#dc3442] font-bold tracking-widest mb-2 uppercase text-sm">Enterprise-grade Sports Platform</h3>
              <h2
                className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter mb-4 text-white leading-none"
                style={{
                  viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
                  fontFamily: '"Oswald", sans-serif',
                  letterSpacing: '-0.05em'
                }}
              >
                FOR THE <span className='text-[#dc3442]'>TEAM</span>
              </h2>
              <p className="text-base md:text-xl text-white font-medium mb-6 leading-relaxed">
                전 세계 5개 이상의 스포츠 데이터 프로바이더를 통합하여 실시간 경기 지표와 스케줄을 제공하는 엔터프라이즈급 플랫폼입니다. <br className="hidden lg:block" />
                서로 다른 외부 API 규격을 하나의 통합 도메인 모델로 정규화하고, 분산 트레이싱을 통해 대규모 데이터 연동의 신뢰성을 확보했습니다.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 md:gap-2.5 font-sans mb-8">
                {[
                  { Icon: SiNextdotjs, name: 'Next.js 16' },
                  { Icon: SiReact, name: 'React 19' },
                  { Icon: SiTailwindcss, name: 'Tailwind 4' },
                  { Icon: SiFramer, name: 'Framer' },
                  { Icon: SiNestjs, name: 'NestJS' },
                  { Icon: SiPrisma, name: 'Prisma' },
                  { Icon: SiSocketdotio, name: 'WebSockets' },
                  { Icon: SiOpentelemetry, name: 'OTLP' },
                  { Icon: SiRedis, name: 'Redis' },
                ].map((tech, i) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-950/30 text-[#e23645] border border-red-500/20 uppercase tracking-widest text-[0.7rem] md:text-[0.8rem] font-bold transition-all hover:bg-red-500/10 hover:border-red-500/40">
                    <tech.Icon className="text-lg md:text-xl" /> {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 font-sans space-y-2">
              {[
                "Next.js 16 PPR 및 Socket.io 기반의 실시간 데이터 동기화 파이프라인으로 1초 미만의 점수 반영 레이턴시 구현",
                "OpenTelemetry 기반 전 구간 분산 트레이싱을 도입하여 대규모 트래픽 환경에서의 성능 병목 지점 및 데이터 유실 추적",
                "고가용성 확보를 위해 Redis 캐시 및 API Failover 메커니즘을 구축하여 외부 프로바이더 장애 시에도 중단 없는 서비스 보장"
              ].map((text, i) => (
                <div key={i} className="bg-[#111111] p-3 text-xs text-gray-400">
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://for-the-team.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-[#dc3442] text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#dc3442] transition-all duration-300 shadow-[0_0_20px_rgba(226,54,69,0.2)]"
              >
                Explore Project
              </a>
            </div>
          </div>

          {/* Image/Mockup Block */}
          <div className="w-full md:w-7/12 lg:w-2/3 bg-[#1a1a1a] h-[300px] sm:h-[400px] md:h-[600px] relative overflow-hidden group flex items-center justify-center p-2 md:p-4">
            <div className="absolute inset-0 bg-[#e23645] opacity-5 clip-diagonal pointer-events-none" />
            <img src="/projects/fortheteam.png" alt="For The Team UI" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
