import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Foto da galeria: revela por "cortina" (clip-path na entrada) e responde ao
 * "holofote" — ao passar o mouse na galeria, as não-focadas escurecem e ficam
 * P&B; a focada fica em cor, mais brilhante e com leve zoom. `useInView`
 * observa o container estável (senão o observer via o elemento fora do quadro).
 */
function RevealImage({
  src,
  className = '',
  delay = 0,
}: {
  src: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -10% 0px' })
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border border-white/10 ${className}`}
    >
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
                     group-hover/gallery:scale-100 group-hover/gallery:opacity-40 group-hover/gallery:grayscale
                     group-hover:!opacity-100 group-hover:!grayscale-0 group-hover:scale-[1.05]"
        />
      </motion.div>
      {/* etiqueta que aparece na foto focada */}
      <span className="pointer-events-none absolute bottom-3 left-3 translate-y-2 font-heading text-[10px] font-semibold uppercase tracking-widest2 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        Paulo Pires
      </span>
    </div>
  )
}

/**
 * Galeria curada — grade editorial coerente (estilo Porto). Revelação por
 * cortina ao rolar + efeito "holofote" no hover (foca uma, esmaece as outras).
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

        {/* group/gallery habilita o "holofote": hover na grade esmaece todas,
            e cada foto se re-ilumina no próprio hover */}
        <div className="group/gallery grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          <RevealImage src="/images/feed-1.webp" className="aspect-[3/4] lg:col-span-5 lg:row-span-2 lg:aspect-auto" />
          <RevealImage src="/images/feed-4.webp" delay={0.05} className="aspect-[3/4] lg:col-span-4 lg:aspect-[4/5]" />
          <RevealImage src="/images/feed-2.webp" delay={0.1} className="aspect-[4/5] lg:col-span-3 lg:aspect-[3/4]" />
          <RevealImage src="/images/feed-5.webp" delay={0.05} className="aspect-[4/3] lg:col-span-4 lg:aspect-[16/10]" />
          <RevealImage src="/images/feed-3.webp" delay={0.1} className="aspect-[3/4] lg:col-span-3 lg:aspect-[3/4]" />
        </div>
      </div>
    </section>
  )
}
