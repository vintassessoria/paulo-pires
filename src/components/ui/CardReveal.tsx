import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Posição do cartão na grade — dá o efeito cascata (um após o outro). */
  index?: number
  className?: string
}

/**
 * Entrada 3D de cartão DIRIGIDA PELO SCROLL (não pelo mouse) — funciona igual
 * no celular. O cartão "levanta" do chão: sobe, gira em rotateX e cresce da
 * escala, em cascata pela coluna. Dispara quando entra na tela.
 */
export default function CardReveal({ children, index = 0, className = '' }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 90, rotateX: -42, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1000, transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  )
}
