import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  {
    name: 'Graphic Design',
    icon: '🎨',
    desc: 'Brand identity, print layouts, and visual communication systems.',
  },
  {
    name: 'Illustration',
    icon: '✏️',
    desc: 'Digital and traditional illustration for varied media and contexts.',
  },
  {
    name: 'Motion Graphics',
    icon: '🎬',
    desc: 'Animated visuals and motion design for digital platforms.',
  },
  {
    name: 'Web Design',
    icon: '🌐',
    desc: 'UI/UX design for web interfaces with a focus on usability.',
  },
  {
    name: 'Embroidery Design',
    icon: '🧵',
    desc: 'Machine embroidery file creation, logo adaptation, and fabric graphics.',
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 bg-[#0a1628]/60">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          What I do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Skills
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0d1b3e]/70 border border-[#002654]/80 rounded-2xl p-7 hover:border-[#fed136]/40 hover:bg-[#0d1b3e] transition-colors duration-300 group cursor-default"
            >
              <span className="text-3xl mb-5 block">{skill.icon}</span>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#fed136] transition-colors duration-300">
                {skill.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
