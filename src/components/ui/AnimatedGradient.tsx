type Variant = 'dark' | 'red' | 'light'

type Layer = { bg: string; anim: string; dur: number }

/**
 * Fundo de GRADIENTE ANIMADO: manchas de luz (radial-gradient) grandes que
 * derivam e pulsam devagar, deixando o fundo "se mexendo". Só transform
 * (barato na GPU), sem blur. Animações drift1/2/3 vêm do tailwind.config.
 */
const LAYERS: Record<Variant, Layer[]> = {
  dark: [
    { bg: 'radial-gradient(60% 60% at 28% 30%, rgba(229,16,46,0.42), transparent 66%)', anim: 'animate-drift1', dur: 15 },
    { bg: 'radial-gradient(55% 55% at 80% 28%, rgba(245,51,12,0.30), transparent 66%)', anim: 'animate-drift2', dur: 19 },
    { bg: 'radial-gradient(65% 65% at 55% 90%, rgba(176,12,34,0.36), transparent 66%)', anim: 'animate-drift3', dur: 23 },
  ],
  red: [
    { bg: 'radial-gradient(62% 62% at 22% 26%, rgba(255,90,70,0.60), transparent 64%)', anim: 'animate-drift1', dur: 14 },
    { bg: 'radial-gradient(58% 58% at 82% 42%, rgba(140,6,26,0.70), transparent 64%)', anim: 'animate-drift2', dur: 18 },
    { bg: 'radial-gradient(66% 66% at 55% 94%, rgba(30,6,8,0.55), transparent 64%)', anim: 'animate-drift3', dur: 22 },
  ],
  light: [
    { bg: 'radial-gradient(58% 58% at 22% 28%, rgba(251,225,220,0.9), transparent 62%)', anim: 'animate-drift1', dur: 16 },
    { bg: 'radial-gradient(54% 54% at 82% 66%, rgba(229,16,46,0.12), transparent 62%)', anim: 'animate-drift2', dur: 20 },
    { bg: 'radial-gradient(60% 60% at 60% 6%, rgba(245,51,12,0.10), transparent 62%)', anim: 'animate-drift3', dur: 24 },
  ],
}

export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {LAYERS[variant].map((l, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${l.anim}`}
          style={{ background: l.bg, animationDuration: `${l.dur}s`, willChange: 'transform' }}
        />
      ))}
    </div>
  )
}
