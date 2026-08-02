import { Camera } from 'lucide-react'
import { motion } from 'framer-motion'

/** Fotos do Paulo — mosaico preto e branco de ponta a ponta (padrão Murilo Huff). */
const photos = [
  '/images/feed-1.webp',
  '/images/feed-2.webp',
  '/images/feed-3.webp',
  '/images/hero-main.webp',
  '/images/feed-4.webp',
  '/images/feed-5.webp',
  '/images/feed-6.webp',
  '/images/paulo-bio.jpg',
]

export default function Gallery() {
  return (
    <section id="fotos" className="relative isolate overflow-hidden bg-black">
      {/* Cabeçalho centralizado */}
      <div className="container-pp py-20 text-center sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 600 }}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light"
        >
          <Camera className="h-6 w-6" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-title text-gold-light"
        >
          Fotos
        </motion.h2>
      </div>

      {/* Mosaico full-bleed em P&B */}
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {photos.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.18 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden"
          >
            <img
              src={src}
              alt="Paulo Pires"
              loading="lazy"
              className="aspect-square w-full object-cover grayscale transition-all duration-500 ease-out will-change-transform group-hover:scale-110 group-hover:grayscale-0"
            />
            <span className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
