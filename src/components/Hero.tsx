import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink } from '../data/site'

/**
 * Hero no padrão dos sites de referência (Murilo Huff / Gusttavo Lima):
 * foto em tela cheia, tudo CENTRALIZADO sobre um degradê escuro — eyebrow,
 * nome grande, chamada e os botões (agenda em primeiro lugar).
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden text-center"
    >
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* Foto de fundo + degradês */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-main.webp"
          alt="Paulo Pires"
          className="h-full w-full object-cover object-[60%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/70 via-coal/50 to-coal" />
        <div className="absolute inset-0 bg-coal/30" />
      </div>

      <div className="container-pp flex flex-col items-center pb-16 pt-24">
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
          className="mt-4 font-display text-[clamp(3.2rem,12vw,10rem)] font-black uppercase leading-[0.86] tracking-[-0.01em] text-white drop-shadow-[0_6px_40px_rgba(0,0,0,0.6)]"
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

      {/* Seta de rolagem */}
      <a
        href="#agenda"
        aria-label="Rolar para a agenda"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  )
}
