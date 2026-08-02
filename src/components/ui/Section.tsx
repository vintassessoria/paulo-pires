import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Bg = 'black' | 'dark' | 'red' | 'light'

type Props = {
  id: string
  icon: LucideIcon
  title: string
  subtitle?: ReactNode
  /** Cor de fundo da faixa (padrão das referências: preto / escuro / vermelho / claro). */
  bg?: Bg
  /** Foto de fundo (só nas faixas escuras; fica bem escurecida). */
  bgImage?: string
  bgPosition?: string
  /** Nome gigante e apagado atrás do conteúdo (marca d'água, como no Murilo Huff). */
  watermark?: string
  children?: ReactNode
  className?: string
}

const BG_CLASS: Record<Bg, string> = {
  black: 'bg-black',
  dark: 'bg-[#141414]',
  red: 'bg-gold',
  light: 'bg-[#F4F1EC]',
}

/** Estilos por tipo de fundo: cor do título, do subtítulo, do ícone e da marca d'água. */
const STYLE: Record<
  Bg,
  { title: string; sub: string; iconWrap: string; wm: string }
> = {
  black: {
    title: 'text-gold-light',
    sub: 'text-cream/70',
    iconWrap: 'border-gold/40 bg-gold/10 text-gold-light',
    wm: 'text-white/[0.04]',
  },
  dark: {
    title: 'text-gold-light',
    sub: 'text-cream/70',
    iconWrap: 'border-gold/40 bg-gold/10 text-gold-light',
    wm: 'text-white/[0.04]',
  },
  red: {
    title: 'text-white',
    sub: 'text-white/85',
    iconWrap: 'border-white/50 bg-white/15 text-white',
    wm: 'text-black/[0.06]',
  },
  light: {
    title: 'text-ink',
    sub: 'text-ink/60',
    iconWrap: 'border-ink/15 bg-gold/10 text-gold',
    wm: 'text-black/[0.035]',
  },
}

/**
 * Casca de seção 100% inspirada no murilohuff.com.br: faixa full-bleed com
 * cor cheia (as seções alternam preto / vermelho / claro), nome do artista
 * como marca d'água gigante atrás, e cabeçalho CENTRALIZADO — ícone num
 * círculo, título grande (Caixa Alta e Baixa) e subtítulo.
 */
export default function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  bg = 'dark',
  bgImage,
  bgPosition = 'center',
  watermark,
  children,
  className = '',
}: Props) {
  const s = STYLE[bg]
  const dark = bg === 'black' || bg === 'dark'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-24 sm:py-28 ${BG_CLASS[bg]} ${className}`}
    >
      {/* Foto de fundo escurecida (só nas faixas escuras) */}
      {bgImage && dark && (
        <div className="absolute inset-0 -z-10">
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-40"
            style={{ objectPosition: bgPosition }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      {/* Marca d'água com o nome do artista */}
      {watermark && (
        <div className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center overflow-hidden">
          <span
            className={`whitespace-nowrap font-display text-[26vw] font-black uppercase leading-none tracking-tighter ${s.wm}`}
          >
            {watermark}
          </span>
        </div>
      )}

      <div className="container-pp text-center">
        {/* Ícone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border ${s.iconWrap}`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`section-title ${s.title}`}
        >
          {title}
        </motion.h2>

        {/* Subtítulo */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${s.sub}`}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}
