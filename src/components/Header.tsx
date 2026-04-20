import { motion, useScroll, useSpring } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'peecemaker', label: 'Peecemaker' },
  { id: 'fortheteam', label: 'For The Team' },
  { id: 'ufc', label: 'UFC' },
];

const progressColors: Record<string, string> = {
  intro: '#ffffff',
  techstack: '#ffffff',
  peecemaker: '#fb923c',
  fortheteam: '#dc3442',
  ufc: '#4ade80',
};

export default function Header() {
  // 전역 스토어를 구독하여 배경색 변화와 완벽하게 동기화
  const activeSection = useStore($activeSection);
  
  const { scrollYProgress } = useScroll();
  // 스크롤 반응성 상향: Stiffness를 높여 더 직관적으로 따라오게 조절
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120, // 더 기민하게 반응
    damping: 35,    // 묵직하게 안착
    restDelta: 0.001
  });

  const currentColor = progressColors[activeSection] || '#ffffff';

  return (
    <>
      {/* ── GLOBAL SCROLL PROGRESS BAR (Adaptive Sync) ── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] origin-left"
        style={{ 
          scaleX,
          backgroundColor: currentColor,
          boxShadow: `0 0 20px ${currentColor}`
        }}
        animate={{ 
          backgroundColor: currentColor,
          boxShadow: `0 0 20px ${currentColor}` 
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full max-w-7xl px-6">
        <nav className="bg-black/40 backdrop-blur-md px-12 py-4 flex justify-between items-center w-full border-b border-white/10 relative overflow-hidden">
          
          {/* LOGO: PURE WHITE STENCIL */}
          <div className="flex items-center">
            <div 
              className="text-white text-2xl uppercase tracking-[-0.02em] font-black"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              Trilogy
            </div>
          </div>
          
          {/* NAVIGATION: GLOBAL STORE SYNCED */}
          <div className="flex gap-10">
            {sections.map(({ id, label }) => (
              <a 
                key={id} 
                href={`#${id}`}
                className={`relative py-1 text-xs uppercase tracking-[0.35em] transition-all duration-300 font-mono font-black flex items-center gap-3 ${
                  activeSection === id ? 'text-white' : 'text-white/30 hover:text-white'
                }`}
              >
                {activeSection === id && (
                  <motion.div 
                    layoutId="activeDot"
                    animate={{ backgroundColor: currentColor, boxShadow: `0 0 8px ${currentColor}` }}
                    className="w-1.5 h-1.5 rounded-none" 
                  />
                )}
                <span>{label}</span>
                {activeSection === id && (
                  <motion.div
                    layoutId="activeTabHeader"
                    animate={{ backgroundColor: currentColor, boxShadow: `0 0 10px ${currentColor}` }}
                    className="absolute -bottom-1 left-0 w-full h-px"
                    transition={{ type: 'spring', stiffness: 250, damping: 35 }}
                  />
                )}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
