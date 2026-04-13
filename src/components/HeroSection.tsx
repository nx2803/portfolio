import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="intro" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center flex flex-col items-center"
      >
        <span className="text-xs md:text-sm font-medium tracking-[0.4em] text-gray-500 mb-6 uppercase">
          The Web Masterpiece
        </span>
        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white mb-6 leading-none">
          TRILOGY
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 max-w-2xl font-light font-peecemaker">
          세 가지 서로 다른 철학과 디자인, 하나의 완성된 생태계.
        </p>
      </motion.div>
      
      {/* Background Effects (투명하게 유지) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-0" />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
