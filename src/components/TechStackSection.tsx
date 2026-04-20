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
  { name: 'FLUTTER', icon: SiFlutter },
  { name: 'TAILWIND', icon: SiTailwindcss },
  { name: 'REACT QUERY', icon: SiReactquery },
  { name: 'FRAMER MOTION', icon: SiFramer },
];

const backendItems: TechItem[] = [
  { name: 'SPRING BOOT', icon: SiSpringboot },
  { name: 'NESTJS', icon: SiNestjs },
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
  { name: 'VERCEL', icon: SiVercel },
  { name: 'SUPABASE', icon: SiSupabase },
];

// 무한 티커 컴포넌트
const TechTicker = ({ items, reverse = false, speed = 60 }: { items: TechItem[], reverse?: boolean, speed?: number }) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 py-12 bg-transparent relative group">
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex items-center gap-32 pr-32"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 group/item">
            <item.icon className="text-6xl md:text-8xl text-white opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-500" />
            <div className="flex flex-col gap-2">
              <span className="text-base font-mono tracking-[0.3em] text-white/60 uppercase font-black group-hover/item:text-white transition-colors">
                {item.name}
              </span>
              <div className="w-0 group-hover/item:w-full h-0.5 bg-white transition-all duration-500 shadow-[0_0_8px_white]" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStackSection() {
  return (
    <section id="techstack" className="relative w-full min-h-screen py-40 flex flex-col items-center justify-center bg-transparent overflow-hidden">

      {/* ── SECTION HEADER: 중앙 정렬 복구 ── */}
      <div className="relative z-10 w-full px-6 md:px-20 mb-40 flex flex-col items-center text-center">
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
            className="text-[clamp(4rem,12vw,10rem)] font-black uppercase text-white leading-none tracking-[-0.05em] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
          >
            TECK STACKS
          </h2>
        </motion.div>
      </div>

      {/* ── TICKER DATA STREAM ── */}
      <div className="w-full flex flex-col gap-16 relative z-10">

        {/* TIER 01: FRONTEND */}
        <div className="flex flex-col gap-6">
          <div className="px-6 md:px-20 flex items-end gap-6">
            <span className="text-4xl md:text-6xl font-mono text-white opacity-20 font-black">01</span>
            <h3
              className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              INTERFACE
            </h3>
            <div className="flex-1 h-px bg-white opacity-10 mb-4" />
          </div>
          <TechTicker items={frontendItems} speed={60} />
        </div>

        {/* TIER 02: BACKEND */}
        <div className="flex flex-col gap-6">
          <div className="px-6 md:px-20 flex items-end gap-6">
            <span className="text-4xl md:text-6xl font-mono text-white opacity-20 font-black">02</span>
            <h3
              className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              LOGIC
            </h3>
            <div className="flex-1 h-px bg-white opacity-10 mb-4" />
          </div>
          <TechTicker items={backendItems} reverse speed={75} />
        </div>

        {/* TIER 03: INFRA */}
        <div className="flex flex-col gap-6">
          <div className="px-6 md:px-20 flex items-end gap-6">
            <span className="text-4xl md:text-6xl font-mono text-white opacity-20 font-black">03</span>
            <h3
              className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter"
              style={{ fontFamily: "'Saira Stencil One', sans-serif" }}
            >
              INFRASTRUCTURE
            </h3>
            <div className="flex-1 h-px bg-white opacity-10 mb-4" />
          </div>
          <TechTicker items={infraItems} speed={65} />
        </div>

      </div>

      {/* ── FOOTER MARKING ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        className="mt-40 w-full max-w-7xl px-20 flex justify-between items-center text-[10px] font-mono text-white tracking-[0.4em] uppercase font-black"
      >
        <span>NX280_SYSTEM_NODE</span>
        <div className="flex gap-12">
          <span>VER_2026.4</span>
          <span>STABLE_STATE</span>
        </div>
      </motion.div>

    </section>
  );
}
