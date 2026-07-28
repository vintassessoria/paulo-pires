import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** Uma foto que sobe/desce em parallax conforme entra e sai da tela. */
function ParallaxItem({
  src,
  range = 60,
  className = '',
}: {
  src: string
  range?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y }}
        className="h-full w-full overflow-hidden rounded-2xl border border-white/10"
      >
        <img
          src={src}
          alt="Paulo Pires"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}

/**
 * Feed de fotos espalhadas com parallax — cada foto em uma velocidade, como no
 * modelo Bold Design Portfolio. Layout assimétrico no desktop; grade no mobile.
 */
export default function ParallaxFeed() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-pp">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[0.005em] text-cream">
            O artista
            <br />
            <span className="text-gold">no palco e na lente</span>
          </h2>
          <span className="hidden shrink-0 pb-2 font-heading text-xs font-bold uppercase tracking-widest2 text-white/35 sm:block">
            Ensaio 2026
          </span>
        </div>

        {/* Grade assimétrica com alturas variadas */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          <ParallaxItem src="/images/feed-1.webp" range={70} className="h-[46vw] sm:h-[30vw] lg:h-[26vw]" />
          <ParallaxItem src="/images/feed-2.webp" range={-50} className="mt-8 h-[46vw] sm:h-[30vw] lg:mt-12 lg:h-[26vw]" />
          <ParallaxItem src="/images/feed-3.webp" range={90} className="h-[46vw] sm:h-[30vw] lg:h-[26vw]" />
          <ParallaxItem src="/images/feed-4.webp" range={-70} className="mt-6 h-[46vw] sm:h-[30vw] lg:h-[26vw]" />
          <ParallaxItem src="/images/feed-5.webp" range={60} className="h-[46vw] sm:h-[30vw] lg:mt-16 lg:h-[26vw]" />
          <ParallaxItem src="/images/feed-6.webp" range={-90} className="mt-8 h-[46vw] sm:h-[30vw] lg:h-[26vw]" />
        </div>
      </div>
    </section>
  )
}
