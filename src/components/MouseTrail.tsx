import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface MouseTrailProps {
  activeSection: string;
}

export default function MouseTrail({ activeSection }: MouseTrailProps) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 실시간 픽셀 좌표를 4자리 고정 정밀 테크니컬 포맷(예: 0824)으로 변환
  const xStr = useTransform(mouseX, (x) => String(Math.max(0, Math.floor(x))).padStart(4, '0'));
  const yStr = useTransform(mouseY, (y) => String(Math.max(0, Math.floor(y))).padStart(4, '0'));

  useEffect(() => {
    // 터치 디바이스(모바일)인 경우 활성화하지 않음
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // 모바일 렌더링 예외 처리
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // 액센트 컬러 동기화
  const accentColor = 
    activeSection === 'peecemaker' 
      ? '#fb923c' 
      : activeSection === 'fortheteam' 
        ? '#e23645' 
        : activeSection === 'ufc' 
          ? '#00ff41' 
          : '#ffffff';

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 overflow-visible"
    >

      {/* ── TECHNOCRATIC COORDINATES TAG (테크노크라틱 좌표 계측기) ── */}
      <div 
        className="absolute left-4 top-4 font-mono text-[11px] font-bold leading-normal tracking-[0.15em] opacity-95 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        style={{ color: accentColor }}
      >
        <div className="flex gap-1.5 whitespace-nowrap">
          <span className="opacity-50 font-bold">X //</span>
          <motion.span>{xStr}</motion.span>
        </div>
        <div className="flex gap-1.5 whitespace-nowrap">
          <span className="opacity-50 font-bold">Y //</span>
          <motion.span>{yStr}</motion.span>
        </div>
      </div>
    </motion.div>
  );
}
