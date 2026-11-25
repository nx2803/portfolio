import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { MotionConfig } from 'framer-motion';
import { $activeSection, updateActiveSection } from '../store/sectionStore';
import { setLenis } from '../lib/scroll';
import type Lenis from 'lenis';

// 섹션 컴포넌트 직접 임포트
import HeroSection from './HeroSection';
import TechStackSection from './TechStackSection';
import ProjectTrilogySection from './ProjectTrilogySection';
import PeecemakerSection from './PeecemakerSection';
import ForTheTeamSection from './ForTheTeamSection';
import UfcSection from './UfcSection';
import Footer from './Footer';
import CosmicBackground from './CosmicBackground';
import MouseTrail from './MouseTrail';

const SECTION_IDS = ['intro', 'techstack', 'trilogy_intro', 'peecemaker', 'fortheteam', 'ufc', 'contact'];

const ACCENT_COLORS: Record<string, string> = {
  peecemaker: '#fb923c',
  fortheteam: '#e23645',
  ufc: '#00ff41',
};

export default function TrilogyContainer() {
  const activeSection = useStore($activeSection);

  // Lenis 스무스 스크롤 초기화 (인스턴스는 전역 store로 공유해 내비게이션과 동일 엔진 사용)
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId = 0;
    let cancelled = false;

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;

      lenis = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  // Intersection Observer로 activeSection 추적
  useEffect(() => {
    // threshold를 넘은 배치가 없어도 정확한 섹션이 남도록 전체 ratio를 누적해서 비교한다.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let dominantId = '';
        let maxRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            dominantId = id;
          }
        });

        if (dominantId) {
          updateActiveSection(dominantId);
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const accentColor = ACCENT_COLORS[activeSection] || '#D4AF37';

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="relative w-full bg-[#08080a] text-white"
        style={{
          '--accent': accentColor,
          '--foreground': '#f4f4f2',
          '--background': '#08080a',
        } as React.CSSProperties}
      >
        {/* ── MOUSE TRAIL LAYER ── */}
        <MouseTrail activeSection={activeSection} />

        {/* ── COSMIC BACKGROUND (fixed) ── */}
        <CosmicBackground activeSection={activeSection} />

        {/* Peecemaker 글로벌 그라데이션 */}
        <div
          className="fixed inset-0 bg-linear-to-tr from-[#e0f5ff]/20 via-[#ffe9c5]/20 to-[#e0f5ff]/20 pointer-events-none transition-opacity duration-1000"
          style={{ zIndex: 1, opacity: activeSection === 'peecemaker' ? 1 : 0 }}
        />

        {/* ── 모든 섹션을 세로로 연속 배치 ── */}
        <div className="relative z-10">
          <section id="intro" className="min-h-screen scroll-mt-24">
            <HeroSection />
          </section>

          <section id="techstack" className="scroll-mt-24">
            <TechStackSection />
          </section>

          <section id="trilogy_intro" className="scroll-mt-24">
            <ProjectTrilogySection />
          </section>

          <section id="peecemaker" className="scroll-mt-24">
            <PeecemakerSection />
          </section>

          <section id="fortheteam" className="scroll-mt-24">
            <ForTheTeamSection />
          </section>

          <section id="ufc" className="scroll-mt-24">
            <UfcSection />
          </section>

          <section id="contact" className="scroll-mt-24">
            <Footer />
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}
