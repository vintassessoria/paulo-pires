import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animate, stagger } from 'animejs'
import { Play, Calendar } from 'lucide-react'
import InteractivePortrait from './ui/InteractivePortrait'
import Magnetic from './ui/Magnetic'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink, achievements } from '../data/site'

/**
 * Revela o texto letra a letra com stagger elástico (anime.js).
 * `letterClassName` vai em cada letra — usado para o degradê dourado, porque
 * `background-clip: text` no elemento externo não atravessa os spans com
 * overflow-hidden das letras (o texto sairia transparente/invisível).
 */
function LetterReveal({
  text,
  className,
  letterClassName = '',
  delay = 0,
}: {
  text: string
  className?: string
  letterClassName?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const letters = ref.current?.querySelectorAll('.al-letter')
    if (!letters || letters.length === 0) return
    const anim = animate(letters, {
      y: ['110%', '0%'],
      rotate: ['5deg', '0deg'],
      delay: stagger(45, { start: delay * 1000 }),
      duration: 1000,
      ease: 'outElastic(1, 0.9)',
    })
    return () => {
      anim.pause()
    }
  }, [delay])
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="inline-block w-[0.26em]" aria-hidden="true" />
        ) : (
          <span key={i} className="-mx-[0.04em] inline-block overflow-hidden px-[0.04em] align-bottom" aria-hidden="true">
            <span
              className={`al-letter inline-block will-change-transform ${letterClassName}`}
              style={{ transform: 'translateY(110%)' }}
            >
              {ch}
            </span>
          </span>
        ),
      )}
    </span>
  )
}

/** Ícones das redes. */
function SocialRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialItems.map(({ name, Icon, key }) => (
        <a
          key={key}
          href={socials[key]}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          className="text-white/50 transition-colors hover:text-cream"
        >
          <Icon style={{ width: '1.1rem', height: '1.1rem' }} />
        </a>
      ))}
    </div>
  )
}

/** Destaque rotativo "Em alta". */
function Trending({ index }: { index: number }) {
  const cur = achievements[index]
  return (
    <div className="text-center sm:text-left">
      <p className="font-heading text-[10px] uppercase tracking-widest2 text-white/40">Em alta</p>
      <div className="mt-0.5 flex h-8 items-center justify-center sm:justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-baseline gap-2"
          >
            <span className="font-display text-lg font-semibold text-gold-grad">{cur.value}</span>
            <span className="text-xs text-muted">{cur.sub}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Hero — identidade do mídia kit 2026 (preto + vermelho, nome em dourado).
 * Coluna de texto + retrato interativo (revela a 2ª foto seguindo o cursor).
 */
export default function Hero() {
  const [hi, setHi] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % achievements.length), 3600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-24 lg:py-0">
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* Brilhos e traço vermelhos ao fundo (identidade do mídia kit) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[16%] top-[6%] h-[72vh] w-[72vh] rounded-full bg-[radial-gradient(circle,rgba(229,16,46,0.30),transparent_62%)] blur-3xl" />
        <div className="absolute -right-[12%] bottom-[-6%] h-[62vh] w-[62vh] rounded-full bg-[radial-gradient(circle,rgba(229,16,46,0.18),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_58%,rgba(229,16,46,0.10)_60%,transparent_62%)]" />
      </div>

      <div className="container-pp grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Texto */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Cantor &amp; Compositor · Goiás</span>
          </motion.div>

          <div aria-hidden className="select-none">
            <LetterReveal
              text="PAULO"
              delay={0.25}
              letterClassName="wordmark-gold"
              className="block font-display text-[clamp(3.1rem,8.5vw,7rem)] font-semibold leading-[0.82] tracking-[-0.02em]"
            />
            <LetterReveal
              text="PIRES"
              delay={0.45}
              letterClassName="wordmark-gold"
              className="block font-display text-[clamp(3.1rem,8.5vw,7rem)] font-semibold italic leading-[0.82] tracking-[0.01em]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-white/80 text-shadow-warm lg:mx-0"
          >
            Compositor de mais de 80% do sertanejo nacional e voz de{' '}
            <span className="text-cream">“Ameaça”</span> — o hit 4x Diamante que passou de 650 milhões
            de streams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Magnetic strength={0.2}>
              <a href="#sucessos" className="btn-gold">
                <Play className="h-4 w-4 fill-current" />
                Ouça os sucessos
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost">
                <Calendar className="h-4 w-4" />
                Contratar show
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 lg:justify-start"
          >
            <SocialRow />
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <Trending index={hi} />
          </motion.div>
        </div>

        {/* Retrato interativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-[24rem] lg:order-2 lg:max-w-[30rem]"
        >
          <div className="group relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[1.8rem] bg-[radial-gradient(closest-side,rgba(229,16,46,0.25),transparent)] blur-2xl" />
            <InteractivePortrait
              base="/images/portrait-base.webp"
              reveal="/images/portrait-reveal.webp"
              className="reflect-below-lg aspect-[1040/1320] w-full rounded-[1.4rem] border border-gold/25 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
            />
            <span className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 font-heading text-[10px] uppercase tracking-widest2 text-white/70 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0 lg:block">
              passe o cursor
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
