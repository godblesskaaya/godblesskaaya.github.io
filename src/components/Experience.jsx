import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    role: 'Embroidery Machine File Designer',
    period: '2021 – Present',
    type: 'Freelance',
    bullets: [
      'Create graphics files for fabric stitching and machine embroidery',
      'Design and prepare logos for customers',
    ],
  },
  {
    role: 'Web Designer',
    period: '2019 – 2021',
    type: 'Freelance',
    bullets: [
      'Designed graphics for online and offline layouts',
      'Edited editorial photos for clients, magazines, and social media',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          Work history
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Experience
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="group relative border border-[#002654]/80 rounded-2xl p-8 hover:border-[#fed136]/30 bg-[#0d1b3e]/30 hover:bg-[#0d1b3e]/60 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-white font-black text-xl group-hover:text-[#fed136] transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="text-gray-500 text-sm">{exp.type}</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#002654]/60 border border-[#002654] text-[#fed136] text-xs font-semibold tracking-wide shrink-0">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="text-[#fed136] mt-0.5 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
