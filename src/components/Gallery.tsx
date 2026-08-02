import { motion } from 'framer-motion'

/**
 * Fotos do Paulo em P&B. `pos` define o corte de cada uma: os retratos
 * verticais usam `object-top` (o rosto fica no alto), as paisagens usam
 * `object-center`. Assim nenhuma corta o rosto.
 */
const photos = [
  { src: '/images/feed-1.webp', pos: 'object-top' },
  { src: '/images/feed-2.webp', pos: 'object-center' },
  { src: '/images/feed-3.webp', pos: 'object-top' },
  { src: '/images/hero-main.webp', pos: 'object-top' },
  { src: '/images/feed-4.webp', pos: 'object-top' },
  { src: '/images/feed-5.webp', pos: 'object-center' },
  { src: '/images/feed-6.webp', pos: 'object-top' },
  { src: '/images/paulo-bio.jpg', pos: 'object-top' },
]

type Photo = (typeof photos)[number]
type RowProps = { items: Photo[]; reverse?: boolean; duration?: number }

/** Uma fileira que desliza sozinha para o lado (loop infinito). Pausa no hover. */
function MarqueeRow({ items, reverse = false, duration = 46 }: RowProps) {
  const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0" aria-hidden={hidden}>
      {items.map((p, i) => (
        <div
          key={i}
          className="group/ph relative mx-1.5 aspect-[3/2] h-36 shrink-0 overflow-hidden rounded-xl sm:h-48"
        >
          <img
            src={p.src}
            alt="Paulo Pires"
            loading="lazy"
            className={`h-full w-full object-cover ${p.pos} grayscale transition-all duration-500 ease-out will-change-transform group-hover/ph:scale-110 group-hover/ph:grayscale-0`}
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
    <section id="fotos" className="relative isolate overflow-hidden bg-black py-14 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-3"
      >
        <MarqueeRow items={photos} duration={46} />
        <MarqueeRow items={[...photos].reverse()} reverse duration={54} />
      </motion.div>
    </section>
  )
}
