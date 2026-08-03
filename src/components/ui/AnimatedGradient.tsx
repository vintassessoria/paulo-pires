type Variant = 'dark' | 'red' | 'light'

type Layer = { bg: string; anim: string; dur: number }

/**
 * Fundo de GRADIENTE ANIMADO: manchas de luz (radial-gradient) posicionadas
 * nos cantos/bordas que derivam de forma bem visível, deixando o CENTRO mais
 * escuro (o texto continua destacando). Textura de grão de filme por cima.
 * Só transform (barato na GPU). Animações drift1/2/3 do tailwind.config.
 */
const LAYERS: Record<Variant, Layer[]> = {
  dark: [
    { bg: 'radial-gradient(45% 45% at 12% 16%, rgba(229,16,46,0.55), transparent 60%)', anim: 'animate-drift1', dur: 13 },
    { bg: 'radial-gradient(42% 42% at 90% 22%, rgba(255,59,42,0.45), transparent 60%)', anim: 'animate-drift2', dur: 16 },
    { bg: 'radial-gradient(52% 52% at 50% 108%, rgba(176,12,34,0.5), transparent 62%)', anim: 'animate-drift3', dur: 19 },
  ],
  red: [
    { bg: 'radial-gradient(55% 52% at 16% 16%, rgba(255,120,92,0.55), transparent 62%)', anim: 'animate-drift1', dur: 13 },
    { bg: 'radial-gradient(52% 50% at 88% 40%, rgba(125,6,22,0.7), transparent 62%)', anim: 'animate-drift2', dur: 16 },
    { bg: 'radial-gradient(55% 52% at 50% 108%, rgba(22,4,6,0.55), transparent 62%)', anim: 'animate-drift3', dur: 19 },
  ],
  light: [
    { bg: 'radial-gradient(45% 45% at 14% 18%, rgba(255,107,74,0.3), transparent 60%)', anim: 'animate-drift1', dur: 15 },
    { bg: 'radial-gradient(42% 42% at 88% 30%, rgba(229,16,46,0.09), transparent 60%)', anim: 'animate-drift2', dur: 18 },
    { bg: 'radial-gradient(48% 48% at 50% 108%, rgba(245,51,12,0.06), transparent 62%)', anim: 'animate-drift3', dur: 21 },
  ],
}

// Grão de filme (ruído procedural via SVG feTurbulence).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  const grainOpacity = variant === 'light' ? 0.08 : 0.14
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {LAYERS[variant].map((l, i) => (
        <div
          key={i}
          className={`absolute inset-[-15%] ${l.anim}`}
          style={{ background: l.bg, animationDuration: `${l.dur}s`, willChange: 'transform' }}
        />
      ))}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: '170px 170px', opacity: grainOpacity }}
      />
    </div>
  )
}
