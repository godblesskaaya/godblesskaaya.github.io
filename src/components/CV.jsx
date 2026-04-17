import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CV() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cv" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          My resume
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-4 tracking-tight"
        >
          Curriculum Vitae
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-gray-500 mb-10 max-w-xl"
        >
          View or download my full CV below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="w-full rounded-2xl overflow-hidden border border-[#002654]/80 mb-6 bg-[#0d1b3e]/30"
            style={{ height: '75vh' }}
          >
            <object
              data="/sanekobeCv.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <p className="text-gray-400 mb-4">PDF preview not supported in your browser.</p>
                <a
                  href="/sanekobeCv.pdf"
                  download
                  className="px-5 py-2.5 bg-[#fed136] text-[#050d1f] font-bold rounded-lg hover:bg-[#e8c520] transition-colors text-sm"
                >
                  Download CV
                </a>
              </div>
            </object>
          </div>

          <a
            href="/sanekobeCv.pdf"
            download
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#fed136] text-[#050d1f] font-bold rounded-xl hover:bg-[#e8c520] transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
            </svg>
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  )
}
