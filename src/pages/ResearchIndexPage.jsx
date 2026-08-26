import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const research = [
  {
    title: 'What Workers Actually Earn — And Why the Average Lies',
    summary: 'A percentile-led reading of Tanzania’s formal labour market, with a comparison to the United States.',
    topic: 'Labour economics',
    year: '2024',
    to: '/research/labour-market',
  },
]

export default function ResearchIndexPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Notes & analysis
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }} className="text-5xl sm:text-6xl font-black tracking-tight">
          Research
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="mt-6 max-w-2xl text-gray-400 leading-relaxed">
          Independent research on work, technology, and the systems that shape economic opportunity.
        </motion.p>

        <div className="mt-16 border-t border-[#002654]">
          {research.map((item, index) => (
            <motion.article key={item.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 + index * 0.08 }} className="group grid gap-5 py-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 border-b border-[#002654]">
              <div className="font-mono text-xs tracking-[0.16em] uppercase text-[#fed136]">
                <p>{item.topic}</p>
                <p className="mt-2 text-gray-600">{item.year}</p>
              </div>
              <div>
                <Link to={item.to} className="inline-block text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#fed136] transition-colors">
                  {item.title}
                </Link>
                <p className="mt-4 max-w-3xl text-gray-400 leading-relaxed">{item.summary}</p>
                <Link to={item.to} className="inline-flex mt-5 text-sm font-bold text-[#fed136] hover:underline underline-offset-4">
                  Read research →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
