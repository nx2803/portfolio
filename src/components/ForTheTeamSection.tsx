import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import { SiNestjs, SiNextdotjs, SiSocketdotio, SiOpentelemetry, SiRedis, SiPostgresql, SiVercel, SiGithub } from 'react-icons/si';

export default function ForTheTeamSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'fortheteam';

  // 피스메이커와 100% 동기화된 프리미엄 시네마틱 모션 Easing 정의
  const customEasing = [0.16, 1, 0.3, 1] as any; // Ultra-smooth cubic bezier

  // 3D Tilt 효과 제어
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-180, 180], [6, -6]);
  const rotateY = useTransform(mouseX, [-320, 320], [-6, 6]);
  const radialGlow = useMotionTemplate`radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, rgba(226, 54, 69, 0.15) 0%, transparent 80%)`;

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

  // Stagger 컨테이너 Variants (기계적 조립 컨셉)
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 140,
        damping: 16,
        mass: 0.85
      }
    }
  };

  // 선형 외곽 프레임 애니메이션 Variants
  const lineVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: { duration: 0.5, ease: customEasing }
    }
  };

  const verticalLineVariants = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: customEasing }
    }
  };

  const stacks = [
    { Icon: SiNextdotjs, name: 'Next.js 16', desc: 'PPR Architecture' },
    { Icon: SiNestjs, name: 'NestJS', desc: 'WebSocket Gateway' },
    { Icon: SiSocketdotio, name: 'Socket.io', desc: 'Live Score Sync' },
    { Icon: SiRedis, name: 'Redis Cache', desc: 'Zero Latency' },
    { Icon: SiOpentelemetry, name: 'OpenTelemetry', desc: 'Distributed Tracing' },
    { Icon: SiPostgresql, name: 'PostgreSQL', desc: 'Normalized Domain' },
  ];

  const highlights = [
    {
      title: "이기종 스포츠 API 정규화 및 어댑터 패턴",
      desc: "ESPN, LCK, KBO 등 이종 스포츠 데이터 소스를 단일 도메인 모델(League, Team, Match)로 규격화하고 어댑터 패턴을 설계하여 특정 API 장애 시의 시스템 결합도를 최소화했습니다.",
    },
    {
      title: "실시간 스코어 동기화 & Next.js PPR 스트리밍",
      desc: "Next.js 16 PPR(Partial Prerendering)로 정적 셸을 즉시 서빙하고, NestJS WebSocket Gateway와 React Query 캐시 Invalidation을 결합해 1초 미만의 지연 시간으로 최신 스코어를 동기화했습니다.",
    },
    {
      title: "WCAG 2.0 대비 알고리즘 & 런타임 CSS 테마 엔진",
      desc: "팀별 브랜드 컬러의 상대 휘도(Relative Luminance)를 계산해 글자색 대비를 실시간 보정하고, 런타임 전역 CSS 변수 주입으로 무한한 브랜드 테마 조합을 단일 컴포넌트 구조로 제공합니다.",
    },
  ];

  return (
    <section
      id="fortheteam"
      className="relative w-full h-full flex items-center justify-center text-white bg-transparent pt-28 pb-32 lg:py-0 overflow-y-auto lg:overflow-hidden"
      style={{ fontFamily: 'var(--font-ftt)', WebkitOverflowScrolling: 'touch' }}
    >
      <div className="relative z-10 w-full max-w-450 mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-center">

        {/* ── LEFT: Content Card (외곽 선공개 드로잉 프레임 적용) ── */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col gap-7 bg-[#0b0b0c] p-8 shadow-[0_12px_50px_rgba(0,0,0,0.85)] relative rounded-none border border-white/5 overflow-hidden"
        >
          {/* 선형 프레임 드로잉 라인들 */}
          <motion.span
            variants={lineVariants}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 right-0 h-px bg-white/15"
          />
          <motion.span
            variants={verticalLineVariants}
            style={{ originY: 0 }}
            className="absolute top-0 bottom-0 right-0 w-px bg-white/15"
          />
          <motion.span
            variants={lineVariants}
            style={{ originX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-white/15"
          />
          <motion.span
            variants={verticalLineVariants}
            style={{ originY: 0 }}
            className="absolute top-0 bottom-0 left-0 w-1 bg-[#e23645]"
          />

          {/* Header & Title */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#e23645] inline-block shrink-0 rounded-none animate-pulse" />
              <p className="text-[#e23645] font-mono text-xs tracking-[0.4em] uppercase font-bold">
                ENTERPRISE_SPORTS_HUB::NODE_CALENDAR//
              </p>
            </div>
            
            <h2
              className="font-bold uppercase italic leading-[0.82] text-white pb-3 w-fit mb-6 relative"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
                letterSpacing: '-0.04em',
                fontFamily: '"Oswald", sans-serif',
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
              }}
            >
              FOR THE <br className="md:hidden" /> <span className="text-[#e23645]"> TEAM</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: customEasing, delay: 0.45 }}
                style={{ originX: 0 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e23645] block"
              />
            </h2>

            <p className="text-white/80 leading-relaxed font-light" style={{ fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)', lineHeight: '1.6' }}>
              다양한 글로벌 스포츠 프로바이더의 이기종 데이터를 규격화된 단일 도메인 모델로 정규화하고, 소켓 기반 라이브 스코어 동기화와 사용자 맞춤형 테마 주입을 지원하는 실시간 스포츠 허브 플랫폼입니다.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants}>
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              TECH_STACK//
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stacks.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#e23645]/60 hover:bg-[#e23645]/8 rounded-none transition-colors duration-300 group"
                >
                  <s.Icon className="text-[#e23645] text-base shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-semibold text-xs leading-tight">{s.name}</p>
                    <p className="text-white/40 font-mono text-[8px] leading-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engineering Highlights */}
          <div className="space-y-3.5">
            <motion.p variants={itemVariants} className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
              ENGINEERING_HIGHLIGHTS//
            </motion.p>
            {highlights.map((h, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-3.5 group">
                <div className="relative w-0.5 shrink-0 mt-1 rounded-none overflow-hidden">
                  <div className="absolute inset-0 bg-white/10" />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: customEasing }}
                    style={{ originY: 0 }}
                    className="absolute inset-0 bg-[#e23645]/50 group-hover:bg-[#e23645] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-[#e23645] font-bold text-lg md:text-xl mb-1.5">{h.title}</p>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Browser Mockup (3D Perspective Tilt & Radial Glow) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: customEasing, delay: 0.25 }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col gap-3"
        >
          {/* Screenshot */}
          <div
            className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] select-none overflow-hidden border border-white/10 rounded-none bg-[#070708] relative"
          >
            <div 
              className="w-full aspect-video overflow-hidden relative bg-[#0c0d0f]"
            >
              <img
                src="/projects/fortheteam.webp"
                alt="For The Team 스크린샷"
                loading="eager"
                decoding="async"
                className={`w-full h-full object-cover object-top transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070708] gap-3">
                  <div className="w-8 h-8 border-2 border-[#e23645]/20 border-t-[#e23645] rounded-full animate-spin" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#e23645] animate-pulse">LOAD_ASSET//</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 relative z-20">
            <a
              href="https://for-the-team.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#e23645] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-none flex items-center justify-center gap-2 tracking-wide transition-all shadow-[0_0_20px_rgba(226,54,69,0.25)] hover:shadow-[0_0_30px_rgba(226,54,69,0.4)]"
            >
              <SiVercel className="text-base" />
              <span>Live Site</span>
            </a>
            <a
              href="https://github.com/nx2803"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-none flex items-center justify-center gap-2 tracking-wide transition-all"
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