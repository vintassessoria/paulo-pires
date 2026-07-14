import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  className?: string
  duration?: number
}

/**
 * Anima o primeiro número de `value` de 0 até o alvo quando entra na tela.
 * Detecta a visibilidade por requestAnimationFrame + getBoundingClientRect —
 * funciona com qualquer tipo de rolagem (toque, nativa ou Lenis) e é imune a
 * transform 3D, ao contrário de scroll listeners / IntersectionObserver.
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
    // Nota: `match`/`target` derivam de `value`; usamos só primitivos estáveis
    // nas dependências para o efeito NÃO reiniciar a cada setCount (o que
    // zerava a contagem infinitamente).
    if (!Number.isFinite(target) || target <= 0) return
    const el = ref.current
    if (!el) return

    let animRaf = 0
    let pollRaf = 0
    let started = false

    const run = () => {
      if (started) return
      started = true
      let start: number | null = null
      const tick = (now: number) => {
        if (start === null) start = now
        const p = Math.min(Math.max((now - start) / (duration * 1000), 0), 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(target * eased))
        if (p < 1) animRaf = requestAnimationFrame(tick)
      }
      animRaf = requestAnimationFrame(tick)
    }

    // Loop de visibilidade (independe de eventos de scroll)
    const poll = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) {
        run()
        return
      }
      pollRaf = requestAnimationFrame(poll)
    }
    pollRaf = requestAnimationFrame(poll)

    // Trava de segurança: mostra o alvo caso algo impeça o loop
    const failSafe = setTimeout(() => {
      if (!started) setCount(target)
    }, 5000)

    return () => {
      cancelAnimationFrame(animRaf)
      cancelAnimationFrame(pollRaf)
      clearTimeout(failSafe)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

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
