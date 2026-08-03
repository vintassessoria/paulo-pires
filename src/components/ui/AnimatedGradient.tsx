type Variant = 'dark' | 'red' | 'light'

/**
 * Fundo de gradiente ANIMADO: manchas de luz (radial-gradient) que derivam
 * devagar, dando um fundo "vivo" sem foto. Usa só transform (barato na GPU),
 * sem filtro de blur. As animações drift1/2/3 vêm do tailwind.config.
 */
const LAYERS: Record<Variant, string[]> = {
  dark: [
    'radial-gradient(45% 45% at 25% 30%, rgba(229,16,46,0.30), transparent 70%)',
    'radial-gradient(40% 40% at 82% 22%, rgba(245,51,12,0.20), transparent 70%)',
    'radial-gradient(52% 52% at 60% 92%, rgba(176,12,34,0.24), transparent 70%)',
  ],
  red: [
    'radial-gradient(50% 50% at 20% 25%, rgba(255,59,42,0.55), transparent 70%)',
    'radial-gradient(48% 48% at 85% 40%, rgba(150,8,28,0.60), transparent 70%)',
    'radial-gradient(55% 55% at 55% 95%, rgba(58,10,14,0.45), transparent 70%)',
  ],
  light: [
    'radial-gradient(45% 45% at 22% 28%, rgba(251,225,220,0.75), transparent 70%)',
    'radial-gradient(42% 42% at 82% 65%, rgba(229,16,46,0.07), transparent 70%)',
    'radial-gradient(48% 48% at 60% 10%, rgba(245,51,12,0.05), transparent 70%)',
  ],
}

const ANIM = ['animate-drift1', 'animate-drift2', 'animate-drift3']

export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {LAYERS[variant].map((bg, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${ANIM[i]}`}
          style={{ background: bg, willChange: 'transform' }}
        />
      ))}
    </div>
  )
}
