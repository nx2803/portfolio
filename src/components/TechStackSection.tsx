import { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiDart, SiFlutter, SiTailwindcss, 
  SiReactquery, SiFramer, SiSocketdotio, SiSpringboot, SiNestjs, 
  SiPython, SiFastapi, SiGooglegemini, SiPostgresql, SiRedis, 
  SiPrisma, SiSupabase, SiDocker, SiOpentelemetry, SiVercel, 
  SiRender, SiHuggingface, SiKoyeb
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useStore } from '@nanostores/react';
import { $activeSection } from '../store/sectionStore';

interface TechItem {
  name: string;
  icon: any;
}

const frontendItems: TechItem[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Dart', icon: SiDart },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'React Query', icon: SiReactquery },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Socket.io', icon: SiSocketdotio },
];

const backendItems: TechItem[] = [
  { name: 'Java', icon: FaJava },
  { name: 'Spring Boot', icon: SiSpringboot },
  { name: 'NestJS', icon: SiNestjs },
  { name: 'Python', icon: SiPython },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Google Gemini', icon: SiGooglegemini },
];

const infraItems: TechItem[] = [
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Redis', icon: SiRedis },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'Docker', icon: SiDocker },
  { name: 'OpenTelemetry', icon: SiOpentelemetry },
  { name: 'Vercel', icon: SiVercel },
  { name: 'Render', icon: SiRender },
  { name: 'Hugging Face', icon: SiHuggingface },
  { name: 'Koyeb', icon: SiKoyeb },
];

// 자식 로고의 Variants: 부모 stagger에 의해 순차 실행됨
const logoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] as any }
  }
};

// 컨테이너: stagger 조율만, opacity 자체 애니메이션 없음
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 }
  }
};

const SponsorLogo = memo(({ item }: { item: TechItem }) => (
  <div className="p-4 md:p-8">
    <motion.div
      variants={logoVariants}
      className="flex flex-col items-center justify-center grayscale hover:grayscale-0 hover:opacity-100 transition-[filter] duration-300 group cursor-default"
    >
      <item.icon className="text-5xl md:text-7xl mb-4 text-white" />
      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-500 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
        {item.name}
      </span>
    </motion.div>
  </div>
));
SponsorLogo.displayName = 'SponsorLogo';

const TierGrid = memo(({ items }: { items: TechItem[] }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 md:gap-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {items.map((item) => (
        <SponsorLogo key={item.name} item={item} />
      ))}
    </motion.div>
  );
});
TierGrid.displayName = 'TierGrid';

export default function TechStackSection() {
  const activeSection = useStore($activeSection);
  const isTransitionTarget = activeSection === 'techstack';

  return (
    <section id="techstack" className="relative w-full min-h-screen py-40 flex items-center justify-center bg-transparent overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
      
      <div className="relative z-10 w-full max-w-400 mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-white/40 mb-6">Partnering Technologies</h2>
          <h3 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase italic"
            style={{ viewTransitionName: isTransitionTarget ? 'project-title' : 'none' }}
          >
            Engineering <span className="text-white/30">Backdrop</span>
          </h3>
        </motion.div>

        <div className="w-full flex flex-col gap-24">

          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 mb-12 flex items-center gap-4 w-full">
              <span className="h-px flex-1 bg-white/10" />
              Tier 01 // Frontend Interface
              <span className="h-px flex-1 bg-white/10" />
            </h4>
            <TierGrid items={frontendItems} />
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 mb-12 flex items-center gap-4 w-full">
              <span className="h-px flex-1 bg-white/10" />
              Tier 02 // Logic & Intelligence
              <span className="h-px flex-1 bg-white/10" />
            </h4>
            <TierGrid items={backendItems} />
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 mb-12 flex items-center gap-4 w-full">
              <span className="h-px flex-1 bg-white/10" />
              Tier 03 // System Infrastructure
              <span className="h-px flex-1 bg-white/10" />
            </h4>
            <TierGrid items={infraItems} />
          </div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-40 pt-12 border-t border-white/10 w-full flex justify-between items-center text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase"
        >
          <span>Authored by NX280</span>
          <span>© 2026 Trilogy System</span>
          <span>Build Status: 100% stable</span>
        </motion.div>
      </div>
    </section>
  );
}
