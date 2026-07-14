import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  /** Deslocamento em px ao longo da rolagem (positivo = mais lento). */
  amount?: number
}

/**
 * Parallax vertical ligado à rolagem. Elementos se movem em ritmos
 * diferentes, criando profundidade. Desativa com prefers-reduced-motion.
 */
export default function Parallax({ children, className = '', amount = 80 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
