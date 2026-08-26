import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050d1f] via-[#002654]/30 to-[#050d1f]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#002654]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#fed136]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-5rem)]">

          <div className="py-16 lg:py-0">
            <motion.p {...fadeUp(0.1)} className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-5">
              Hello, I'm
            </motion.p>

            <motion.h1 {...fadeUp(0.2)} className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 leading-[1.05] tracking-tight">
              Godbless
              <br />
              <span className="text-[#fed136]">Kaaya</span>
            </motion.h1>

            <motion.div {...fadeUp(0.32)}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#fed136]" />
                <p className="text-gray-400 text-base font-medium tracking-wide">
                  Final-Year CS @ UDSM · Full-Stack Developer
                </p>
              </div>
            </motion.div>

            <motion.p {...fadeUp(0.42)} className="text-gray-500 text-base leading-relaxed max-w-md mb-10">
              Cross-sector experience in financial services, ISP operations, and enterprise software.
              Building full-stack systems from Dar es Salaam, Tanzania.
            </motion.p>

            <motion.div {...fadeUp(0.52)} className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="px-7 py-3 bg-[#fed136] text-[#050d1f] font-bold rounded-lg hover:bg-[#e8c520] transition-colors text-sm"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3 border border-[#fed136]/50 text-[#fed136] font-bold rounded-lg hover:bg-[#fed136]/10 hover:border-[#fed136] transition-all text-sm"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end py-8 lg:py-0"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border border-dashed border-[#fed136]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border border-dotted border-[#002654]/60"
              />
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-[#fed136]/30 shadow-2xl shadow-[#002654]/40 relative z-10">
                <img
                  src="/assets/img/Godbless photo for web 200x200.jpg"
                  alt="Godbless Kaaya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#fed136] rounded-full flex items-center justify-center z-20 shadow-lg">
                <span className="text-[#050d1f] text-xl">✦</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] text-gray-600 tracking-[0.25em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#fed136]/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
