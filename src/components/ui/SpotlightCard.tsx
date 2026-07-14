import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  size?: number
}

/**
 * Card premium com:
 *  - reveal de entrada ao rolar
 *  - brilho dourado que segue o cursor (spotlight)
 */
export default function SpotlightCard({
  children,
  className = '',
  delay = 0,
  size = 260,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ ['--spot' as string]: `${size}px` } as React.CSSProperties}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <span className="spotlight-glow pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
