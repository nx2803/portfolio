import React, { useEffect, useRef, useState } from 'react';

interface MouseTrailProps {
  activeSection?: string;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
  coreR: number;
  coreG: number;
  coreB: number;
}

const sectionThemeMap: Record<string, ColorRGB> = {
  peecemaker: { r: 251, g: 146, b: 60, coreR: 254, coreG: 215, coreB: 170 }, // PeeceMaker Orange
  fortheteam: { r: 226, g: 54, b: 69, coreR: 254, coreG: 202, coreB: 202 },  // For The Team Crimson
  ufc: { r: 0, g: 255, b: 65, coreR: 187, coreG: 247, coreB: 208 },        // UFC Neon Green
};

const defaultTheme: ColorRGB = { r: 212, g: 175, b: 55, coreR: 255, coreG: 245, coreB: 220 }; // Champagne Gold

export default function MouseTrail({ activeSection = 'intro' }: MouseTrailProps) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });

  // 실시간 색상 Lerp 보간용 Ref
  const colorRef = useRef<ColorRGB>({ ...defaultTheme });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      const last = lastPosRef.current;

      if (last.x < 0) {
        last.x = x;
        last.y = y;
        trailRef.current.unshift({ x, y, time: now });
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 1.5) {
        const steps = Math.ceil(dist / 2);
        for (let i = 1; i <= steps; i++) {
          const ratio = i / steps;
          const subX = last.x + dx * ratio;
          const subY = last.y + dy * ratio;
          trailRef.current.unshift({ x: subX, y: subY, time: now });
        }
        last.x = x;
        last.y = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const MAX_AGE = 400; // 400ms 동안 연기처럼 은은하게 소멸하는 혜성 잔상

    const render = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // 섹션별 포인트 컬러 실시간 Lerp 변환
      const targetColor = sectionThemeMap[activeSection] || defaultTheme;
      const curColor = colorRef.current;

      curColor.r += (targetColor.r - curColor.r) * 0.08;
      curColor.g += (targetColor.g - curColor.g) * 0.08;
      curColor.b += (targetColor.b - curColor.b) * 0.08;
      curColor.coreR += (targetColor.coreR - curColor.coreR) * 0.08;
      curColor.coreG += (targetColor.coreG - curColor.coreG) * 0.08;
      curColor.coreB += (targetColor.coreB - curColor.coreB) * 0.08;

      const { r, g, b, coreR, coreG, coreB } = curColor;

      const trail = trailRef.current;

      // 만료된 궤적 제거
      while (trail.length > 0 && now - trail[trail.length - 1].time > MAX_AGE) {
        trail.pop();
      }

      if (trail.length >= 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 혜성 꼬리 스트로크 (섹션 동적 액센트 컬러 연동)
        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];

          const age = now - p1.time;
          const ratio = Math.max(0, 1 - age / MAX_AGE);

          if (ratio <= 0) continue;

          const smoothRatio = Math.pow(ratio, 2.0);
          const width = Math.max(0.2, smoothRatio * 2.5);
          const alpha = smoothRatio * 0.32;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
          ctx.lineWidth = width;
          ctx.shadowColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.4)`;
          ctx.shadowBlur = 6 * smoothRatio;
          ctx.stroke();
        }

        // 중앙 핵심 선명도 스트로크
        for (let i = 0; i < Math.min(trail.length - 1, 16); i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];

          const age = now - p1.time;
          const ratio = Math.max(0, 1 - age / MAX_AGE);

          if (ratio <= 0) continue;

          const smoothRatio = Math.pow(ratio, 2.2);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(${Math.round(coreR)}, ${Math.round(coreG)}, ${Math.round(coreB)}, ${smoothRatio * 0.45})`;
          ctx.lineWidth = Math.max(0.15, smoothRatio * 1.1);
          ctx.shadowBlur = 0;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, activeSection]);

  if (!mounted || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
