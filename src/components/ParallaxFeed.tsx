import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Imagem que revela por "cortina" (clip-path) + leve zoom ao entrar na tela,
 * com zoom sutil no hover. `useInView` observa o container estável.
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
    <div ref={ref} className={`group relative overflow-hidden rounded-xl border border-white/10 ${className}`}>
      <motion.img
        src={src}
        alt="Paulo Pires"
        loading="lazy"
        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)', scale: 1 } : {}}
        transition={{ duration: 1, delay, ease: [0.65, 0, 0.35, 1] }}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
    </div>
  )
}

/**
 * Galeria curada — grade editorial coerente (estilo Porto), com revelação por
 * cortina ao rolar e zoom sutil no hover. Sem parallax espalhado: cada foto
 * tem lugar e proporção definidos.
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

        {/* Grade editorial: uma peça alta à esquerda + duas empilhadas + faixa larga */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
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
