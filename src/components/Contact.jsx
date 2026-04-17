import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'godblessgkaaya@gmail.com',
    href: 'mailto:godblessgkaaya@gmail.com',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+255 686 475 414',
    href: 'tel:+255686475414',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Dar es Salaam, Tanzania',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 bg-[#0a1628]/60">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Contact
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Have a project in mind or just want to say hello? I'm always open to new opportunities,
              collaborations, and interesting conversations.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#002654]/60 border border-[#002654] flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-200 hover:text-[#fed136] transition-colors text-sm font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-200 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0d1b3e]/70 border border-[#002654]/80 rounded-2xl overflow-hidden"
          >
            {/* Replace this src with your Google Form embed URL */}
            <div className="w-full flex flex-col items-center justify-center text-center p-12 gap-5" style={{ minHeight: 420 }}>
              <div className="w-16 h-16 rounded-2xl bg-[#002654]/60 border border-[#002654] flex items-center justify-center text-3xl">
                ✉️
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Send a Message</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Replace this placeholder with your Google Form embed URL to enable direct messaging.
                </p>
              </div>
              <a
                href="mailto:godblessgkaaya@gmail.com"
                className="px-6 py-3 bg-[#fed136] text-[#050d1f] font-bold rounded-xl hover:bg-[#e8c520] transition-colors text-sm"
              >
                Email Me Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
