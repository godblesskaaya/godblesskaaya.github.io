import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    name: 'Languages',
    icon: '⌨️',
    tags: ['Python', 'TypeScript', 'Java', 'JavaScript', 'Dart'],
  },
  {
    name: 'Frontend',
    icon: '🖥️',
    tags: ['React', 'Next.js', 'Flutter', 'HTML / CSS'],
  },
  {
    name: 'Backend / API',
    icon: '⚙️',
    tags: ['FastAPI', 'Spring Boot', 'REST', 'JWT Auth', 'RQ Workers'],
  },
  {
    name: 'Databases',
    icon: '🗄️',
    tags: ['PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    name: 'DevOps / Cloud',
    icon: '☁️',
    tags: ['Docker', 'GitHub Actions', 'AWS (EC2 · S3 · RDS)', 'Linux'],
  },
  {
    name: 'Networking',
    icon: '🌐',
    tags: ['TCP/IP', 'NAT', 'DHCP', 'PTP / PTMP', 'Security'],
  },
  {
    name: 'IT Audit & Controls',
    icon: '🔍',
    tags: ['IT General Controls', 'Application Controls', 'Risk Assessment'],
  },
  {
    name: 'Tools',
    icon: '🛠️',
    tags: ['Git', 'ERP Systems', 'Postman', 'Figma', 'VS Code'],
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
          What I work with
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Skills
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0d1b3e]/70 border border-[#002654]/80 rounded-2xl p-6 hover:border-[#fed136]/30 hover:bg-[#0d1b3e] transition-colors duration-300 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-white font-bold text-sm group-hover:text-[#fed136] transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#002654]/60 border border-[#002654] text-gray-400"
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
