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

/**
 * Hero com vídeo de fundo em tela cheia. O assunto do vídeo fica à direita
 * (medido), então o texto vai à esquerda sobre um escurecimento que garante
 * leitura e deixa a imagem do vídeo aparecer do outro lado.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hi, setHi] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % achievements.length), 3600)
    return () => clearInterval(id)
  }, [])

  // Garante o autoplay: tenta na montagem e, como rede de segurança,
  // no primeiro gesto do usuário (caso algum navegador seja rígido).
  useEffect(() => {
    const tryPlay = () => videoRef.current?.play().catch(() => {})
    tryPlay()
    const onGesture = () => {
      tryPlay()
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('scroll', onGesture)
    }
    window.addEventListener('pointerdown', onGesture, { once: true })
    window.addEventListener('scroll', onGesture, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('scroll', onGesture)
    }
  }, [])

  // Parallax sutil do texto
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 18 })
  const py = useSpring(rawY, { stiffness: 60, damping: 18 })
  const textX = useTransform(px, [-0.5, 0.5], [-10, 10])
  const textY = useTransform(py, [-0.5, 0.5], [-6, 6])

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

  const cur = achievements[hi]

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate h-[100svh] min-h-[620px] overflow-hidden"
    >
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* ---- Vídeo de fundo ---- */}
      <div className="absolute inset-0 -z-10 bg-ink">
        <video
          ref={videoRef}
          // No mobile enquadra o Paulo (centro-direita do vídeo); no desktop
          // centraliza e aplica o zoom que remove a marca d'água.
          className="video-zoom-lg h-full w-full object-cover object-[60%_35%] lg:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Escurecimento: forte à esquerda (texto) e na base, revela o
            assunto à direita. + tinta quente vinho e vinheta. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30 lg:via-ink/60 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: 'linear-gradient(120deg, rgba(120,48,40,0.5), transparent 55%)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_50%,rgba(10,6,5,0.55)_100%)]" />
      </div>

      {/* Redes verticais (desktop) */}
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

      {/* ---- Conteúdo à esquerda ---- */}
      <div className="relative z-10 flex h-full items-end pb-12 sm:items-center sm:pb-0">
        <motion.div
          style={{ x: textX, y: textY }}
          className="w-full max-w-lg pl-5 pr-5 sm:pl-10 lg:max-w-[30rem] lg:pl-20 xl:pl-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Cantor &amp; Compositor · Goiás</span>
          </motion.div>

          <div aria-hidden className="select-none">
            <LetterReveal
              text="PAULO"
              delay={0.3}
              className="block font-display text-[clamp(3.4rem,10vw,7.2rem)] font-semibold leading-[0.85] tracking-[-0.02em] text-cream drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            />
            <LetterReveal
              text="PIRES"
              delay={0.5}
              className="block font-display text-[clamp(3.4rem,10vw,7.2rem)] font-semibold italic leading-[0.85] tracking-[0.015em] text-gold-grad drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-white/80 text-shadow-warm sm:text-base"
          >
            Une o sertanejo, o pop e o romantismo em canções que conectam o Brasil — e assina
            alguns dos maiores sucessos da música nacional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
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

          {/* Em alta (rotativo) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-9 border-t border-white/10 pt-4"
          >
            <p className="font-heading text-[10px] uppercase tracking-widest2 text-white/40">Em alta</p>
            <div className="mt-0.5 flex h-8 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hi}
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
          </motion.div>

          {/* Redes (mobile) */}
          <div className="mt-6 flex items-center gap-5 lg:hidden">
            {socialItems.map(({ name, Icon, key }) => (
              <a
                key={key}
                href={socials[key]}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="text-white/50 transition-colors hover:text-cream"
              >
                <Icon className="h-[1.1rem] w-[1.1rem]" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
