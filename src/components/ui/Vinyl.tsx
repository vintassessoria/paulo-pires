import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  className?: string
  size?: number
}

/**
 * Disco de vinil 3D girando lentamente, com inclinação que segue o cursor.
 * Peça decorativa "assinatura" da seção de músicas.
 */
export default function Vinyl({ className = '', size = 440 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [16, -16]), { stiffness: 120, damping: 16 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-16, 16]), { stiffness: 120, damping: 16 })

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
      style={{ rotateX, rotateY, transformPerspective: 1000, width: size, height: size }}
      className={`relative ${className}`}
      aria-hidden
    >
      {/* halo */}
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(180,174,165,0.14),transparent_62%)] blur-2xl" />

      {/* disco girando */}
      <div
        className="animate-spin rounded-full"
        style={{
          width: '100%',
          height: '100%',
          animationDuration: '18s',
          background:
            'repeating-radial-gradient(circle at center, #0c0b0a 0px, #0c0b0a 1px, #171513 2px, #171513 3px), radial-gradient(circle at center, #1a1714 0%, #080807 70%)',
          boxShadow:
            'inset 0 0 60px rgba(0,0,0,0.9), 0 40px 90px -30px rgba(0,0,0,0.9)',
        }}
      >
        {/* brilho diagonal */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,0.10) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)',
          }}
        />
        {/* etiqueta central */}
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/30 bg-gold-grad">
          <span className="font-display text-3xl tracking-wide text-ink">PP</span>
          {/* furo central */}
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-1 ring-black/40" />
        </div>
      </div>
    </motion.div>
  )
}
