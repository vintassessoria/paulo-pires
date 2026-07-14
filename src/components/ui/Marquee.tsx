type Props = {
  items: string[]
  className?: string
  duration?: number
}

/**
 * Faixa infinita horizontal (marquee). Pausa ao passar o mouse.
 * Conteúdo duplicado para loop perfeito.
 */
export default function Marquee({ items, className = '', duration = 32 }: Props) {
  const Group = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <div key={i} className="flex items-center">
          <span className="px-8 font-display text-2xl tracking-[0.12em] text-cream/70 sm:text-3xl">
            {it}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s` }}
      >
        <Group />
        <Group />
      </div>
    </div>
  )
}
