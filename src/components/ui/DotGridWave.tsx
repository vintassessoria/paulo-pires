import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

type Props = {
  cols?: number
  rows?: number
  className?: string
}

/**
 * Onda em grade de pontos — efeito-assinatura do anime.js:
 * um pulso parte do centro e se propaga pelos pontos (stagger em grade),
 * em loop infinito. Decorativo, leve e hipnótico.
 */
export default function DotGridWave({ cols = 26, rows = 8, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = ref.current?.querySelectorAll('.dgw-dot')
    if (!dots || dots.length === 0) return
    const anim = animate(dots, {
      scale: [1, 2.1, 1],
      opacity: [0.16, 0.65, 0.16],
      delay: stagger(65, { grid: [cols, rows], from: 'center' }),
      duration: 1400,
      loop: true,
      loopDelay: 700,
      ease: 'inOutSine',
    })
    return () => {
      anim.pause()
    }
  }, [cols, rows])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span
          key={i}
          className="dgw-dot m-auto h-1 w-1 rounded-full bg-warm-300"
          style={{ opacity: 0.16 }}
        />
      ))}
    </div>
  )
}
