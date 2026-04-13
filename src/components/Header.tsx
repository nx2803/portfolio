import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'peecemaker', label: 'Peecemaker' },
  { id: 'fortheteam', label: 'For The Team' },
  { id: 'ufc', label: 'UFC' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 화면의 50% 이상 차지하는 섹션을 현재 섹션으로 간주
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-white font-black tracking-[0.3em] uppercase text-sm">
          Trilogy
        </div>
        
        <nav className="flex gap-6">
          {sections.map(({ id, label }) => (
            <a 
              key={id} 
              href={`#${id}`}
              className={`relative text-xs uppercase tracking-widest transition-colors duration-300 ${
                activeSection === id ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {label}
              {activeSection === id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
