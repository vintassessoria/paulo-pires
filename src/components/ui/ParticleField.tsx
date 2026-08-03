import { useEffect, useRef } from 'react'

type Variant = 'dark' | 'red' | 'light'

/** Cores das fagulhas por tipo de fundo (rgb). Light não usa partículas. */
const COLORS: Record<Variant, string[]> = {
  dark: ['229,16,46', '255,59,42', '245,51,12'],
  red: ['255,255,255', '255,225,215', '255,180,170'],
  light: [],
}

type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string }

/**
 * Fundo animado em canvas (estilo quintaldohungria.com): fagulhas de luz que
 * sobem/derivam devagar, com brilho suave. Pausa quando sai da tela e se
 * adapta ao tamanho. DPR limitado a 2 para não pesar no celular.
 */
export default function ParticleField({ variant = 'dark' }: { variant?: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const colors = COLORS[variant]
    if (colors.length === 0) return
    const canvas = ref.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let particles: P[] = []
    let raf = 0
    let running = true

    const make = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.4 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      a: Math.random() * 0.5 + 0.2,
      c: colors[(Math.random() * colors.length) | 0],
    })

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const count = Math.min(70, Math.round((w * h) / 15000))
      particles = Array.from({ length: count }, make)
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -12) {
          p.y = h + 12
          p.x = Math.random() * w
        }
        if (p.x < -12) p.x = w + 12
        else if (p.x > w + 12) p.x = -12
        const glow = p.r * 6
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow)
        g.addColorStop(0, `rgba(${p.c},${p.a})`)
        g.addColorStop(1, `rgba(${p.c},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      if (running) raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    // Pausa a animação quando a seção sai da tela (economiza bateria/CPU).
    const io = new IntersectionObserver(
      ([e]) => {
        const vis = e.isIntersecting
        if (vis && !running) {
          running = true
          raf = requestAnimationFrame(tick)
        } else if (!vis) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { rootMargin: '100px' },
    )
    io.observe(parent)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [variant])

  if (COLORS[variant].length === 0) return null
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
}
