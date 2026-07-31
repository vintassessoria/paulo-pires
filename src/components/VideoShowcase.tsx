import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'

/**
 * Vitrine de vídeo — uma produção do Paulo Pires. A moldura "cresce" e revela
 * conforme a seção entra na tela (animação de scroll). O vídeo só é baixado
 * quando o visitante dá play (preload="none"), então não pesa no carregamento.
 * Toca com som; avisa os outros players do site (pp:audio) para pausarem.
 */
export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Cresce de 0,9 → 1 e revela por cortina conforme entra
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1])
  const inset = useTransform(scrollYProgress, [0, 0.35], [12, 0])
  const clip = useTransform(inset, (v) => `inset(${v}% 0% ${v}% 0% round 1rem)`)

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
      .then(() => {
        setPlaying(true)
        window.dispatchEvent(new CustomEvent('pp:audio', { detail: 'video' }))
      })
      .catch(() => {})
  }

  // Se outro player do site tocar, pausa o vídeo (e vice-versa via play())
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'video' && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
    window.addEventListener('pp:audio', onOther)
    return () => window.removeEventListener('pp:audio', onOther)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-pp">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">( Produção 2026 )</p>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.01em] text-cream">
              Paulo Pires <span className="text-gold">em cena</span>
            </h2>
          </div>
          <span className="hidden pb-2 font-heading text-xs font-medium uppercase tracking-widest2 text-white/40 sm:block">
            Assista
          </span>
        </div>

        <motion.div
          style={{ scale, clipPath: clip }}
          className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          <video
            ref={videoRef}
            poster="/videos/producao-poster.jpg"
            preload="none"
            playsInline
            controls={playing}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            className="h-full w-full object-cover"
          >
            <source src="/videos/producao.mp4" type="video/mp4" />
          </video>

          {/* Overlay de play (some ao tocar) */}
          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label="Assistir ao vídeo"
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-black/20 transition-colors hover:bg-black/25"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-black shadow-[0_16px_40px_-10px_rgba(255,90,31,0.7)] transition-transform duration-300 group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-[2px] fill-current" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
