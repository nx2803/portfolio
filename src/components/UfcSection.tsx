import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiSpring, SiFastapi, SiPython, SiPostgresql, SiNextdotjs } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

/**
 * 100% 안전한 인라인 Typewriter 커스텀 훅
 * absolute 포지셔닝이나 감춰진 Spacer 없이, 표준 HTML inline-level span으로
 * 텍스트를 타이핑하여 레이아웃 깨짐을 원천 차단합니다.
 */
function useTypewriter(text: string, delay: number, speed: number, active: boolean) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout>;
    let current = 0;
    setDisplayed('');

    const start = setTimeout(() => {
      const type = () => {
        if (current < text.length) {
          current++;
          setDisplayed(text.substring(0, current));
          timer = setTimeout(type, speed);
        }
      };
      type();
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, delay, speed, active]);

  return displayed;
}

/** 인라인 타이핑 컴포넌트 — 텍스트 흐름을 방해하지 않고 레이아웃을 백퍼센트 보존 */
function InlineTypewriter({
  text,
  delay,
  speed,
  active,
  className = '',
  style,
  cursor = true,
  cursorColor = '#00ff41',
  as: Component = 'span',
}: {
  text: string;
  delay: number;
  speed: number;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
  cursor?: boolean;
  cursorColor?: string;
  as?: any;
}) {
  const typed = useTypewriter(text, delay, speed, active);
  return (
    <Component className={`${className} relative`} style={style}>
      {/* 텍스트 크기 공간을 100% 예약하는 투명 스페이서 */}
      <span className="invisible whitespace-pre-line block w-full">{text}</span>
      
      {/* 절대 좌표로 위에 얹어지는 타이핑 영역 */}
      <span className="absolute inset-0 whitespace-pre-line block w-full">
        {typed}
        {cursor && typed.length < text.length && (
          <span
            className="inline-block w-1.5 h-[0.85em] ml-1 align-middle animate-pulse shrink-0"
            style={{ backgroundColor: cursorColor }}
          />
        )}
      </span>
    </Component>
  );
}

/**
 * 선형으로 드로잉되는 UFC 스타일 타겟 프레임
 * 4개의 ㄱ자 브래킷이 지정된 딜레이에 따라 라인을 길게 그리는 애니메이션 효과
 */
