import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { SiNextdotjs, SiDocker, SiSupabase, SiReactquery, SiPostgresql, SiVercel, SiGithub } from 'react-icons/si';
import { RiMapPinRangeLine } from 'react-icons/ri';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

export default function PeecemakerSection() {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'peecemaker';

  // 제주도의 부드럽고 산뜻한 감성에 맞는 Easing 정의
  const customEasing = [0.16, 1, 0.3, 1] as any;

  // 3D Tilt 효과 제어
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-180, 180], [6, -6]);
  const rotateY = useTransform(mouseX, [-320, 320], [-6, 6]);
  const radialGlow = useMotionTemplate`radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, rgba(251, 146, 60, 0.15) 0%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <section id="peecemaker" className="min-h-screen" />;

  // Stagger 컨테이너 Variants (블록 레벨 순차 등장)
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // 각 영역(Header -> Stack -> Highlights) 간 0.12초 간격
        delayChildren: 0.05
      }
    }
  };
 
  // 지도 위 핀이 "톡!" 떨어지듯 등장하는 핀 드롭 모션 Variants
  const pinDropVariants = {
    initial: { opacity: 0, y: -15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 180,
        damping: 14
      }
    }
  };
 
  // 테크스택 컨테이너 Variants (자식 스태거 적용)
  const techStackContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // 카드가 왼쪽 위부터 오른쪽 아래로 "퐁! 퐁! 퐁!" 솟아오름
        delayChildren: 0.05
      }
    }
  };
 
  // 개별 테크스택 카드 Variants (바운스 없는 고속 슈슈슉 슬라이드)
  const bubbleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 24, // 튕김을 전면 억제하여 단정하게 슬라이딩
        mass: 0.8
      }
    }
  };
 
  // 하이라이트 컨테이너 Variants
  const highlightsContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // 각 라인이 0.08초 간격으로 아래로 스태거
        delayChildren: 0.05
      }
    }
  };
 
  // 하이라이트 리스트 등장 Variants (변위 축소 및 튕김 억제)
  const highlightVariants = {
    initial: { opacity: 0, y: 12, x: -4 },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 180,
        damping: 20
      }
    }
  };

  // 하이라이트 좌측 오렌지 선 애니메이션 (부모 stagger에 연동)
  const lineVariants = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.45,
        ease: customEasing
      }
    }
  };

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
      title: "Supabase RLS 기반 Serverless 보안 아키텍처",
      desc: "백엔드 서버 없이 PostgreSQL RLS(행 수준 보안) 정책과 JWT 세션 검증을 DB 단에 직접 구현하여, API 강제 변조를 통한 커뮤니티 데이터의 무단 수정 및 비인가 조작을 원천 차단했습니다.",
    },
    {
      title: "카카오맵 1,500개 마커 렌더링 성능 최적화",
      desc: "제주도 전역 화장실 데이터를 지도 상에 시각화할 때 발생하는 브라우저 DOM 렌더링 병목을 해결하기 위해 Kakao Map Clusterer를 도입, 축척별 동적 그룹화로 렌더링 프레임 성능을 개선했습니다.",
    },
    {
      title: "Docker Standalone 기반의 컨테이너 배포 경량화",
      desc: "Next.js standalone 빌드 및 Multi-stage 패키징 파이프라인을 도입하여, 프로덕션 구동에 불필요한 의존성 용량을 80% 이상 제거하고 컨테이너 이미지를 초경량으로 배포 최적화했습니다.",
    },
  ];

  return (
    <section
      id="peecemaker"
      className="relative w-full h-full flex items-center justify-center text-white bg-transparent pt-24 pb-28 lg:pt-[8.5dvh] lg:pb-[3.5dvh] overflow-y-auto lg:overflow-hidden"
      style={{ fontFamily: 'var(--font-peecemaker)', WebkitOverflowScrolling: 'touch' }}
    >
      {/* 은은하고 싱그러운 제주 감귤/한라봉 귤빛 오렌지 백그라운드 오라 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-[#fb923c]/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-100 h-100 rounded-full bg-[#fb923c]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-450 mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-center">

        {/* ── LEFT: Content (순차 Stagger 등장 구조 복원 및 이중 이동 간섭 제거) ── */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{ willChange: 'opacity' }}
          className="flex flex-col gap-4"
        >
          {/* Header */}
          <motion.div variants={pinDropVariants}>
            <p className="text-[#fb923c] font-mono text-xs tracking-[0.4em] uppercase font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] animate-pulse inline-block" />
              PEECE_MAKER_NODE::JEJU_CLEAN_MAP//
            </p>
            <h1
              className="font-black uppercase leading-[0.82] text-white mb-3.5"
              style={{
                fontSize: 'clamp(2.0rem, 5.0vw, 5.0rem)',
                letterSpacing: '-0.03em',
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
              }}
            >
              <span className="text-[#fb923c]">PEECE</span>
              <br />MAKER
            </h1>
            <p className="text-white/80 leading-relaxed font-light" style={{ fontSize: 'clamp(1.0rem, 1.2vw, 1.3rem)', lineHeight: '1.55' }}>
              제주도 내 공중화장실의 위치 및 편의시설 공공데이터를 카카오맵 지도 상에 직관적으로 시각화하고, Supabase RLS 무서버 보안 아키텍처 기반의 실시간 소통 공간을 제공하는 로컬 라이프 커뮤니티 플랫폼입니다.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <div className="flex flex-col">
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              TECH_STACK//
            </p>
            <motion.div variants={techStackContainerVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stacks.map((s, i) => (
                <motion.div
                  key={i}
                  variants={bubbleVariants}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#fb923c]/50 hover:bg-[#fb923c]/8 rounded-xl transition-colors duration-300 group cursor-pointer"
                >
                  <s.Icon className="text-[#fb923c] text-base shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-semibold text-xs leading-tight">{s.name}</p>
                    <p className="text-white/40 font-mono text-[8px] leading-tight">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Engineering Highlights */}
          <div className="space-y-2.5">
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
              ENGINEERING_HIGHLIGHTS//
            </p>
            <motion.div variants={highlightsContainerVariants} className="space-y-2.5">
              {highlights.map((h, i) => (
                <motion.div key={i} variants={highlightVariants} className="flex gap-3 group">
                  <div className="relative w-0.5 shrink-0 mt-1 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" />
                    <motion.div
                      variants={lineVariants}
                      style={{ originY: 0 }}
                      className="absolute inset-0 bg-[#fb923c]/60 group-hover:bg-[#fb923c] transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-[#fb923c] font-bold text-base md:text-lg mb-1">{h.title}</p>
                    <p className="text-white/65 text-sm md:text-base leading-relaxed">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT: Browser Mockup + Buttons below ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: customEasing, delay: 0.25 }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col gap-3"
        >
          {/* Screenshot */}
          <div
            className="w-full lg:max-h-[38dvh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] select-none overflow-hidden border border-white/10 rounded-2xl bg-[#070708] relative"
          >
            <div 
              className="w-full h-full aspect-video lg:aspect-auto overflow-hidden relative bg-[#0c0d0f]"
            >
              <img
                src="/projects/peecemaker.webp"
                alt="PeeceMaker 스크린샷"
                className={`w-full h-full object-cover object-top transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
          <div className="flex gap-3 relative z-20">
            <a
              href="https://peece-maker.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#fb923c] hover:bg-[#f97316] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 tracking-wide transition-all shadow-[0_0_20px_rgba(251,146,60,0.25)] hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]"
            >
              <SiVercel className="text-base" />
              <span>Live Site</span>
            </a>
            <a
              href="https://github.com/nx2803/PeeceMaker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 tracking-wide transition-all"
            >
              <SiGithub className="text-base" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

