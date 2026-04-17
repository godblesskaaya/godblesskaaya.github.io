import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    year: '2009 – 2015',
    title: 'Primary School',
    place: 'St. Jude School, Arusha',
    desc: 'Foundation years in Arusha, Tanzania.',
  },
  {
    year: '2016 – 2022',
    title: 'Secondary School',
    place: 'Jude Secondary School',
    desc: 'O-level & A-level — Physics, Chemistry, Advanced Mathematics.',
  },
  {
    year: '2022 – 2023',
    title: 'National Service & Teaching',
    place: 'Tanzania',
    desc: 'Completed national service and taught physics & chemistry.',
  },
  {
    year: '2023 – 2026',
    title: 'BSc Computer Science',
    place: 'University of Dar es Salaam',
    desc: 'Pursuing my degree with a focus on fintech, blockchain, and web development.',
    current: true,
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          Get to know me
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          About Me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              I'm a Graphic Designer and Computer Science student based in Dar es Salaam, Tanzania.
              With a background spanning illustration, motion graphics, embroidery design, and web design,
              I bring both artistic vision and technical thinking to every project.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              I'm currently in my second year at the University of Dar es Salaam, deeply interested in fintech,
              blockchain technology, and the intersection of design and code.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Location', value: 'Dar es Salaam, Tanzania' },
                { icon: '📧', label: 'Email', value: 'godblessgkaaya@gmail.com', href: 'mailto:godblessgkaaya@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+255 686 475 414', href: 'tel:+255686475414' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-lg w-6 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-gray-300 hover:text-[#fed136] transition-colors text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative pl-6">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#fed136]/60 via-[#002654] to-transparent" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                    item.current
                      ? 'bg-[#fed136] border-[#fed136] shadow-[0_0_8px_#fed136]'
                      : 'bg-[#050d1f] border-[#002654]'
                  }`}
                />
                <span className="text-[#fed136] text-xs font-bold tracking-widest uppercase">{item.year}</span>
                <h3 className="text-white font-bold text-base mt-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.place}</p>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
