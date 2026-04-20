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
  { name: 'NEXT.JS', icon: SiNextdotjs, version: '15.1' },
  { name: 'REACT', icon: SiReact, version: '19.0' },
  { name: 'TYPESCRIPT', icon: SiTypescript, version: '5.7' },
  { name: 'FLUTTER', icon: SiFlutter, version: '3.27' },
  { name: 'TAILWIND', icon: SiTailwindcss, version: '4.0' },
  { name: 'REACT QUERY', icon: SiReactquery, version: '5.0' },
  { name: 'FRAMER MOTION', icon: SiFramer, version: '11.0' },
];

const backendItems: TechItem[] = [
  { name: 'SPRING BOOT', icon: SiSpringboot, version: '3.4' },
  { name: 'NESTJS', icon: SiNestjs, version: '11.0' },
  { name: 'PYTHON', icon: SiPython, version: '3.13' },
  { name: 'FASTAPI', icon: SiFastapi, version: '0.115' },
  { name: 'JAVA', icon: FaJava, version: '21' },
  { name: 'GEMINI AI', icon: SiGooglegemini, version: '1.5' },
];

const infraItems: TechItem[] = [
  { name: 'POSTGRESQL', icon: SiPostgresql, version: '17' },
  { name: 'DOCKER', icon: SiDocker, version: '27' },
  { name: 'PRISMA', icon: SiPrisma, version: '6.0' },
  { name: 'REDIS', icon: SiRedis, version: '7.4' },
  { name: 'VERCEL', icon: SiVercel, version: 'LATEST' },
  { name: 'SUPABASE', icon: SiSupabase, version: 'BaaS' },
];

// 무한 티커 컴포넌트
const TechTicker = ({ items, reverse = false, speed = 60 }: { items: (TechItem & { version: string })[], reverse?: boolean, speed?: number }) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 py-12 bg-transparent relative group">

      <motion.div
        className="flex items-center gap-32 pr-32"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 group/item">
            <item.icon className="text-6xl md:text-8xl text-white opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-500" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-base font-mono tracking-[0.3em] text-white/60 uppercase font-black group-hover/item:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-white/20 group-hover/item:text-white/40 transition-colors">
                  v.{item.version}
                </span>
              </div>
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
            TECH STACKS
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


    </section>
  );
}
