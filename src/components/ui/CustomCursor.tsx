import { useEffect, useRef } from 'react'

/**
 * Cursor personalizado (ponto + anel que segue com atraso e reage a
 * links/cartões). Inspirado no efeito "Cursor Follow".
 * Só ativa em dispositivos com ponteiro fino (desktop).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    }
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        'a, button, [data-cursor], input, textarea, [role="listbox"]',
      )
      ring.classList.toggle('cursor-active', !!t)
    }
    const hide = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const show = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
