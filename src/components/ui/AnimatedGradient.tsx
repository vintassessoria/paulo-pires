type Variant = 'dark' | 'red' | 'light'

/**
 * Fundo CINEMATOGRÁFICO (estilo Framer "CinematicBackground"): um gradiente
 * rico multi-stop + uma segunda mancha de luz, os dois derivando bem devagar,
 * com uma textura de GRÃO DE FILME por cima (mix-blend overlay). O grão é o
 * que dá o ar "cinema". Só transform (barato na GPU).
 */
const GRAD: Record<Variant, [string, string]> = {
  dark: [
    'radial-gradient(ellipse 140% 100% at 50% 8%, #FF6B4A 0%, #E5102E 27%, #7c0a1c 52%, #1a0508 74%, transparent 92%)',
    'radial-gradient(ellipse 90% 75% at 82% 102%, rgba(245,51,12,0.5) 0%, transparent 60%)',
  ],
  red: [
    'radial-gradient(ellipse 150% 110% at 50% 10%, #FF9166 0%, #FF3B2A 24%, #E5102E 48%, #8f0a1e 76%, transparent 98%)',
    'radial-gradient(ellipse 85% 75% at 82% 102%, rgba(40,6,10,0.55) 0%, transparent 62%)',
  ],
  light: [
    'radial-gradient(ellipse 150% 120% at 50% 6%, rgba(255,107,74,0.32) 0%, rgba(229,16,46,0.10) 40%, transparent 74%)',
    'radial-gradient(ellipse 80% 70% at 85% 102%, rgba(245,51,12,0.06) 0%, transparent 60%)',
  ],
}

// Grão de filme (ruído procedural via SVG feTurbulence) como textura repetida.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  const [g1, g2] = GRAD[variant]
  const grainOpacity = variant === 'light' ? 0.09 : 0.16
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Gradiente rico, derivando bem devagar */}
      <div
        className="absolute inset-[-25%] animate-drift2"
        style={{ background: g1, animationDuration: '26s', willChange: 'transform' }}
      />
      {/* Segunda mancha, em outra direção, para dar profundidade */}
      <div
        className="absolute inset-[-25%] animate-drift1"
        style={{ background: g2, animationDuration: '21s', willChange: 'transform' }}
      />
      {/* Grão de filme */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: '170px 170px', opacity: grainOpacity }}
      />
    </div>
  )
}
