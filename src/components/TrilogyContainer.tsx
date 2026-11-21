import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $activeSection, updateActiveSection } from '../store/sectionStore';
import { setLenis } from '../lib/scroll';

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
    // 프로젝트 이미지 프리로드
    ['/projects/peecemaker.webp', '/projects/fortheteam.webp', '/projects/ufc.webp'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let lenis: any;
    let rafId = 0;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
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
    const observer = new IntersectionObserver(
      (entries) => {
        // 가장 많이 보이는 섹션을 active로 설정
        let maxRatio = 0;
        let dominantId = '';
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            dominantId = entry.target.id;
          }
        });
        if (dominantId) {
          updateActiveSection(dominantId);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const accentColor = ACCENT_COLORS[activeSection] || '#D4AF37';

  return (
    <main
      className="relative w-full bg-[#08080a] text-white"
      style={{
        '--accent': accentColor,
        '--foreground': '#f4f4f2',
        '--background': '#08080a',
      } as any}
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
        <section id="intro" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="techstack">
          <TechStackSection />
        </section>

        <section id="trilogy_intro">
          <ProjectTrilogySection />
        </section>

        <section id="peecemaker">
          <PeecemakerSection />
        </section>

        <section id="fortheteam">
          <ForTheTeamSection />
        </section>

        <section id="ufc">
          <UfcSection />
        </section>

        <section id="contact">
          <Footer />
        </section>
      </div>
    </main>
  );
}
