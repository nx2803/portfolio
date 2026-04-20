import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript, SiDart, SiFlutter, SiTailwindcss,
  SiReactquery, SiFramer, SiSocketdotio, SiSpringboot, SiNestjs,
  SiPython, SiFastapi, SiGooglegemini, SiPostgresql, SiRedis,
  SiPrisma, SiSupabase, SiDocker, SiOpentelemetry, SiVercel,
  SiRender, SiHuggingface, SiKoyeb
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

interface TechItem {
  name: string;
  icon: any;
}

const frontendItems: TechItem[] = [
  { name: 'NEXT.JS', icon: SiNextdotjs },
  { name: 'REACT', icon: SiReact },
  { name: 'TYPESCRIPT', icon: SiTypescript },
  { name: 'DART', icon: SiDart },
  { name: 'FLUTTER', icon: SiFlutter },
  { name: 'TAILWIND', icon: SiTailwindcss },
  { name: 'REACT QUERY', icon: SiReactquery },
  { name: 'FRAMER MOTION', icon: SiFramer },
];

const backendItems: TechItem[] = [
  { name: 'SPRING BOOT', icon: SiSpringboot },
  { name: 'NESTJS', icon: SiNestjs },
  { name: 'SOCKET.IO', icon: SiSocketdotio },
  { name: 'PYTHON', icon: SiPython },
  { name: 'FASTAPI', icon: SiFastapi },
  { name: 'JAVA', icon: FaJava },
  { name: 'GEMINI AI', icon: SiGooglegemini },

];

const infraItems: TechItem[] = [
  { name: 'POSTGRESQL', icon: SiPostgresql },
  { name: 'DOCKER', icon: SiDocker },
  { name: 'PRISMA', icon: SiPrisma },
  { name: 'REDIS', icon: SiRedis },
  { name: 'OPENTELEMETRY', icon: SiOpentelemetry },
  { name: 'VERCEL', icon: SiVercel },
  { name: 'RENDER', icon: SiRender },
  { name: 'SUPABASE', icon: SiSupabase },
  { name: 'KOYEB', icon: SiKoyeb },
  { name: 'HUGGING FACE', icon: SiHuggingface },
];

// 개별 기술 타일 컴포넌트
const TechTile = ({ item, idx }: { item: TechItem, idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: idx * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -5 }}
      className="relative flex flex-col items-center justify-center py-6 md:py-10 group"
    >
      <item.icon className="text-4xl md:text-6xl text-white/80 group-hover:text-white transition-all duration-500" />
      <span className="mt-4 text-[9px] md:text-[11px] font-mono text-white/60 group-hover:text-white tracking-[0.2em] uppercase transition-all duration-500">
        {item.name}
      </span>
    </motion.div>
  );
};

export default function TechStackSection() {
  return (
    <section id="techstack" className="relative w-full py-24 md:py-40 flex flex-col items-center bg-transparent overflow-hidden">

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 w-full px-6 md:px-20 mb-20 md:mb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-px bg-white opacity-20" />
            <span className="text-white font-mono text-xs tracking-[0.6em] uppercase font-black opacity-60">
              SYSTEM_INTEGRATION
            </span>
            <div className="w-16 h-px bg-white opacity-20" />
          </div>
          <h2
            className="text-[clamp(2.5rem,10vw,8rem)] font-black uppercase text-white leading-none tracking-[-0.05em]"
            style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
          >
            TECH STACKS
          </h2>
        </motion.div>
      </div>

      {/* ── SPONSOR WALL GRID ── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-20 relative z-10 flex flex-col gap-24">

        {/* TIER 01: FRONTEND */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-mono text-white/20 font-black">01</span>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase" style={{ fontFamily: "'Saira Stencil One', sans-serif" }}>
              FRONTEND_ENGINEERING
            </h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {frontendItems.map((item, idx) => (
              <TechTile key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>

        {/* TIER 02: BACKEND */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-mono text-white/20 font-black">02</span>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase" style={{ fontFamily: "'Saira Stencil One', sans-serif" }}>
              BACKEND_INFRASTRUCTURE
            </h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {backendItems.map((item, idx) => (
              <TechTile key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>

        {/* TIER 03: INFRA & DATA */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-mono text-white/20 font-black">03</span>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase" style={{ fontFamily: "'Saira Stencil One', sans-serif" }}>
              DEVOPS_DATABASE
            </h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {infraItems.map((item, idx) => (
              <TechTile key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>

      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

    </section>
  );
}
