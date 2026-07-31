import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/**
 * Foto da galeria com três camadas de movimento:
 *  1. entrada: revela por "cortina" (clip-path) ao surgir;
 *  2. scroll: a imagem DESLIZA dentro da moldura (parallax) — a moldura fica
 *     firme na grade, só a foto se move, então nada fica "sem nexo";
 *  3. hover: holofote — as outras escurecem/P&B, a mirada acende e dá zoom.
 * `useScroll` mira a moldura (não transformada), evitando feedback de layout.
 */
function GalleryItem({
  src,
  className = '',
  delay = 0,
  range = 34,
}: {
  src: string
  className?: string
  delay?: number
  range?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -10% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  return (
    <div ref={ref} className={`group relative overflow-hidden rounded-xl border border-white/10 ${className}`}>
      {/* Camada de parallax — bem maior que a moldura (folga de 20% em cima e
          embaixo) pra o deslize nunca abrir vão nas bordas */}
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[20%] h-[140%]">
        {/* Camada da cortina de entrada */}
        <motion.div
          className="h-full w-full"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1, delay, ease: [0.65, 0, 0.35, 1] }}
        >
          <img
            src={src}
            alt="Paulo Pires"
            loading="lazy"
            className="h-full w-full object-cover transition-[transform,filter,opacity] duration-[600ms] ease-out
                       group-hover/gallery:opacity-40 group-hover/gallery:grayscale
                       group-hover:!opacity-100 group-hover:!grayscale-0 group-hover:scale-[1.05]"
          />
        </motion.div>
      </motion.div>

      <span className="pointer-events-none absolute bottom-3 left-3 z-10 translate-y-2 font-heading text-[10px] font-semibold uppercase tracking-widest2 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        Paulo Pires
      </span>
    </div>
  )
}

/**
 * Galeria curada — grade editorial coerente (estilo Porto), com parallax da
 * imagem dentro da moldura ao rolar, revelação de entrada e holofote no hover.
 */
export default function ParallaxFeed() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-pp">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.01em] text-cream">
            O artista
          </h2>
          <span className="pb-2 font-heading text-xs font-medium uppercase tracking-widest2 text-white/40">
            Ensaio 2026 — Goiânia
          </span>
        </div>

        <div className="group/gallery grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          <GalleryItem src="/images/feed-1.webp" range={46} className="aspect-[3/4] lg:col-span-5 lg:row-span-2 lg:aspect-auto" />
          <GalleryItem src="/images/feed-4.webp" delay={0.05} range={-30} className="aspect-[3/4] lg:col-span-4 lg:aspect-[4/5]" />
          <GalleryItem src="/images/feed-2.webp" delay={0.1} range={40} className="aspect-[4/5] lg:col-span-3 lg:aspect-[3/4]" />
          <GalleryItem src="/images/feed-5.webp" delay={0.05} range={-38} className="aspect-[4/3] lg:col-span-4 lg:aspect-[16/10]" />
          <GalleryItem src="/images/feed-3.webp" delay={0.1} range={32} className="aspect-[3/4] lg:col-span-3 lg:aspect-[3/4]" />
        </div>
      </div>
    </section>
  )
}
