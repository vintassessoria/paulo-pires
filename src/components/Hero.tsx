import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink } from '../data/site'

/**
 * Hero no padrão dos sites de referência (Murilo Huff / Gusttavo Lima):
 * foto em tela cheia, tudo CENTRALIZADO sobre um degradê escuro — eyebrow,
 * nome grande, chamada e os botões (agenda em primeiro lugar).
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Garante o `muted` no próprio elemento (requisito de autoplay) e força o
  // play — alguns navegadores ignoram o atributo `muted` renderizado pelo React.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-end justify-center overflow-hidden text-center"
    >
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* Vídeo de fundo (mudo, em loop) + foto como poster/fallback + degradês */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          poster="/images/hero-main.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/producao.mp4" type="video/mp4" />
        </video>
        {/* Escuro só embaixo (para o texto) e limpo no meio/topo (aparece o vídeo) */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-coal/50 to-transparent" />
      </div>

      <div className="container-pp flex flex-col items-center pb-14 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-xs font-bold uppercase tracking-widest2 text-gold-light sm:text-sm"
        >
          Cantor &amp; Compositor — Goiás
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-[clamp(2.8rem,9vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.01em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        >
          Paulo Pires
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
        >
          A voz de <span className="font-semibold text-white">“Ameaça”</span> — 4x Diamante, +650
          milhões de streams — e o compositor que assina mais de 80% do sertanejo nacional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="#agenda" className="btn-gold">
            Ver agenda
          </a>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-outline">
            Contato para shows
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center gap-6"
        >
          {socialItems.map(({ name, Icon, key }) => (
            <a
              key={key}
              href={socials[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="text-white/60 transition-colors hover:text-white"
            >
              <Icon style={{ width: '1.2rem', height: '1.2rem' }} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
