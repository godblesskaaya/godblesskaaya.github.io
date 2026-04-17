import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'ERPNext SaaS Control Plane',
    desc: 'Full multi-tenant provisioning platform with tenant onboarding, lifecycle management, automated backups, and Stripe billing webhook integration.',
    bullets: [
      'REST API with JWT auth (refresh-token rotation), rate limiting, and async RQ workers',
      'Next.js admin dashboard for tenant management',
      'CI/CD: pre-commit secret scanning, 70%+ test coverage gate, Alembic migration checks, Docker build validation',
    ],
    tags: ['FastAPI', 'Next.js', 'Docker', 'PostgreSQL', 'Redis', 'GitHub Actions'],
    github: 'https://github.com/godblesskaaya/ERPnext-saas-control-plane',
    placeholder: false,
  },
  {
    title: 'Soko Mtandao',
    desc: 'Cross-platform e-commerce app for Tanzanian SMEs — single Dart codebase targeting Android, iOS, and Web.',
    bullets: [
      'Single codebase with Flutter targeting Android, iOS, and Web',
      'Supabase backend with PostgreSQL for data persistence',
    ],
    tags: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/godblesskaaya/soko_mtandao',
    placeholder: false,
  },
  {
    title: 'Investment Calculator',
    desc: 'Compound growth model for lump-sum and periodic contribution scenarios. Built during internship at UTT Asset Management.',
    bullets: [
      'Models compound interest for both lump-sum and recurring contributions',
    ],
    tags: ['Internship Project'],
    github: null,
    placeholder: true,
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

        <div className="grid lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
                project.placeholder
                  ? 'border-dashed border-[#002654] bg-[#0d1b3e]/30 hover:border-[#fed136]/20'
                  : 'border-[#002654]/80 bg-[#0d1b3e]/50 hover:border-[#fed136]/40 hover:bg-[#0d1b3e]/80'
              }`}
            >
              <h3 className={`font-black text-lg mb-2 transition-colors duration-300 group-hover:text-[#fed136] ${
                project.placeholder ? 'text-gray-500' : 'text-white'
              }`}>
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.desc}</p>

              {project.bullets.length > 0 && (
                <ul className="space-y-2 mb-5 flex-1">
                  {project.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-gray-500 text-xs leading-relaxed">
                      <span className="text-[#fed136]/60 mt-0.5 shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-[#002654]/60 border border-[#002654] text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#fed136] text-xs font-bold hover:underline mt-auto"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                  View on GitHub
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
