import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { animate, stagger } from 'animejs'
import { Play, Calendar } from 'lucide-react'
import EmberCanvas from './ui/EmberCanvas'
import ShaderBackdrop from './ui/ShaderBackdrop'
import Magnetic from './ui/Magnetic'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink, achievements } from '../data/site'

/** Revela o texto letra a letra com stagger elástico (anime.js). */
function LetterReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const letters = ref.current?.querySelectorAll('.al-letter')
    if (!letters || letters.length === 0) return
    const anim = animate(letters, {
      y: ['112%', '0%'],
      rotate: ['6deg', '0deg'],
      delay: stagger(45, { start: delay * 1000 }),
      duration: 1100,
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
          <span
            key={i}
            className="-mx-[0.05em] inline-block overflow-hidden px-[0.05em] align-bottom"
            aria-hidden="true"
          >
            <span
              className="al-letter inline-block will-change-transform"
              style={{ transform: 'translateY(112%)' }}
            >
              {ch}
            </span>
          </span>
        ),
      )}
    </span>
  )
}

/** Ícones das redes (reaproveitado nas duas versões). */
function SocialRow({ className = '', size = '1.1rem' }: { className?: string; size?: string }) {
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
          <Icon style={{ width: size, height: size }} />
        </a>
      ))}
    </div>
  )
}

/** Bloco "Em alta" rotativo. */
function Trending({ index, className = '' }: { index: number; className?: string }) {
  const cur = achievements[index]
  return (
    <div className={className}>
      <p className="font-heading text-[10px] uppercase tracking-widest2 text-white/40">Em alta</p>
      <div className="mt-0.5 flex h-8 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-baseline gap-2.5"
          >
            <span className="font-display text-lg font-semibold text-warm-100">{cur.value}</span>
            <span className="text-xs text-muted">{cur.sub}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pôster: nome gigante atrás, figura recortada por cima                */
/* ------------------------------------------------------------------ */
function HeroPoster({ hi }: { hi: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 18 })
  const py = useSpring(rawY, { stiffness: 60, damping: 18 })
  const nameX = useTransform(px, [-0.5, 0.5], [24, -24])
  const nameY = useTransform(py, [-0.5, 0.5], [10, -10])
  const figX = useTransform(px, [-0.5, 0.5], [-12, 12])
  const figY = useTransform(py, [-0.5, 0.5], [-6, 6])
  const haloX = useTransform(px, [-0.5, 0.5], [28, -28])

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="absolute inset-0">
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ShaderBackdrop className="h-full w-full opacity-50" />
      </div>
      <motion.div
        aria-hidden
        style={{ x: haloX }}
        className="pointer-events-none absolute left-1/2 top-[8%] z-0 h-[62vh] w-[62vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(178,74,62,0.30),rgba(120,48,40,0.12)_48%,transparent_70%)] blur-3xl"
      />
      <EmberCanvas className="pointer-events-none absolute inset-0 z-0" />

      {/* Redes verticais — só onde há margem lateral sobrando */}
      <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span className="h-14 w-px bg-white/15" />
        {socialItems.map(({ name, Icon, key }) => (
          <a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            className="text-white/40 transition-colors duration-200 hover:text-cream"
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </a>
        ))}
        <span className="h-14 w-px bg-white/15" />
      </div>

      {/* Selo + nome gigante numa linha (atrás) */}
      <div className="absolute inset-x-0 top-[13%] z-[1] sm:top-[15%]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gold/70 sm:w-12" />
          <span className="eyebrow">Cantor &amp; Compositor · Goiás</span>
          <span className="h-px w-8 bg-gold/70 sm:w-12" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ x: nameX, y: nameY }}
          className="select-none whitespace-nowrap text-center"
        >
          <LetterReveal
            text="PAULO"
            delay={0.3}
            className="inline-block font-display text-[clamp(3.4rem,12.5vw,11rem)] font-semibold leading-[0.85] tracking-[-0.02em] text-cream/95"
          />
          <span className="inline-block w-[0.22em]" aria-hidden="true" />
          <LetterReveal
            text="PIRES"
            delay={0.55}
            className="inline-block font-display text-[clamp(3.4rem,12.5vw,11rem)] font-semibold italic leading-[0.85] tracking-[0.015em] text-gold-grad"
          />
        </motion.div>
      </div>

      {/* Figura central por cima do nome */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-[2] flex h-[82vh] items-end justify-center sm:h-[80vh]"
      >
        <motion.div className="relative flex h-full items-end" style={{ x: figX, y: figY }}>
          <div
            className="relative flex h-full items-end"
            style={{
              // Centraliza pela cabeça (centroide medido em 55,7% do arquivo)
              transform: 'translateX(-5.7%)',
              maskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.45) 12%, black 30%)',
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.45) 12%, black 30%)',
            }}
          >
            <img
              src="/images/hero-cutout.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none h-full w-auto max-w-none object-contain object-bottom"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(168,66,60,0.12) 0%, transparent 38%, rgba(16,11,10,0.35) 70%, rgba(16,11,10,0.75) 100%)',
                WebkitMaskImage: 'url(/images/hero-cutout.webp)',
                maskImage: 'url(/images/hero-cutout.webp)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'bottom center',
                maskPosition: 'bottom center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Escurecimento da base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[34vh] bg-gradient-to-t from-ink via-ink/55 to-transparent" />

      {/* Base: subtítulo + CTAs centrados */}
      <div className="absolute inset-x-0 bottom-0 z-[4] flex flex-col items-center px-5 pb-8 text-center sm:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="max-w-xl text-pretty text-sm leading-relaxed text-white/80 text-shadow-warm sm:text-base"
        >
          Une o sertanejo, o pop e o romantismo em canções que conectam o Brasil — e assina
          alguns dos maiores sucessos da música nacional.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.2}>
            <a href="#musicas" className="btn-gold">
              <Play className="h-4 w-4 fill-current" />
              Ouça agora
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost">
              <Calendar className="h-4 w-4" />
              Contratar show
            </a>
          </Magnetic>
        </motion.div>

        {/* Redes: no celular vêm para a base, já que a coluna lateral some */}
        <SocialRow className="mt-6 lg:hidden" />
      </div>

      {/* "Em alta" — canto inferior esquerdo, onde há espaço livre */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.35 }}
        className="absolute bottom-8 left-6 z-[5] hidden lg:left-20 lg:block"
      >
        <Trending index={hi} />
      </motion.div>
    </div>
  )
}

/**
 * Hero — o mesmo pôster no computador e no celular: nome gigante atrás,
 * figura recortada por cima. O enquadramento no celular sobe a figura para
 * 82vh e centraliza pela cabeça, não pela massa do corpo (ver comentários
 * na figura).
 */
export default function Hero() {
  const [hi, setHi] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % achievements.length), 3600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative isolate h-[100svh] min-h-[640px] overflow-hidden">
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>
      <HeroPoster hi={hi} />
    </section>
  )
}
