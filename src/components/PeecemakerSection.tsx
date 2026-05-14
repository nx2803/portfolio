import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiReact, SiTailwindcss, SiSupabase, SiReactquery, SiFramer } from 'react-icons/si';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function PeecemakerSection() {
  const [mounted, setMounted] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'peecemaker';
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section id="peecemaker" className="min-h-screen" />;

  return (
    <section id="peecemaker" className="relative w-full min-h-screen py-20 md:py-24 flex items-center justify-center font-peecemaker" style={{ color: '#171717', fontFamily: 'var(--font-peecemaker)' }}>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-12 xl:gap-16 items-center">

        {/* Left: Glass Card Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: easing }}
          className="w-full md:w-5/12 lg:w-1/3 shrink-0"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-3xl p-8 md:p-10 relative overflow-hidden">

            <h1
              className="text-3xl md:text-5xl mb-4 font-black tracking-widest uppercase leading-none"
              style={{ 
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
                fontFamily: "'Chiron GoRound TC', sans-serif"
              }}
            >
              <span className="text-[#fb923c]">PEECE</span><span className="text-gray-700">MAKER</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 font-medium mb-6 leading-relaxed">
              공공데이터의 기술적 무결성을 확보하여 시민에게 도달하는 정보의 가치를 극대화하는 공중화장실 탐색 플랫폼입니다. <br className="hidden lg:block" />
              정밀한 데이터 필터링 알고리즘과 시각화 엔진을 통해 공공 서비스의 사용자 경험을 엔지니어링 관점에서 재정의했습니다.
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 md:gap-2.5 mb-8 max-w-2xl">
              {[
                { Icon: SiNextdotjs, name: 'Next.js 16' },
                { Icon: SiReact, name: 'React 19' },
                { Icon: SiTailwindcss, name: 'Tailwind 4' },
                { Icon: SiReactquery, name: 'React Query' },
                { Icon: SiFramer, name: 'Framer Motion' },
                { Icon: SiSupabase, name: 'Supabase' },
              ].map((tech, i) => (
                <span key={i} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/5 rounded-full text-xs md:text-sm font-bold text-[#fb923c] border border-white/50 shadow-sm transition-all hover:bg-black/10">
                  <tech.Icon className="text-lg md:text-xl" /> {tech.name}
                </span>
              ))}
            </div>

            <ul className="space-y-4 text-gray-700 mb-8">
              {[
                "Next.js 16 + Supabase BaaS를 결합한 기민한 서버리스 아키텍처로 인프라 비용 및 데이터 파이프라인 복원력 확보",
                "MarkerClusterer와 휘도 기반 Contrast Engine을 도입하여 수천 개의 위치 데이터를 가독성 저해 없이 렌더링하는 성능 최적화 달성",
                "공공데이터의 정합성 문제를 해결하기 위해 런타임 데이터 검증 파이프라인을 구축하여 사용자에게 신뢰할 수 있는 정보를 제공"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                  <span className="font-medium text-[0.9rem] md:text-base leading-tight md:leading-normal">{text}</span>
                </li>
              ))}
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: easing, delay: 0.2 }}
          className="w-full md:w-7/12 lg:w-2/3 h-[300px] sm:h-[400px] md:h-[600px] flex items-center justify-center p-0"
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden relative flex items-center justify-center p-2 md:p-8">
            <img src="/projects/peecemaker.png" alt="Peecemaker UI Screenshot" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
