import { motion } from 'framer-motion';
import { SiNextdotjs, SiReact, SiTailwindcss, SiSupabase, SiPostgresql, SiReactquery, SiFramer, SiGoogle, SiGithub, SiVercel } from 'react-icons/si';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function PeecemakerSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'peecemaker';

  return (
    <section id="peecemaker" className="relative w-full min-h-screen py-24 flex items-center justify-center font-peecemaker" style={{ color: '#171717' }}>
      
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
            
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-[#fb923c]"
              style={{ viewTransitionName: isTransitionTarget ? 'project-title' : 'none' }}
            >
              PEECE MAKER
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 leading-relaxed">
              제주시를 방문하는 여행객과 도민을 위한 공중화장실 위치 탐색 및 커뮤니티 플랫폼입니다. <br className="hidden lg:block"/>
              공공데이터를 기반으로 실시간 안심시설 필터링과 사용자 간의 생생한 현장 정보를 연결합니다.
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 mb-8 max-w-2xl">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiNextdotjs /> Next.js 16</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiReact /> React 19</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiTailwindcss /> Tailwind 4</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiReactquery /> React Query</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiFramer /> Framer Motion</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs font-bold text-orange-400 border border-white/50 shadow-sm"><SiSupabase /> Supabase</span>
            </div>

            <ul className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">Next.js 16 + Supabase BaaS를 결합한 기민한 서버리스 아키텍처로 인프라 비용 및 운영 오버헤드 최적화</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">MarkerClusterer와 최적화 알고리즘을 도입해 수천 개의 DOM 요소 렌더링 시 발생하는 메모리 점유 및 성능 병목 문제 해결</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="font-medium text-[0.95rem] md:text-base">사용자 권한(RLS) 정책을 데이터베이스 레이어에서 원천 적용하여 클라이언트 사이드 변조나 악의적 접근으로부터 데이터 무결성 보호</span>
              </li>
            </ul>

            <div className="mt-8">
              <button className="px-6 py-2.5 bg-white/50 backdrop-blur-md text-orange-600 font-bold border border-orange-500/30 rounded-full shadow-[0_4px_14px_0_rgba(251,146,60,0.1)] hover:shadow-[0_6px_20px_rgba(251,146,60,0.2)] hover:bg-[#fb923c] hover:text-white transition-all ease-in-out duration-300">
                Explore Project
              </button>
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
