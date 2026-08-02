import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  id: string
  icon: LucideIcon
  title: string
  subtitle?: ReactNode
  /** Foto de fundo (fica bem escurecida, como textura, no padrão sertanejo). */
  bgImage?: string
  /** Posição do foco da foto de fundo (object-position). */
  bgPosition?: string
  children?: ReactNode
  className?: string
}

/**
 * Casca de seção no padrão dos sites de referência (Murilo Huff / Gusttavo
 * Lima): faixa full-bleed escura, foto de fundo bem escurecida, e cabeçalho
 * CENTRALIZADO — ícone num círculo vermelho, título grande e subtítulo.
 */
export default function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  bgImage,
  bgPosition = 'center',
  children,
  className = '',
}: Props) {
  return (
    <section id={id} className={`relative isolate overflow-hidden py-24 sm:py-32 ${className}`}>
      {/* Fundo */}
      <div className="absolute inset-0 -z-10">
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ objectPosition: bgPosition }}
          />
        )}
        {/* Escurecimento + leve tom vermelho da marca */}
        <div className="absolute inset-0 bg-coal/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal/70 to-coal" />
        <div className="absolute inset-x-0 top-0 mx-auto h-[420px] max-w-4xl bg-[radial-gradient(60%_100%_at_50%_0%,rgba(229,16,46,0.18),transparent_70%)]" />
      </div>

      <div className="container-pp text-center">
        {/* Ícone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light"
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-title"
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
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}
