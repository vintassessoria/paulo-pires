import { useRef, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedGradient from './AnimatedGradient'

type Bg = 'black' | 'dark' | 'red' | 'light'

type Props = {
  id: string
  icon: LucideIcon
  title: string
  subtitle?: ReactNode
  /** Cor de fundo da faixa (padrão das referências: preto / escuro / vermelho / claro). */
  bg?: Bg
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
  watermark,
  children,
  className = '',
}: Props) {
  const s = STYLE[bg]
  const dark = bg === 'black' || bg === 'dark'
  // Cor para fundir as bordas com as seções vizinhas (evita o "corte" seco).
  const fadeFrom = bg === 'black' ? 'from-black' : 'from-[#141414]'
  const gradVariant = bg === 'light' ? 'light' : bg === 'red' ? 'red' : 'dark'

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Parallax: a marca d'água desliza contra o scroll (sensação de profundidade).
  const wmY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative isolate overflow-hidden py-24 sm:py-28 ${BG_CLASS[bg]} ${className}`}
    >
      {/* Fundo de gradiente animado (manchas de luz que derivam devagar) */}
      <AnimatedGradient variant={gradVariant} />

      {/* Marca d'água com o nome do artista (parallax) */}
      {watermark && (
        <motion.div
          style={{ y: wmY }}
          className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center overflow-hidden"
        >
          <span
            className={`whitespace-nowrap font-display text-[26vw] font-black uppercase leading-none tracking-tighter ${s.wm}`}
          >
            {watermark}
          </span>
        </motion.div>
      )}

      {/* Bordas fundidas com a cor da seção — dá continuidade entre as faixas escuras */}
      {dark && (
        <>
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${fadeFrom} to-transparent`} />
          <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${fadeFrom} to-transparent`} />
        </>
      )}

      <div className="container-pp text-center">
        {/* Ícone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 600 }}
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
