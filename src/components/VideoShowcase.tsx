import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Vitrine de vídeo cinematográfica — a produção do Paulo Pires. A seção é alta
 * e o vídeo fica GRUDADO (sticky) e centralizado enquanto você rola por ela;
 * conforme desce, o vídeo CRESCE até quase preencher a tela.
 *
 * Começa sozinho: usa o atributo nativo `autoplay` (mudo) — confiável, ao
 * contrário do play() programático, que a política de autoplay bloqueia. O
 * vídeo só é BAIXADO quando a seção se aproxima (a `src` é definida por um
 * IntersectionObserver de disparo único), então não pesa no load da página.
 */
export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.58, 1])
  const radius = useTransform(scrollYProgress, [0, 0.55], [22, 8])
  const headOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0])

  // Garante mudo (necessário pro autoplay) e carrega a src só quando perto
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !v.src) {
          v.src = '/videos/producao.mp4' // dispara o load; o autoplay cuida do play
          io.disconnect()
        }
      },
      { rootMargin: '500px 0px 500px 0px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
    if (!next) {
      window.dispatchEvent(new CustomEvent('pp:audio', { detail: 'video' }))
      v.play().catch(() => {})
    }
  }

  // Se outro player tocar, volta a mutar o vídeo (não sobrepor áudio)
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'video' && videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true
        setMuted(true)
      }
    }
    window.addEventListener('pp:audio', onOther)
    return () => window.removeEventListener('pp:audio', onOther)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: headOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[12vh] z-10 text-center"
        >
          <p className="eyebrow mb-3">( Produção 2026 )</p>
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.01em] text-ink">
            Paulo Pires <span className="text-gold">em cena</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative aspect-video w-[92vw] max-w-[1500px] overflow-hidden border border-ink/10 bg-black shadow-[0_60px_140px_-40px_rgba(0,0,0,0.95)]"
        >
          <video
            ref={videoRef}
            poster="/videos/producao-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Ligar o som' : 'Desligar o som'}
            className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-ink backdrop-blur-sm transition-colors hover:bg-black/75"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
