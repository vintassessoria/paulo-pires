import { useEffect, useRef } from 'react'

type Props = { className?: string; density?: number }

/**
 * Brasas/faíscas de palco subindo (canvas 2D, leve).
 * Inspirado nos fundos "Ember Glow / Solar Flare / Ethereal Smoke".
 * Usa um sprite pré-renderizado + composição aditiva para o brilho.
 * Desliga com prefers-reduced-motion.
 */
export default function EmberCanvas({ className = '', density = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement as HTMLElement
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0

    // Sprite de brilho (uma vez) para performance
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sctx = sprite.getContext('2d')!
    const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(245,214,170,0.9)')
    g.addColorStop(0.4, 'rgba(190,95,60,0.5)')
    g.addColorStop(1, 'rgba(190,95,60,0)')
    sctx.fillStyle = g
    sctx.fillRect(0, 0, 64, 64)

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number }
    let embers: P[] = []

    const resize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w / 16) * density))
      embers = Array.from({ length: count }, () => spawn(true))
    }

    const spawn = (initial = false): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 12,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.2 + Math.random() * 0.55),
      r: 0.8 + Math.random() * 2.2,
      life: initial ? Math.random() * 200 : 0,
      max: 200 + Math.random() * 280,
    })

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i]
        p.life++
        p.vy -= 0.0007 // acelera levemente para cima
        p.vx += Math.sin((p.y + i) * 0.01) * 0.0025 // balanço suave
        p.x += p.vx
        p.y += p.vy
        const t = p.life / p.max
        const alpha = Math.sin(Math.min(1, t) * Math.PI) * 0.5
        const size = p.r * 11
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size)
        if (p.life >= p.max || p.y < -24) embers[i] = spawn()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [density])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
