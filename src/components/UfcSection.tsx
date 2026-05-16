import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiSpring, SiFastapi, SiHuggingface, SiPython, SiPostgresql, SiRedis, SiNextdotjs, SiReact, SiTailwindcss, SiFramer, SiGoogle } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import TypewriterText from './TypewriterText';

export default function UfcSection() {
  const [mounted, setMounted] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'ufc';
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="ufc" className="min-h-screen" />;

  return (
    <section id="ufc" className="relative w-full h-screen flex items-center justify-center text-[#e1e4e8] bg-transparent overflow-hidden" style={{ fontFamily: 'var(--font-ufc)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.03) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 255, 255, 0.02) 0, transparent 50%)' }}>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 border-[#747474] pb-4 corner-frame p-6 md:p-6 gap-8 md:gap-0"
        >
          <div className="corner-top-left" />
          <div className="corner-top-right" />
          <div className="corner-bottom-left" />
          <div className="corner-bottom-right" />
          <div className="w-full">
            <h3 className="text-xs tracking-widest text-[#6a737d] mb-2 uppercase font-mono">C:\UFC\SYSTEM\ANALYSIS_MODULE</h3>

            <h2
              className="text-[clamp(1.5rem,8vw,3.75rem)] md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] flex flex-col"
              style={{
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
                fontFamily: '"Geologica", sans-serif',
                fontFeatureSettings: '"cv02", "cv03", "cv04", "ss01"',
                letterSpacing: '-0.04em'
              }}
            >
              <span>ULTIMATE</span>
              <span>FRAMEWORK</span>
              <span>CHAMPIONSHIP</span>
            </h2>

            <div className="w-full" style={{ fontFamily: '"Geologica", sans-serif' }}>
              <TypewriterText
                text="대규모 기술 트렌드 데이터를 Java 21과 AI 에이전트를 통해 정밀 분석하여 시각화하는 고성능 랭킹 플랫폼입니다."
                className="mt-4 text-xs md:text-sm text-white/80 font-sans max-w-2xl font-light leading-relaxed"
                delay={1.2}
                speed={15}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Card 1 - Data Pipeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easing, delay: 0.1 }}
            whileHover={{ backgroundColor: '#2d3139' }}
            className="p-6 md:p-8 corner-frame transition-colors duration-300 flex flex-col"
            style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "ss01"' }}
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <TypewriterText
              text="Data Pipeline"
              className="text-sm tracking-widest text-[#6a737d] mb-1 uppercase"
              delay={0.5}
              speed={45}
            />
            <TypewriterText
              text="고성능 데이터 배치 엔진"
              className="text-2xl font-bold mb-4 text-[#e1e4e8]"
              delay={0.7}
              speed={40}
            />
            <div className="flex flex-wrap gap-1.5 md:gap-2.5 mb-6">
              {[
                { Icon: FaJava, name: 'Java 21' },
                { Icon: SiSpring, name: 'Spring Batch' },
                { Icon: SiPostgresql, name: 'PostgreSQL' },
                { Icon: SiRedis, name: 'Redis Cache' },
              ].map((tech, i) => (
                <span key={i} className="flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 bg-black/40 text-gray-200 border border-[#30363d] transition-all hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5">
                  <tech.Icon className="text-lg md:text-xl" /> {tech.name}
                </span>
              ))}
            </div>
            <TypewriterText
              text="Java 21 Virtual Threads를 도입하여 I/O 블로킹 문제를 해결하고 처리량을 극대화했습니다. Spring Batch 6.x 기반의 데이터 정제 파이프라인을 구축하여 대규모 지표를 안정적으로 수집하며, 최적화된 DB 인덱싱을 통해 쿼리 성능을 보호합니다."
              className="font-light text-[#e1e4e8] font-sans text-xs md:text-sm leading-relaxed"
              delay={1}
              speed={15}
            />
          </motion.div>

          {/* Card 2 - Analyzed Insight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easing, delay: 0.2 }}
            whileHover={{ backgroundColor: '#2d3139' }}
            className="p-6 md:p-8 corner-frame transition-colors duration-300 md:col-span-1 flex flex-col"
            style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "ss01"' }}
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <div className="flex justify-between items-start mb-6">
              <TypewriterText
                text="Analyzed Insight"
                className="text-sm tracking-widest text-[#6a737d] uppercase"
                delay={0.5}
                speed={45}
              />
            </div>

            <TypewriterText
              text="AI 실시간 프레임워크 해설"
              className="text-2xl font-bold mb-4 text-[#e1e4e8]"
              delay={0.8}
              speed={40}
            />
            <div className="flex flex-wrap gap-2.5 mb-6">
              {[
                { Icon: SiFastapi, name: 'FastAPI' },
                { Icon: SiPython, name: 'Python' },
                { Icon: SiGoogle, name: 'Gemini 3 Flash' },
                { Icon: SiHuggingface, name: 'HuggingFace' },
              ].map((tech, i) => (
                <span key={i} className="flex items-center gap-2 text-sm px-4 py-2 bg-black/40 text-gray-200 border border-[#30363d] transition-all hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5">
                  <tech.Icon className="text-xl" /> {tech.name}
                </span>
              ))}
            </div>
            <TypewriterText
              text="Java/Spring 메인 서버와 Python/FastAPI AI 모듈을 분산 설계하여 성능과 유연성을 확보했습니다. 분석 전 데이터 정합성을 검증하여 할루시네이션을 방지하며, Gemini 3 Flash를 통해 고차원적인 기술 인사이트를 자동화된 중계 톤으로 제공합니다."
              className="font-light text-[#e1e4e8] font-sans text-sm"
              delay={1.1}
              speed={15}
            />
          </motion.div>

          {/* Card 3 - Frontend Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easing, delay: 0.3 }}
            whileHover={{ backgroundColor: '#2d3139' }}
            className="p-6 md:p-8 corner-frame transition-colors duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 relative group"
            style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "ss01"' }}
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <div className="relative z-10 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <TypewriterText
                  text="Frontend Dashboard"
                  className="text-sm tracking-widest text-[#6a737d] uppercase mb-1"
                  delay={0.5}
                  speed={45}
                />
                <TypewriterText
                  text="인터랙티브 분석 대시보드"
                  className="text-2xl font-bold mb-4 text-[#e1e4e8]"
                  delay={0.7}
                  speed={40}
                />

                <div className="flex flex-wrap gap-2.5 mb-6">
                  {[
                    { Icon: SiNextdotjs, name: 'Next.js 15' },
                    { Icon: SiReact, name: 'React 19' },
                    { Icon: SiTailwindcss, name: 'Tailwind 4' },
                    { Icon: SiFramer, name: 'Framer Motion' },
                  ].map((tech, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm px-4 py-2 bg-black/60 text-gray-200 border border-[#30363d] backdrop-blur-sm transition-all hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5">
                      <tech.Icon className="text-xl" /> {tech.name}
                    </span>
                  ))}
                </div>
                <TypewriterText
                  text="Next.js 15 App Router와 React 19를 전면 도입하여 서버 컴포넌트(RSC) 기반의 최적화된 데이터 페칭 구조를 구축했으며, Chart.js와 Framer Motion을 결합하여 기술 트렌드 데이터를 동적인 그래프로 시각화했습니다. 이를 통해 대규모 지표를 안정적으로 렌더링, 미니멀하고 정교한 UI 시스템을 구현했습니다."
                  className="font-light text-[#e1e4e8] font-sans text-sm leading-relaxed"
                  delay={0.9}
                  speed={12}
                />
              </div>

              <a
                href="https://ultimate-framework-championship.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 self-start text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 drop-shadow-md group/btn"
              >
                Explore Project <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Image */}
            <div className="relative z-10 w-full md:w-1/2 min-h-[200px] md:min-h-75 flex items-center justify-center mt-6 md:mt-0 bg-[#0c0d0f] rounded-xl border border-[#30363d] p-4">
              <img src="/projects/ufc.png" alt="UFC Dashboard" className="w-full h-full object-contain rounded" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