function CornerFrame({
  size = 20,
  thickness = 2,
  color = 'rgba(255,255,255,0.45)',
  offset = 8,
  delay = 0,
}: {
  size?: number;
  thickness?: number;
  color?: string;
  offset?: number;
  delay?: number;
}) {
  const o = -offset;
  const easing = [0.16, 1, 0.3, 1] as any;

  return (
    <>
      {/* Top Left */}
      <div style={{ position: 'absolute', top: `${o}px`, left: `${o}px`, width: `${size}px`, height: `${size}px`, pointerEvents: 'none' }}>
        {/* Horizontal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${thickness}px`, backgroundColor: color, originX: 0 }}
        />
        {/* Vertical */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', top: 0, left: 0, width: `${thickness}px`, height: '100%', backgroundColor: color, originY: 0 }}
        />
      </div>

      {/* Top Right */}
      <div style={{ position: 'absolute', top: `${o}px`, right: `${o}px`, width: `${size}px`, height: `${size}px`, pointerEvents: 'none' }}>
        {/* Horizontal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: `${thickness}px`, backgroundColor: color, originX: 1 }}
        />
        {/* Vertical */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', top: 0, right: 0, width: `${thickness}px`, height: '100%', backgroundColor: color, originY: 0 }}
        />
      </div>

      {/* Bottom Left */}
      <div style={{ position: 'absolute', bottom: `${o}px`, left: `${o}px`, width: `${size}px`, height: `${size}px`, pointerEvents: 'none' }}>
        {/* Horizontal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${thickness}px`, backgroundColor: color, originX: 0 }}
        />
        {/* Vertical */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', bottom: 0, left: 0, width: `${thickness}px`, height: '100%', backgroundColor: color, originY: 1 }}
        />
      </div>

      {/* Bottom Right */}
      <div style={{ position: 'absolute', bottom: `${o}px`, right: `${o}px`, width: `${size}px`, height: `${size}px`, pointerEvents: 'none' }}>
        {/* Horizontal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: `${thickness}px`, backgroundColor: color, originX: 1 }}
        />
        {/* Vertical */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: easing, delay }}
          style={{ position: 'absolute', bottom: 0, right: 0, width: `${thickness}px`, height: '100%', backgroundColor: color, originY: 1 }}
        />
      </div>
    </>
  );
}

export default function UfcSection() {
  const [mounted, setMounted] = useState(false);
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'ufc';
  const easing = [0.16, 1, 0.3, 1] as any;

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <section id="ufc" className="min-h-screen" />;

  const stacks = [
    { Icon: FaJava, name: 'JAVA 21', desc: 'Virtual Threads Core' },
    { Icon: SiSpring, name: 'SPRING BATCH 6', desc: 'Chunk Processing' },
    { Icon: SiPython, name: 'PYTHON 3.12', desc: 'Data Analytics' },
    { Icon: SiFastapi, name: 'FASTAPI', desc: 'LLM Agent Orchestration' },
    { Icon: SiNextdotjs, name: 'NEXT.JS 15', desc: 'RSC Streaming' },
    { Icon: SiPostgresql, name: 'POSTGRESQL', desc: 'Relational Store' },
  ];

  const highlights = [
    {
      title: "Java 21 Virtual Threads — 고성능 병렬 수집",
      desc: "Java 21 가상 스레드를 통해 외부 API I/O 병목과 무거운 OS 스레드 비용을 블로킹 없이 해소합니다. Spring Batch 6의 Chunk Processing 트랜잭션으로 코퍼스 데이터 적재 무결성을 전면 보장합니다.",
    },
    {
      title: "Gemini AI — 실시간 기술 트렌드 해설 에이전트",
      desc: "FastAPI와 google-genai SDK를 조율하여 매일 누적 지표를 분석하고, 2차 데이터 완결성 사전 검증 필터로 할루시네이션을 방지하며 스포츠 중계 톤의 한글 해설을 자동 생성합니다.",
    },
    {
      title: "Next.js 15 RSC & 대비 보정 UI 알고리즘",
      desc: "React 19 서버 컴포넌트로 데이터를 지연 없이 스트리밍하며, 브랜드 컬러와 배경색 간의 가독성 간섭을 막기 위해 HSL 명도를 자동 연산 보정하는 logoUtils 알고리즘을 이식했습니다.",
    },
  ];

  return (
    <section
      id="ufc"
      className="relative w-full h-screen flex items-center justify-center text-[#e1e4e8] bg-transparent overflow-hidden"
      style={{ fontFamily: 'var(--font-ufc)' }}
    >
      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-150 h-150 bg-white/[0.012] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-center">

        {/* ── LEFT: Content — 전체를 4-corner 타겟 프레임으로 감쌈 ── */}
        <div className="flex flex-col gap-7 relative">
          {/* 좌측 콘텐츠 전체를 감싸는 4개 ㄱ자 UFC 타겟 프레임 */}
          <CornerFrame size={24} thickness={2} color="rgba(255,255,255,1)" offset={12} delay={0} />

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#00ff41] shadow-[0_0_8px_#00ff41] animate-pulse inline-block shrink-0" />
              <InlineTypewriter
                text="C:\UFC\SYSTEM\ANALYSIS_MODULE//"
                className="text-[#6a737d] font-mono text-xs tracking-[0.4em] uppercase font-bold"
                delay={0.1}
                speed={20}
                active={isTransitionTarget}
              />
            </div>
            
            <InlineTypewriter
              text={"ULTIMATE\nFRAMEWORK\nCHAMPIONSHIP"}
              className="font-black leading-[0.82] text-white mb-5 block whitespace-pre-line"
              style={{
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                letterSpacing: '-0.04em',
                fontFamily: '"Geologica", sans-serif',
                viewTransitionName: isTransitionTarget ? 'project-title' : 'none',
              }}
              delay={0.3}
              speed={25}
              active={isTransitionTarget}
              as="h2"
            />

            {/* 소개 */}
            <InlineTypewriter
              text="대규모 기술 트렌드 코퍼스를 Java 21과 AI 해설 에이전트를 통해 정밀 분석하여 중계하는 고성능 시계열 랭킹 대시보드입니다. Polestar의 차갑고 정밀한 북유럽식 미니멀리즘에서 시각적 영감을 받았습니다."
              className="text-white/75 leading-relaxed block"
              style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
              delay={0.8}
              speed={16}
              active={isTransitionTarget}
              as="p"
              cursorColor="rgba(255,255,255,0.5)"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <InlineTypewriter
              text="TECH_STACK//"
              className="text-white/25 font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block"
              delay={1.1}
              speed={30}
              active={isTransitionTarget}
            />
            <div className="flex flex-wrap gap-2">
              {stacks.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: easing, delay: 1.2 + i * 0.05 }}
                  className="flex items-center gap-2 px-3.5 py-2 bg-black/40 border border-[#747474]/40 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group"
                  style={{ borderRadius: 0 }}
                >
                  <s.Icon className="text-white/70 text-base shrink-0 group-hover:text-white group-hover:scale-110 transition-all" />
                  <div>
                    <p className="text-white font-semibold text-xs leading-tight">{s.name}</p>
                    <p className="text-white/35 font-mono text-[8px] leading-tight">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="space-y-3.5">
            <InlineTypewriter
              text="ENGINEERING_HIGHLIGHTS//"
              className="text-white/25 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block"
              delay={1.4}
              speed={30}
              active={isTransitionTarget}
            />
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-3.5 group">
                {/* 선형 생성 애니메이션 바 */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: easing, delay: 1.5 + i * 0.15 }}
                  className="w-0.5 bg-white/20 shrink-0 origin-top group-hover:bg-white/60 transition-colors mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <InlineTypewriter
                    text={h.title}
                    className="text-white font-bold text-sm mb-1 block"
                    delay={1.6 + i * 0.15}
                    speed={15}
                    active={isTransitionTarget}
                  />
                  <InlineTypewriter
                    text={h.desc}
                    className="text-white/55 text-sm leading-relaxed block"
                    delay={1.8 + i * 0.15}
                    speed={10}
                    active={isTransitionTarget}
                    cursor={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Screenshot + Buttons ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: easing, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          {/* 브라우저 목업을 감싸는 4개 ㄱ자 UFC 타겟 프레임 */}
          <div className="w-full drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)] group select-none relative">
            <CornerFrame size={18} thickness={2} color="rgba(255,255,255,1)" offset={6} delay={0.3} />

            {/* Screenshot Container with laser-drawing borders */}
            <div
              className="w-full overflow-hidden relative bg-[#0c0d0f]"
              style={{ borderRadius: 0 }}
            >
              
              {/* Top */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: easing, delay: 0.5 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', backgroundColor: '#747474', originX: 0, zIndex: 10 }}
              />
              {/* Bottom */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: easing, delay: 0.5 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#747474', originX: 1, zIndex: 10 }}
              />
              {/* Left */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: easing, delay: 0.5 }}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', backgroundColor: '#747474', originY: 0, zIndex: 10 }}
              />
              {/* Right */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: easing, delay: 0.5 }}
                style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px', backgroundColor: '#747474', originY: 1, zIndex: 10 }}
              />

              <div className="w-full aspect-video overflow-hidden">
                <img
                  src="/projects/ufc.webp"
                  alt="UFC Dashboard 스크린샷"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing, delay: 1.4 }}
              href="https://ultimate-framework-championship.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white text-black font-bold text-sm text-center tracking-wide transition-all hover:bg-[#e1e4e8]"
              style={{ borderRadius: 0 }}
            >
              Live Dashboard →
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing, delay: 1.5 }}
              href="https://github.com/nx2803/UFC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-transparent border border-[#747474] text-white font-bold text-sm text-center tracking-wide transition-all hover:border-white hover:bg-white/5"
              style={{ borderRadius: 0 }}
            >
              GitHub →
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
