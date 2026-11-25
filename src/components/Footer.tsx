import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

/** 섹션이 뷰포트에 들어올 때 1회만 재생 (마운트 시 실행 방지) */
const inView = { once: true, amount: 0.3 } as const;

export default function Footer() {
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-transparent text-(--foreground) px-6 md:px-16 lg:px-24 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-10 md:gap-14">

        {/* ── HEADER (다른 섹션 제목과 동일 스케일) ── */}
        <div className="flex items-center gap-6 md:gap-10 relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-6xl font-display font-extrabold uppercase tracking-tight shrink-0 whitespace-nowrap text-white"
          >
            CONTACT
          </motion.h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.4, ease: easing, delay: 0.15 }}
            className="h-px flex-1 bg-linear-to-r from-[#D4AF37]/60 via-white/20 to-transparent origin-left mt-2"
          />
        </div>

        {/* ── LINKS: 중앙 기준 좌우 반반 ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative flex flex-row items-center justify-center gap-6 md:grid md:grid-cols-2 md:gap-0 md:border-t md:border-white/[0.06] md:pt-10"
        >
          {/* 중앙 구분선 */}
          <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-0 w-px bg-white/[0.08]" />

          <a
            href="mailto:nx2803@gmail.com"
            className="group flex items-center justify-center gap-2.5 sm:gap-4 text-base sm:text-lg md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white/90 hover:text-[#E5C378] transition-colors min-w-0"
          >
            <MdEmail className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white/80 shrink-0 transition-all group-hover:scale-110 group-hover:text-[#D4AF37]" />
            <span className="whitespace-nowrap">nx2803@gmail.com</span>
          </a>

          <a
            href="https://github.com/nx2803"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 sm:gap-4 text-base sm:text-lg md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white/90 hover:text-[#E5C378] transition-colors min-w-0"
          >
            <SiGithub className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white/80 shrink-0 transition-all group-hover:scale-110 group-hover:text-[#D4AF37]" />
            {/* 좁은 화면에서 한 줄을 지키려면 핸들만 노출 (sm 이상은 전체 URL) */}
            <span className="whitespace-nowrap sm:hidden">@nx2803</span>
            <span className="hidden sm:inline whitespace-nowrap">github.com/nx2803</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
