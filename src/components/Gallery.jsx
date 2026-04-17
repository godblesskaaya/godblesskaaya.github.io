import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const photos = [
  { src: '/assets/img/2023-04-03579.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/Godbless photo (2).jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/photo_14_2024-03-29_13-06-18.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/IMG_0867.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/IMG_0872.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/img_1_1718540097046.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/1.jpg', alt: 'Godbless Kaaya' },
  { src: '/assets/img/Godbless photo for web 200x200.jpg', alt: 'Godbless Kaaya' },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="py-24 px-6 sm:px-8 bg-[#0a1628]/60">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#fed136] text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          A glimpse
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-black mb-16 tracking-tight"
        >
          Gallery
        </motion.h2>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group border border-[#002654]/60 hover:border-[#fed136]/40 transition-colors duration-300"
              onClick={() => setSelected(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#002654]/0 group-hover:bg-[#002654]/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl">⊕</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selected.src}
              alt={selected.alt}
              className="max-h-[90vh] max-w-full rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
