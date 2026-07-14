import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Intensidade máxima da inclinação (graus). */
  max?: number
}

/**
 * Cartão premium com profundidade 3D real:
 *  - inclina seguindo o cursor (perspectiva)
 *  - reflexo de luz (glare) que acompanha o mouse
 *  - reveal de entrada ao rolar
 * Conteúdo com a classe `.depth` salta para frente em 3D.
 */
export default function Card3D({ children, className = '', delay = 0, max = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 160, damping: 18 })

  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 65%)`

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group/c3d relative ${className}`}
    >
      <div className="relative z-10 h-full [transform-style:preserve-3d]">{children}</div>
      <motion.span
        aria-hidden
        style={{ backgroundImage: glare }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/c3d:opacity-100"
      />
    </motion.div>
  )
}
