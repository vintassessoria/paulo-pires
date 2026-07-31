import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { animate, stagger } from 'animejs'
import { Play, ArrowUpRight } from 'lucide-react'
import LiveStatus from './ui/LiveStatus'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink, achievements } from '../data/site'

/** Revela o texto letra a letra (anime.js). `letterClassName` vai em cada letra. */
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
      y: ['108%', '0%'],
      delay: stagger(40, { start: delay * 1000 }),
      duration: 950,
      ease: 'outExpo',
    })
    return () => {
      anim.pause()
    }
  }, [delay])
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="inline-block w-[0.2em]" aria-hidden="true" />
        ) : (
          <span key={i} className="-mx-[0.01em] inline-block overflow-hidden px-[0.01em] align-bottom" aria-hidden="true">
            <span className={`al-letter inline-block will-change-transform ${letterClassName}`} style={{ transform: 'translateY(108%)' }}>
              {ch}
            </span>
          </span>
        ),
      )}
    </span>
  )
}

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
          className="text-white/45 transition-colors hover:text-gold"
        >
          <Icon style={{ width: '1.15rem', height: '1.15rem' }} />
        </a>
      ))}
    </div>
  )
}

function Trending({ index }: { index: number }) {
  const cur = achievements[index]
  return (
    <div className="text-left">
      <p className="font-heading text-[10px] font-bold uppercase tracking-widest2 text-white/35">Em alta</p>
      <div className="mt-1 flex h-7 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-baseline gap-2"
          >
            <span className="font-display text-xl text-gold">{cur.value}</span>
            <span className="text-xs text-muted">{cur.sub}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Hero bold (modelo Bold Design Portfolio): nome PAULO PIRES em Anton, escala
 * de pôster, sobre preto. Coluna de texto + retrato interativo à direita.
 */
export default function Hero() {
  const [hi, setHi] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % achievements.length), 3600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-0">
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* Brasa ao fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[14%] top-[2%] h-[68vh] w-[68vh] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.22),transparent_62%)] blur-3xl" />
        <div className="absolute -right-[10%] bottom-[-8%] h-[56vh] w-[56vh] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_65%)] blur-3xl" />
      </div>

      <div className="container-pp grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Texto */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-5"
          >
            <LiveStatus className="mb-4" />
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="eyebrow">Cantor &amp; Compositor — Goiás</span>
            </div>
          </motion.div>

          <div aria-hidden className="select-none">
            <LetterReveal
              text="PAULO"
              delay={0.2}
              letterClassName="wordmark-gold"
              className="block font-display text-[clamp(3.6rem,11vw,10rem)] uppercase leading-[0.82] tracking-[0.005em]"
            />
            <LetterReveal
              text="PIRES"
              delay={0.42}
              letterClassName="wordmark-gold"
              className="block font-display text-[clamp(3.6rem,11vw,10rem)] uppercase leading-[0.82] tracking-[0.005em]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/75"
          >
            O compositor que assina mais de 80% do sertanejo nacional — e a voz de{' '}
            <span className="font-semibold text-cream">“Ameaça”</span>, o hit 4x Diamante com mais de
            650 milhões de streams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <a href="#sucessos" className="btn-gold">
              <Play className="h-4 w-4 fill-current" />
              Ouça os sucessos
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost">
              Contratar show
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-9 flex items-center gap-7"
          >
            <SocialRow />
            <span className="h-9 w-px bg-white/10" />
            <Trending index={hi} />
          </motion.div>
        </div>

        {/* Foto do hero — limpa e estática (estilo Porto), com revelação
            sutil de entrada por cortina; funde na base preta pelo gradiente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-[21rem] lg:order-2 lg:max-w-[27rem]"
        >
          <div className="relative overflow-hidden rounded-[1.1rem] border border-white/10">
            <motion.img
              src="/images/hero-main.webp"
              alt="Paulo Pires"
              initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="aspect-[1040/1320] w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
