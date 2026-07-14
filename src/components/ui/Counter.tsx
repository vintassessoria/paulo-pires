import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  className?: string
  duration?: number
}

/**
 * Anima o primeiro número de `value` de 0 até o alvo quando entra na tela.
 * Usa getBoundingClientRect (confiável mesmo com transform 3D, ao contrário
 * do IntersectionObserver) + trava de segurança que garante o valor final.
 * Mantém prefixo/sufixo (ex.: "+650 milhões", "Top 200", "505 mil").
 */
export default function Counter({ value, className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const match = value.match(/[\d.,]+/)
  const target = match ? parseInt(match[0].replace(/[.,]/g, ''), 10) : 0
  const prefix = match ? value.slice(0, match.index) : ''
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : ''

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!match || !Number.isFinite(target) || target <= 0) return
    const el = ref.current
    if (!el) return

    let raf = 0
    let started = false

    const run = () => {
      if (started) return
      started = true
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      let start: number | null = null
      const tick = (now: number) => {
        if (start === null) start = now
        const p = Math.min(Math.max((now - start) / (duration * 1000), 0), 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) run()
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    // Trava de segurança: se em 6s nada disparou (layout incomum), mostra o alvo
    const failSafe = setTimeout(() => {
      if (!started) setCount(target)
    }, 6000)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failSafe)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [match, target, duration])

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
