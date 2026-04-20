import { motion } from 'framer-motion';
import { SiNextdotjs, SiReact, SiTailwindcss, SiSupabase, SiPostgresql, SiReactquery, SiFramer, SiGoogle, SiGithub, SiVercel } from 'react-icons/si';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function PeecemakerSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'peecemaker';

  return (
    <section id="peecemaker" className="relative w-full min-h-screen py-24 flex items-center justify-center font-peecemaker" style={{ color: '#171717', fontFamily: 'var(--font-peecemaker)' }}>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 xl:gap-16 items-center">

        {/* Left: Glass Card Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-5/12 lg:w-1/3 shrink-0"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-10 relative overflow-hidden">

            <h1
              className="text-4xl md:text-5xl mb-4 font-black tracking-widest uppercase font-peecemaker leading-none"
              style={{ 
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
                fontFamily: "'Chiron GoRound TC', sans-serif"
              }}
            >
              <span className="text-[#fb923c]">PEECE</span><span className="text-gray-700">MAKER</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 leading-relaxed">
              제주시를 방문하는 여행객과 도민을 위한 공중화장실 위치 탐색 및 커뮤니티 플랫폼입니다. <br className="hidden lg:block" />
              공공데이터를 기반으로 실시간 안심시설 필터링과 Recharts를 활용한 통계 대시보드를 제공합니다.
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8 max-w-2xl">
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiNextdotjs className="text-xl" /> Next.js 16</span>
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiReact className="text-xl" /> React 19</span>
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiTailwindcss className="text-xl" /> Tailwind 4</span>
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiReactquery className="text-xl" /> React Query</span>
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiFramer className="text-xl" /> Framer Motion</span>
              <span className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-transform hover:scale-105"><SiSupabase className="text-xl" /> Supabase</span>
            </div>

            <ul className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">Next.js 16 + Supabase BaaS를 결합한 기민한 서버리스 아키텍처로 인프라 비용 및 운영 오버헤드 최적화</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">MarkerClusterer와 최적화 알고리즘을 도입해 수천 개의 위치 데이터를 브라우저 부하 없이 렌더링하여 성능 병목 문제 해결</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">Recharts 기반의 데이터 시각화로 지역별 화장실 분포 및 편의시설 수용 현황을 직관적인 대시보드로 구현</span>
              </li>
            </ul>

            <div className="mt-8">
              <a 
                href="https://peece-maker.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#fb923c] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(251,146,60,0.3)] hover:shadow-[0_6px_20px_rgba(251,146,60,0.4)] hover:bg-[#f97316] transition-all ease-in-out duration-300 uppercase tracking-wider text-sm"
              >
                Explore Project
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Mockup / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-7/12 lg:w-2/3 h-[400px] md:h-[600px] flex items-center justify-center p-0"
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden relative flex items-center justify-center p-4 md:p-8">
            <img src="/projects/peecemaker.png" alt="Peecemaker UI Screenshot" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
