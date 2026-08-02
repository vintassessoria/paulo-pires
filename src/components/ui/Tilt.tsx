import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  /** Ângulo máximo da inclinação (graus). */
  max?: number
  /** Mostra o brilho que segue o cursor. */
  glare?: boolean
}

/**
 * Inclinação 3D com perspectiva que segue o mouse (estilo Framer). O cartão
 * gira em rotateX/rotateY conforme o cursor, com um brilho suave. Em telas de
 * toque (sem mouse) não faz nada — fica plano.
 */
export default function Tilt({ children, className = '', max = 9, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 17 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 17 })
  const glareBg = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(240px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18), transparent 55%)`,
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
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
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group/tilt relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ backgroundImage: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  )
}
