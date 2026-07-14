import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ArtistImage from './ArtistImage'

export type CoverItem = {
  title: string
  subtitle: string
  cover?: string
}

type Props = {
  items: CoverItem[]
  active: number
  onActiveChange: (i: number) => void
}

/**
 * Coverflow 3D estilo Apple Music / visionOS.
 * Cartões em leque (o central elevado); o palco inteiro inclina
 * seguindo o cursor, reforçando a profundidade 3D real.
 */
export default function Coverflow({ items, active, onActiveChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const stageRotateX = useSpring(useTransform(my, [0, 1], [10, -6]), { stiffness: 120, damping: 18 })
  const stageRotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 120, damping: 18 })

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
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onActiveChange((active - 1 + items.length) % items.length)
        if (e.key === 'ArrowRight') onActiveChange((active + 1) % items.length)
      }}
      tabIndex={0}
      role="listbox"
      aria-label="Sucessos com a assinatura de Paulo Pires"
      className="relative mx-auto h-[300px] w-full max-w-3xl focus:outline-none sm:h-[360px]"
      style={{ perspective: '1300px' }}
    >
      <motion.div
        className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]"
        style={{ rotateX: stageRotateX, rotateY: stageRotateY }}
      >
        {items.map((item, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          const isCenter = offset === 0
          const visible = abs <= 3

          return (
            <motion.button
              key={item.title}
              type="button"
              aria-label={`${item.title} — ${item.subtitle}`}
              aria-selected={isCenter}
              tabIndex={visible ? 0 : -1}
              onClick={() => !isCenter && onActiveChange(i)}
              initial={false}
              animate={{
                x: offset * 128,
                rotateY: -offset * 22,
                scale: isCenter ? 1 : Math.max(0.72, 1 - abs * 0.12),
                z: isCenter ? 60 : -abs * 150,
                opacity: visible ? (isCenter ? 1 : Math.max(0.2, 1 - abs * 0.32)) : 0,
                filter: `blur(${isCenter ? 0 : abs * 1.1}px)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              style={{
                zIndex: 50 - abs,
                transformStyle: 'preserve-3d',
                pointerEvents: visible ? 'auto' : 'none',
                cursor: isCenter ? 'default' : 'pointer',
              }}
              className="absolute h-[244px] w-[188px] focus:outline-none sm:h-[300px] sm:w-[232px]"
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-xl border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${
                  isCenter ? 'border-white/20' : 'border-white/[0.06]'
                }`}
                style={{
                  WebkitBoxReflect:
                    'below 12px linear-gradient(transparent 68%, rgba(0,0,0,0.2))',
                }}
              >
                <ArtistImage
                  src={item.cover}
                  alt={`${item.title} — ${item.subtitle}`}
                  label={item.title}
                  compact
                  className="h-full w-full"
                />
                {!isCenter && <div className="absolute inset-0 bg-black/60" />}
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06]" />
              </div>

              {isCenter && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transform: 'translateZ(40px)' }}
                  className="glass-deep absolute -bottom-7 left-1/2 w-[94%] -translate-x-1/2 rounded-2xl px-4 py-3 text-center"
                >
                  <p className="truncate font-heading text-base font-semibold text-white">{item.title}</p>
                  <p className="truncate text-sm text-white/65">{item.subtitle}</p>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
