import { motion } from 'framer-motion';
import { SiSpring, SiFastapi, SiHuggingface, SiPython, SiPostgresql, SiRedis, SiNextdotjs, SiReact, SiTailwindcss, SiFramer, SiGoogle } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import TypewriterText from './TypewriterText';

export default function UfcSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'ufc';

  return (
    <section id="ufc" className="relative w-full min-h-screen py-24 flex items-center justify-center text-[#e1e4e8] bg-transparent" style={{ fontFamily: 'var(--font-ufc)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.03) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 255, 255, 0.02) 0, transparent 50%)' }}>

      <div className="w-full  max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16  border-[#747474] pb-4 corner-frame p-8">
          <div className="corner-top-left" />
          <div className="corner-top-right" />
          <div className="corner-bottom-left" />
          <div className="corner-bottom-right" />
          <div>
            <h3 className="text-xs tracking-widest text-[#6a737d] mb-2 uppercase">C:\UFC\SYSTEM\ANALYSIS_MODULE</h3>

            {/* 메인 타이틀 - 타이핑 효과 */}
            <TypewriterText
              text="ULTIMATE FRAMEWORK"
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#e1e4e8]"
              style={{ viewTransitionName: isTransitionTarget ? 'project-title' : 'none' }}
              delay={0.5}
              speed={55}
            />
            <TypewriterText
              text="CHAMPIONSHIP"
              className="text-5xl md:text-7xl font-normal text-[#6a737d]"
              delay={1.2}
              speed={55}
            />

            {/* 설명 문단 */}
            <TypewriterText
              text="전 세계 방대한 프로그래밍 프레임워크와 기술 트렌드 지표를 실시간 수집·분석하여 시각화하는 오픈 테크 랭킹 플랫폼입니다. 단순 수치 나열을 넘어 AI 해설(Gemini 3)을 통해 기술 변화의 맥락을 생동감 있게 전달합니다."
              className="mt-6 text-sm md:text-base text-[#8b949e] font-sans max-w-2xl font-light"
              delay={1.8}
              speed={18}
            />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm tracking-widest text-[#6a737d]">v1.2.0-STABLE</p>
            <p className="text-sm text-[#e1e4e8] mt-1">LIVE FEED / ACTIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 - Data Pipeline */}
          <motion.div
            whileHover={{ backgroundColor: '#2d3139' }}
            className=" p-8 corner-frame transition-colors duration-300 flex flex-col"
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <TypewriterText
              text="Data Pipeline"
              className="text-sm tracking-widest text-[#6a737d] mb-4 uppercase"
              delay={0.2}
              speed={45}
            />
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><FaJava /> Java 21</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiSpring /> Spring Batch</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiPostgresql /> PostgreSQL</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiRedis /> Redis Cache</span>
            </div>
            <TypewriterText
              text="Java 21 Virtual Threads를 도입해 OS 스레드 고갈 문제를 해결하고 I/O 효율을 극대화했습니다. 수만 건의 GitHub 지표를 Spring Batch 6.x로 안전하게 처리하며, API 장애 시 직전 데이터를 끌어오는 Fallback 설계로 시스템 탄력성을 확보했습니다."
              className="font-light text-[#e1e4e8] font-sans text-sm"
              delay={0.5}
              speed={18}
            />
          </motion.div>

          {/* Card 2 - Analyzed Insight */}
          <motion.div
            whileHover={{ backgroundColor: '#2d3139' }}
            className=" p-8 corner-frame transition-colors duration-300 md:col-span-1 flex flex-col"
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <div className="flex justify-between items-start mb-6">
              <TypewriterText
                text="Analyzed Insight"
                className="text-sm tracking-widest text-[#6a737d] uppercase"
                delay={0.2}
                speed={45}
              />
              <span className="text-xs uppercase tracking-wider text-[#34d058] px-2 py-1 border border-[#34d058]/30 bg-[#34d058]/10 hidden lg:block">Stable</span>
            </div>

            <TypewriterText
              text="AI 실시간 프레임워크 해설"
              className="text-2xl font-bold mb-4 text-[#e1e4e8]"
              delay={0.6}
              speed={40}
            />
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiFastapi /> FastAPI</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiPython /> Python</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiGoogle /> Gemini 3 Flash</span>
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[#0c0d0f] text-gray-400 border border-[#30363d]"><SiHuggingface /> HuggingFace</span>
            </div>
            <TypewriterText
              text="Java/Spring 메인 서버와 Python/FastAPI AI 모듈을 분산 설계하여 성능과 유연성을 동시에 잡았습니다. Gemini 3 Flash 기반의 해설 모듈은 데이터 통계에 맥락(Context)을 더해 고차원적인 기술적 인사이트를 자동화된 중계 톤으로 제공합니다."
              className="font-light text-[#e1e4e8] font-sans text-sm"
              delay={0.9}
              speed={18}
            />
          </motion.div>

          {/* Card 3 - Frontend Dashboard */}
          <motion.div
            whileHover={{ backgroundColor: '#2d3139' }}
            className=" p-8 corner-frame transition-colors duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 relative overflow-hidden group"
          >
            <div className="corner-top-left" />
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
            <div className="corner-bottom-right" />

            <div className="relative z-10 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <TypewriterText
                  text="Frontend Dashboard"
                  className="text-sm tracking-widest text-[#6a737d] uppercase mb-4"
                  delay={0.2}
                  speed={45}
                />

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-black/60 text-gray-300 border border-[#30363d] backdrop-blur-sm"><SiNextdotjs /> Next.js 15</span>
                  <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-black/60 text-gray-300 border border-[#30363d] backdrop-blur-sm"><SiReact /> React 19</span>
                  <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-black/60 text-gray-300 border border-[#30363d] backdrop-blur-sm"><SiTailwindcss /> Tailwind 4</span>
                  <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-black/60 text-gray-300 border border-[#30363d] backdrop-blur-sm"><SiFramer /> Framer Motion</span>
                </div>
                <TypewriterText
                  text="React 19 및 Next.js SSR를 활용한 반응형 프론트엔드. Chart.js와 Framer Motion을 결합한 인터랙티브 분석 시각화로 강력한 몰입감 제공."
                  className="font-light text-[#e1e4e8] font-sans text-sm"
                  delay={0.5}
                  speed={18}
                />
              </div>

              <button className="mt-8 self-start text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 drop-shadow-md">
                Explore Tech Stack <span>→</span>
              </button>
            </div>

            {/* Image */}
            <div className="relative z-10 w-full md:w-1/2 min-h-75 flex items-center justify-center mt-6 md:mt-0 bg-[#0c0d0f] rounded-xl border border-[#30363d] p-4">
              <img src="/projects/ufc.png" alt="UFC Dashboard" className="w-full h-full object-contain rounded" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
