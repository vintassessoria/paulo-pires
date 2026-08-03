type Variant = 'dark' | 'red' | 'light'

type Blob = { cls: string; color: string; op: number; anim: string; dur: number }

/**
 * Fundo animado tipo FUMAÇA/NÉVOA (estilo quintaldohungria.com): manchas
 * grandes bem borradas (blur) que derivam e se deformam devagar, formando
 * nuvens que se movem. Cores do Paulo (vermelho/vinho escuro). O blur fica
 * numa camada só (mais barato); as manchas se movem só com transform.
 */
const BLOBS: Record<Variant, Blob[]> = {
  dark: [
    { cls: '-left-[10%] -top-[15%] h-[70vw] w-[70vw]', color: '#8f0c20', op: 0.5, anim: 'animate-drift1', dur: 17 },
    { cls: '-right-[12%] -top-[8%] h-[62vw] w-[62vw]', color: '#5c0f1e', op: 0.55, anim: 'animate-drift2', dur: 21 },
    { cls: 'left-[12%] -bottom-[18%] h-[72vw] w-[72vw]', color: '#b00c22', op: 0.42, anim: 'animate-drift3', dur: 19 },
    { cls: 'right-[6%] -bottom-[12%] h-[56vw] w-[56vw]', color: '#3a0a12', op: 0.6, anim: 'animate-wave', dur: 25 },
  ],
  red: [
    { cls: '-left-[10%] -top-[15%] h-[70vw] w-[70vw]', color: '#FF6B4A', op: 0.4, anim: 'animate-drift1', dur: 17 },
    { cls: '-right-[12%] -top-[8%] h-[62vw] w-[62vw]', color: '#7c0a1c', op: 0.62, anim: 'animate-drift2', dur: 21 },
    { cls: 'left-[12%] -bottom-[18%] h-[72vw] w-[72vw]', color: '#c20d26', op: 0.42, anim: 'animate-drift3', dur: 19 },
    { cls: 'right-[6%] -bottom-[12%] h-[56vw] w-[56vw]', color: '#2a0508', op: 0.6, anim: 'animate-wave', dur: 25 },
  ],
  light: [
    { cls: '-left-[10%] -top-[15%] h-[60vw] w-[60vw]', color: '#FF6B4A', op: 0.18, anim: 'animate-drift1', dur: 19 },
    { cls: '-right-[12%] -top-[8%] h-[55vw] w-[55vw]', color: '#E5102E', op: 0.08, anim: 'animate-drift2', dur: 23 },
    { cls: 'left-[12%] -bottom-[18%] h-[62vw] w-[62vw]', color: '#F5330C', op: 0.1, anim: 'animate-drift3', dur: 21 },
  ],
}

// Grão de filme (ruído procedural via SVG feTurbulence).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  const grainOpacity = variant === 'light' ? 0.07 : 0.13
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Camada de fumaça: manchas coloridas borradas que derivam */}
      <div className="absolute inset-0 blur-[55px]">
        {BLOBS[variant].map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${b.cls} ${b.anim}`}
            style={{
              backgroundColor: b.color,
              opacity: b.op,
              animationDuration: `${b.dur}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
      {/* Grão de filme */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: '170px 170px', opacity: grainOpacity }}
      />
    </div>
  )
}
