import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiDocker, SiSupabase, SiReactquery, SiPostgresql } from 'react-icons/si';
import { RiMapPinRangeLine } from 'react-icons/ri';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function PeecemakerSection() {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'peecemaker';
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <section id="peecemaker" className="min-h-screen" />;

  const stacks = [
    { Icon: SiNextdotjs, name: 'Next.js 16', desc: 'App Router / SSR' },
    { Icon: SiDocker, name: 'Docker', desc: 'Standalone Build' },
    { Icon: SiSupabase, name: 'Supabase', desc: 'Auth & BaaS' },
    { Icon: SiPostgresql, name: 'PostgreSQL', desc: 'Row Level Security' },
    { Icon: SiReactquery, name: 'React Query', desc: 'Smart Caching v5' },
    { Icon: RiMapPinRangeLine, name: 'Kakao Maps', desc: 'Marker Clustering' },
  ];

  const highlights = [
    {
      title: "Supabase RLS 무서버 보안 아키텍처",
      desc: "백엔드 서버 없이 PostgreSQL RLS(행 수준 보안) 정책과 JWT 세션 검증을 DB 단에 직접 적용하여 API 변조를 통한 커뮤니티 데이터의 무단 수정을 원천 차단했습니다.",
    },
    {
      title: "카카오맵 1,500개 마커 렌더링 최적화",
      desc: "제주도 전역 화장실 데이터를 브라우저 렌더링할 때의 병목을 해소하기 위해 Kakao Map Clusterer를 적용, 지도 축척에 따라 동적 그룹화하여 메인 스레드 프레임을 보장했습니다.",
    },
    {
      title: "Docker Standalone 기반 경량 프로덕션 배포",
      desc: "Next.js standalone 빌드와 Multi-stage 패키징 아키텍처를 도입하여 불필요한 의존성 용량을 80% 이상 제거하고 컨테이너 이미지 크기를 초경량으로 최적화했습니다.",
    },
  ];

  return (
    <section
      id="peecemaker"
      className="relative w-full lg:h-screen min-h-screen flex items-center justify-center text-white bg-transparent pt-28 pb-16 lg:py-0 overflow-y-auto lg:overflow-hidden"
      style={{ fontFamily: 'var(--font-peecemaker)' }}
    >
      {/* Subtle cosmic bg */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-[#fb923c]/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-100 h-100 rounded-full bg-[#7c3aed]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-450 mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-center">

        {/* ── LEFT: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: easing }}
          className="flex flex-col gap-7"
        >
          {/* Header */}
          <div>
            <p className="text-[#fb923c] font-mono text-xs tracking-[0.4em] uppercase font-bold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] animate-pulse inline-block" />
              PEECE_MAKER_NODE::COSMIC_DECK//
            </p>
            <h1
              className="font-black uppercase leading-[0.82] text-white mb-5"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
              }}
            >
              <span className="text-[#fb923c]">PEECE</span>
              <br />MAKER
            </h1>
            <p className="text-white/80 leading-relaxed font-light" style={{ fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)', lineHeight: '1.6' }}>
              제주도의 복잡다단한 공공데이터 기술적 결함을 정제하여, 사용자 주변의 안심/편의 화장실 조건과 리뷰 커뮤니티 데이터를 매핑하는 위치 기반 위성 항법 지도 및 통계 시각화 플랫폼입니다.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">TECH_STACK//</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stacks.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#fb923c]/50 hover:bg-[#fb923c]/8 rounded-xl transition-all duration-300 group"
                >
                  <s.Icon className="text-[#fb923c] text-base shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-semibold text-xs leading-tight">{s.name}</p>
                    <p className="text-white/40 font-mono text-[8px] leading-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="space-y-3.5">
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">ENGINEERING_HIGHLIGHTS//</p>
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-3.5 group">
                <div className="w-0.5 bg-[#fb923c]/40 rounded-full shrink-0 group-hover:bg-[#fb923c] transition-colors mt-1" />
                <div>
                  <p className="text-[#fb923c] font-bold text-lg md:text-xl mb-1.5">{h.title}</p>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Browser Mockup + Buttons below ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.15 }}
          className="flex flex-col gap-3"
        >
          {/* Screenshot */}
          <div className="w-full drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)] group select-none rounded-2xl overflow-hidden border border-white/10">
            <div className="w-full aspect-video overflow-hidden relative bg-[#0c0d0f]">
              <img
                src="/projects/peecemaker.webp"
                alt="PeeceMaker 스크린샷"
                className={`w-full h-full object-cover object-top group-hover:scale-[1.02] transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070708] gap-3">
                  <div className="w-8 h-8 border-2 border-[#fb923c]/20 border-t-[#fb923c] rounded-full animate-spin" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#fb923c] animate-pulse">LOAD_ASSET//</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons — below screenshot */}
          <div className="flex gap-3">
            <a
              href="https://peece-maker.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#fb923c] hover:bg-[#f97316] text-white font-bold text-sm rounded-xl text-center tracking-wide transition-all shadow-[0_0_20px_rgba(251,146,60,0.25)] hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]"
            >
              Live Site →
            </a>
            <a
              href="https://github.com/nx2803/PeeceMaker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-xl text-center tracking-wide transition-all"
            >
              GitHub →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
