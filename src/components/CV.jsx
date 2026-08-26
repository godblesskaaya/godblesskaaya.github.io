import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const highlights = [
  { label: 'Degree', value: 'BSc Computer Science · UDSM (Final Year)' },
  { label: 'Experience', value: '3+ years across ISP, fintech, and enterprise software' },
  { label: 'Projects', value: 'Multi-tenant SaaS platform · Cross-platform e-commerce app' },
  { label: 'Internships', value: 'Network Operations (ISP) · IT Support (Asset Management)' },
]

export default function CV() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const requestSubject = encodeURIComponent('CV Request — Godbless Kaaya')
  const requestBody = encodeURIComponent(
    'Hi Godbless,\n\nI came across your portfolio and would like to request a copy of your CV.\n\nBest regards,'
  )

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
          className="text-gray-500 mb-14 max-w-xl"
        >
          My full CV is available upon request. A summary of my background is below.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="space-y-4"
          >
            {highlights.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 p-5 rounded-xl border border-[#002654]/80 bg-[#0d1b3e]/30"
              >
                <div className="shrink-0 w-1 rounded-full bg-[#fed136]/60" />
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="bg-[#0d1b3e]/50 border border-[#002654]/80 rounded-2xl p-10 flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#002654]/60 border border-[#002654] flex items-center justify-center text-3xl">
              📄
            </div>

            <div>
              <h3 className="text-white font-bold text-xl mb-2">Available Upon Request</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Interested in working together? Send me a message and I'll get my full CV over to you promptly.
              </p>
            </div>

            <a
              href={`mailto:godblessgkaaya@gmail.com?subject=${requestSubject}&body=${requestBody}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#fed136] text-[#050d1f] font-bold rounded-xl hover:bg-[#e8c520] transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request CV
            </a>

            <p className="text-gray-600 text-xs">
              Or reach out via the{' '}
              <Link to="/contact" className="text-[#fed136]/70 hover:text-[#fed136] transition-colors underline underline-offset-2">
                contact section
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
