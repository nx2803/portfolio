import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

/** 섹션이 뷰포트에 들어올 때 1회만 재생 (마운트 시 실행 방지) */
const inView = { once: true, amount: 0.2 } as const;

export default function Footer() {
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="w-full relative flex flex-col items-center px-6 md:px-16 lg:px-24 bg-transparent text-(--foreground) py-24 lg:py-32">

      <div className="w-full max-w-[1800px] flex flex-col items-center relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-12 md:mb-20 lg:mb-24 flex items-center gap-6 md:gap-10 w-full overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight shrink-0 whitespace-nowrap text-white"
          >
            CONTACT
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.4, ease: easing, delay: 0.1 }}
            className="h-px bg-linear-to-r from-[#D4AF37]/60 via-white/20 to-transparent flex-1 origin-left mt-2"
          />
        </div>

        {/* ── SYMMETRIC CONTACT GRID ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 relative">

          {/* Vertical Separator */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ duration: 1.4, ease: easing, delay: 0.15 }}
            className="absolute left-1/2 top-0 w-px h-full bg-white/10 hidden md:block origin-top z-20"
          />

          {/* EMAIL PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-14 lg:p-20 group">
            <div className="flex flex-col items-center gap-6 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.9, delay: 0.1, ease: easing }}
              >
                <MdEmail className="text-6xl md:text-[120px] lg:text-[140px] text-white/80 transition-all duration-500 group-hover:scale-105 group-hover:text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-3 w-full max-w-lg">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-6 h-px bg-[#D4AF37]/60 origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="text-xs font-display tracking-[0.3em] font-semibold text-[#D4AF37] uppercase"
                  >
                    EMAIL CONTACT
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  href="mailto:nx2803@gmail.com"
                  className="text-xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase leading-none transition-colors text-center break-all text-white group-hover:text-[#E5C378]"
                >
                  nx2803@gmail.com
                </motion.a>
              </div>
            </div>
          </div>

          {/* 모바일 구분선 */}
          <div className="md:hidden w-full h-px bg-white/10 my-2" />

          {/* GITHUB PORT */}
          <div className="relative flex flex-col items-center justify-center p-8 md:p-14 lg:p-20 group">
            <div className="flex flex-col items-center gap-6 w-full">

              {/* Icon rendering */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.9, delay: 0.15, ease: easing }}
              >
                <SiGithub className="text-6xl md:text-[120px] lg:text-[140px] text-white/80 transition-all duration-500 group-hover:scale-105 group-hover:text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
              </motion.div>

              <div className="flex flex-col items-center gap-3 w-full max-w-lg">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="w-6 h-px bg-[#D4AF37]/60 origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-xs font-display tracking-[0.3em] font-semibold text-[#D4AF37] uppercase"
                  >
                    GITHUB PROFILE
                  </motion.span>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  href="https://github.com/nx2803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase leading-none transition-colors text-center text-white group-hover:text-[#E5C378]"
                >
                  github.com/nx2803
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
