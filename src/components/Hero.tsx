import { motion } from 'framer-motion'
import { Play, ArrowUpRight } from 'lucide-react'
import { socialItems } from './icons/BrandIcons'
import { socials, whatsappLink } from '../data/site'

/**
 * Hero no padrão de site de sertanejo (Murilo Huff / Gusttavo Lima):
 * foto em tela cheia com o nome e as chamadas por cima, sobre um degradê
 * escuro que garante a leitura. O resto do site é claro.
 */
export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <h1 className="sr-only">Paulo Pires — Cantor e Compositor</h1>

      {/* Foto de fundo + degradê */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-main.webp"
          alt="Paulo Pires"
          className="h-full w-full object-cover object-[60%_22%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="container-pp relative z-10 pb-16 pt-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="font-heading text-xs font-bold uppercase tracking-widest2 text-gold-light">
            Cantor &amp; Compositor — Goiás
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[0.88] tracking-[-0.01em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          Paulo Pires
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
        >
          O compositor que assina mais de 80% do sertanejo nacional — e a voz de{' '}
          <span className="font-semibold text-white">“Ameaça”</span>, o hit 4x Diamante com mais de
          650 milhões de streams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <a href="#sucessos" className="btn-gold">
            <Play className="h-4 w-4 fill-current" />
            Ouça os sucessos
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3 font-heading text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Contratar show
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center gap-5"
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
              <Icon style={{ width: '1.15rem', height: '1.15rem' }} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
