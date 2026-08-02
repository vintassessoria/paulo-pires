import { Camera } from 'lucide-react'
import { motion } from 'framer-motion'

/** Fotos do Paulo em P&B. */
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

type RowProps = { items: string[]; reverse?: boolean; duration?: number }

/** Uma fileira que desliza sozinha para o lado (loop infinito). Pausa no hover. */
function MarqueeRow({ items, reverse = false, duration = 42 }: RowProps) {
  const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0" aria-hidden={hidden}>
      {items.map((src, i) => (
        <div
          key={i}
          className="group/ph relative mx-1.5 aspect-[3/2] h-36 shrink-0 overflow-hidden rounded-xl sm:h-48"
        >
          <img
            src={src}
            alt="Paulo Pires"
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 ease-out will-change-transform group-hover/ph:scale-110 group-hover/ph:grayscale-0"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <Group />
        <Group hidden />
      </div>
    </div>
  )
}

/** Galeria — carrossel infinito de fotos em P&B, duas fileiras em direções opostas. */
export default function Gallery() {
  return (
    <section id="fotos" className="relative isolate overflow-hidden bg-black py-20 sm:py-24">
      {/* Cabeçalho centralizado */}
      <div className="container-pp text-center">
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

      {/* Carrossel — duas fileiras deslizando em direções opostas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 space-y-3"
      >
        <MarqueeRow items={photos} duration={46} />
        <MarqueeRow items={[...photos].reverse()} reverse duration={54} />
      </motion.div>
    </section>
  )
}
