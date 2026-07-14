type Variant = 'washes' | 'orbs' | 'aurora' | 'beam'

/**
 * Fundos animados que se movem sozinhos, em variantes diferentes para dar
 * ritmo entre as seções. Aplicado em seções alternadas (sim/não).
 * Tudo monocromático-quente (vinho/terracota) e sutil. Pausa com
 * prefers-reduced-motion (regra global do CSS).
 */
export default function SectionFX({ variant = 'washes' }: { variant?: Variant }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {variant === 'washes' && (
        <>
          <div
            className="animate-drift1 absolute -left-[15%] top-[-20%] h-[65vh] w-[65vh] rounded-full opacity-70 blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(126,42,38,0.5), transparent 62%)' }}
          />
          <div
            className="animate-drift2 absolute -right-[10%] bottom-[-15%] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(154,80,52,0.5), transparent 62%)' }}
          />
          <div
            className="animate-drift3 absolute left-[35%] top-[20%] h-[50vh] w-[50vh] rounded-full opacity-50 blur-[110px]"
            style={{ background: 'radial-gradient(circle, rgba(101,60,46,0.5), transparent 62%)' }}
          />
        </>
      )}

      {variant === 'orbs' &&
        [
          { c: 'animate-drift1', pos: 'left-[8%] top-[14%]', size: 'h-44 w-44', col: 'rgba(168,66,60,0.42)' },
          { c: 'animate-drift3', pos: 'right-[12%] top-[22%]', size: 'h-28 w-28', col: 'rgba(214,131,106,0.36)' },
          { c: 'animate-drift2', pos: 'left-[24%] bottom-[14%]', size: 'h-56 w-56', col: 'rgba(126,60,45,0.42)' },
          { c: 'animate-drift1', pos: 'right-[6%] bottom-[8%]', size: 'h-36 w-36', col: 'rgba(154,80,52,0.4)' },
          { c: 'animate-drift3', pos: 'left-[52%] top-[6%]', size: 'h-24 w-24', col: 'rgba(214,131,106,0.3)' },
        ].map((o, i) => (
          <div
            key={i}
            className={`${o.c} ${o.pos} ${o.size} absolute rounded-full blur-[55px]`}
            style={{
              background: `radial-gradient(circle, ${o.col}, transparent 66%)`,
              animationDelay: `${i * 1.4}s`,
            }}
          />
        ))}

      {variant === 'aurora' && (
        <>
          <div
            className="animate-wave absolute left-[-20%] top-[16%] h-44 w-[140%] -rotate-6 opacity-60 blur-[70px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(168,66,60,0.5), rgba(214,131,106,0.4), transparent)',
            }}
          />
          <div
            className="animate-wave absolute left-[-20%] top-[46%] h-32 w-[140%] rotate-3 opacity-50 blur-[80px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(154,80,52,0.5), transparent)',
              animationDelay: '-4s',
              animationDuration: '20s',
            }}
          />
          <div
            className="animate-wave absolute left-[-20%] bottom-[10%] h-36 w-[140%] -rotate-3 opacity-45 blur-[75px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(126,60,45,0.5), transparent)',
              animationDelay: '-9s',
              animationDuration: '24s',
            }}
          />
        </>
      )}

      {variant === 'beam' && (
        <>
          <div
            className="animate-spin absolute left-1/2 top-1/2 h-[170vh] w-[170vh] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[60px]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(168,66,60,0.35) 40deg, transparent 95deg, transparent 205deg, rgba(154,80,52,0.3) 250deg, transparent 305deg)',
              animationDuration: '46s',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(126,42,38,0.4), transparent 65%)' }}
          />
        </>
      )}
    </div>
  )
}
