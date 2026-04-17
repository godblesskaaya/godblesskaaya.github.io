import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const workExperience = [
  {
    role: 'Technical Consultant & Machine Operator',
    company: 'Splash Media Limited',
    period: 'Oct 2022 – Present',
    bullets: [
      'Manage computerised embroidery, screen printing, and large-format digital print systems in a live production environment',
      'Diagnose and resolve technical faults; reduced equipment downtime and improved throughput',
      'Advise clients on print specifications and feasibility, translating constraints into business decisions',
    ],
  },
  {
    role: 'Community Service Teacher',
    company: 'Akeri Secondary School',
    period: 'Oct 2022 – Jun 2023',
    bullets: [
      'Taught Chemistry and Physics to ~400 students',
      'Designed lesson plans and measurably improved student performance',
    ],
  },
]

const internships = [
  {
    role: 'Network Operations Intern',
    company: 'Habari Node PLC (ISP)',
    period: 'Jul – Sep 2025',
    bullets: [
      'Configured Mikrotik routers and sector antennas via Winbox: IP addressing, NAT, DHCP, firewall rules for guest and internal segments',
      'Performed on-site CPE installations — premises survey, LHG radio alignment, RJ45 termination, end-to-end connectivity verification',
      'Resolved wireless interference via spectrum scans and channel reconfiguration; supported PTP/PTMP backhaul realignment using real-time dBm monitoring',
    ],
  },
  {
    role: 'IT Support Intern',
    company: 'UTT Asset Management and Investor Services',
    period: 'Jul – Oct 2024',
    bullets: [
      'Deployed workstations end-to-end: BIOS, Windows 10 install, domain integration, static IP assignment, software rollout',
      'Maintained network printers and routers; resolved IP conflicts; administered Ubuntu Server VMs via SSH',
      'Built an investment calculator modelling compound growth for lump-sum and periodic contribution scenarios',
    ],
  },
]

function ExperienceCard({ entry, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12 }}
      className="group border border-[#002654]/80 rounded-2xl p-7 hover:border-[#fed136]/30 bg-[#0d1b3e]/30 hover:bg-[#0d1b3e]/60 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-white font-black text-lg group-hover:text-[#fed136] transition-colors duration-300">
            {entry.role}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">{entry.company}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#002654]/60 border border-[#002654] text-[#fed136] text-xs font-semibold tracking-wide shrink-0 self-start">
          {entry.period}
        </span>
      </div>
      <ul className="space-y-2.5">
        {entry.bullets.map((b, j) => (
          <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
            <span className="text-[#fed136] mt-0.5 shrink-0">▸</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

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
          className="text-4xl sm:text-5xl font-black mb-14 tracking-tight"
        >
          Experience
        </motion.h2>

        <div className="space-y-14">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-[#002654]" />
              Work Experience
              <span className="h-px flex-1 bg-[#002654]" />
            </motion.h3>
            <div className="space-y-5">
              {workExperience.map((entry, i) => (
                <ExperienceCard key={i} entry={entry} index={i} inView={inView} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-[#002654]" />
              Practical Training · UDSM
              <span className="h-px flex-1 bg-[#002654]" />
            </motion.h3>
            <div className="space-y-5">
              {internships.map((entry, i) => (
                <ExperienceCard key={i} entry={entry} index={i + workExperience.length} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
