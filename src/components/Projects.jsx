import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'Coming Soon',
    desc: 'Project details will be added here. Stay tuned.',
    tags: ['Design', 'Branding'],
  },
  {
    title: 'Coming Soon',
    desc: 'Project details will be added here. Stay tuned.',
    tags: ['Web Design', 'UI/UX'],
  },
  {
    title: 'Coming Soon',
    desc: 'Project details will be added here. Stay tuned.',
    tags: ['Motion', 'Illustration'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 bg-[#0a1628]/60">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          My work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Projects
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-[#0d1b3e]/50 border border-dashed border-[#002654] rounded-2xl p-6 hover:border-[#fed136]/30 transition-all duration-300 flex flex-col"
            >
              <div className="w-full aspect-video rounded-xl bg-[#002654]/20 flex items-center justify-center mb-5 border border-[#002654]/40 group-hover:border-[#fed136]/20 transition-colors">
                <span className="text-gray-700 text-sm font-medium">Coming Soon</span>
              </div>

              <h3 className="text-gray-500 font-bold text-base mb-2 group-hover:text-[#fed136] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{project.desc}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 border border-[#002654] text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
