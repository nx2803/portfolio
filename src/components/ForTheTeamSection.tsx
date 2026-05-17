import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';
import { SiNestjs, SiNextdotjs, SiSocketdotio, SiOpentelemetry, SiRedis, SiPostgresql } from 'react-icons/si';

export default function ForTheTeamSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'fortheteam';

  // 피스메이커와 100% 동기화된 프리미엄 시네마틱 모션 Easing 정의
  const customEasing = [0.16, 1, 0.3, 1] as any; // Ultra-smooth cubic bezier

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
      title: "PPR & Socket.io — 1초 미만 라이브 동기화",
      desc: "NestJS Gateway와 Socket.io를 연동하여 실시간 점수 수집 즉시 캐시를 스마트 무효화, 1초 미만 레이턴시를 달성했습니다. 정적 셸은 미리 빌드하고 동적 정보만 비동기 스트리밍하는 PPR 아키텍처를 가동합니다.",
    },
    {
      title: "OpenTelemetry OTLP 분산 트레이싱 파이프라인",
      desc: "외부 KBO/ESPN API 수집 파이프라인 전 구간에 OpenTelemetry OTLP 추적을 이식해 데이터 처리 지연 및 크롤링 유실 지점을 정밀 탐지하여 병목을 제거했습니다.",
    },
    {
      title: "WCAG 기반 자동 연산 테마 대비 색상 엔진",
      desc: "각 구단의 헤리티지 컬러를 화면에 주입할 때, 가독성을 실시간 보증하기 위해 상대 휘도(Relative Luminance) 명암 공식으로 전경 색상을 웹뷰 내에서 자동 연산합니다.",
    },
  ];

  return (
    <section
      id="fortheteam"
      className="relative w-full h-screen flex items-center justify-center text-white bg-transparent overflow-hidden"
      style={{ fontFamily: 'var(--font-ftt)' }}
    >


      <div className="relative z-10 w-full max-w-450 mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-center">

        {/* ── LEFT: Content Card (피스메이커와 동일한 웅장하고 일체화된 단일 슬라이드 모션 - backdrop-blur 제거로 120fps 완성) ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: customEasing }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col gap-7 bg-[#0b0b0c] p-8 border border-white/8 border-l-2 border-l-[#e23645] shadow-[0_12px_50px_rgba(0,0,0,0.85)] relative rounded-none"
        >
          {/* Header & Title */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#e23645] inline-block shrink-0 rounded-none animate-pulse" />
              <p className="text-[#e23645] font-mono text-xs tracking-[0.4em] uppercase font-bold">
                ENTERPRISE_SPORTS_HUB::NODE_CALENDAR//
              </p>
            </div>
            
            <h2
              className="font-bold uppercase italic leading-[0.82] text-white mb-5"
              style={{
                fontSize: 'clamp(3.5rem, 5.5vw, 5.5rem)',
                letterSpacing: '-0.04em',
                fontFamily: '"Oswald", sans-serif',
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
              }}
            >
              FOR THE <br />
              <span className="text-[#e23645]">TEAM</span>
            </h2>

            <p className="text-white/75 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
              전 세계 5개 이상의 메이저 스포츠 데이터 프로바이더를 병렬 연동하여 실시간 경기 지표와 스케줄러를 제공하는 엔터프라이즈 스포츠 캘린더 플랫폼입니다. 이기종 외부 API 규격을 완벽한 단일 도메인 모델로 정규화했습니다.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              TECH_STACK//
            </p>
            <div className="flex flex-wrap gap-2">
              {stacks.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#e23645]/60 hover:bg-[#e23645]/8 rounded-none transition-all duration-300 group"
                >
                  <s.Icon className="text-[#e23645] text-base shrink-0 group-hover:scale-110 transition-transform" />
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
            <p className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
              ENGINEERING_HIGHLIGHTS//
            </p>
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-3.5 group">
                <div className="w-0.5 bg-[#e23645]/40 shrink-0 group-hover:bg-[#e23645] transition-colors mt-0.5 rounded-none" />
                <div>
                  <p className="text-[#e23645] font-bold text-sm mb-0.5">{h.title}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Browser Mockup (피스메이커와 완벽 대칭인 단일 스케일 모션) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: customEasing, delay: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col gap-3"
        >
          {/* Screenshot */}
          <div className="w-full drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)] group select-none overflow-hidden border border-white/10 rounded-none bg-[#070708]">
            <div className="w-full aspect-video overflow-hidden">
              <img
                src="/projects/fortheteam.webp"
                alt="For The Team 스크린샷"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href="https://for-the-team.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#e23645] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-none text-center tracking-wide transition-all shadow-[0_0_20px_rgba(226,54,69,0.25)] hover:shadow-[0_0_30px_rgba(226,54,69,0.4)]"
            >
              Live Site →
            </a>
            <a
              href="https://github.com/nx2803"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-none text-center tracking-wide transition-all"
            >
              GitHub →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}