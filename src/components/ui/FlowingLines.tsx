/**
 * Linhas fluidas (contorno) que dão energia/movimento ao fundo do hero —
 * adaptação monocromática dos "respingos" da referência. O grupo deriva
 * lentamente (animate-drift). Pausa com prefers-reduced-motion.
 */
export default function FlowingLines({ className = '' }: { className?: string }) {
  // Uma curva-base repetida com deslocamento horizontal → linhas paralelas.
  const base = 'M 250 -80 C 110 150, 380 320, 200 520 C 80 700, 360 780, 250 920'
  const lines = Array.from({ length: 9 }, (_, i) => i)

  return (
    <svg
      className={className}
      viewBox="0 0 520 760"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="animate-drift2 origin-center">
        {lines.map((i) => (
          <path
            key={i}
            d={base}
            transform={`translate(${i * 26 - 40} 0)`}
            stroke={`rgba(214,131,106,${0.26 - i * 0.02})`}
            strokeWidth={1}
          />
        ))}
      </g>
    </svg>
  )
}
