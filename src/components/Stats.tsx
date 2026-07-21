import { TrendingUp } from 'lucide-react'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import Counter from './ui/Counter'
import FlowingLines from './ui/FlowingLines'
import { achievements, socialStats } from '../data/site'
import { SpotifyIcon, YoutubeIcon, InstagramIcon } from './icons/BrandIcons'

const platformIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Spotify: SpotifyIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
}

export default function Stats() {
  return (
    <section id="destaques" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gold" />
      <FlowingLines className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <Reveal className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Reconhecimento</span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(2.05rem,4.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white text-shadow-warm">
            Uma trajetória que fala por{' '}
            <span className="italic font-normal text-warm-100">números</span>
          </h2>
        </Reveal>

        {/* Número-síntese: o total de execuções somando as plataformas.
            Um destaque só, no lugar dos antigos quatro cards. */}
        {achievements[0] && (
          <Reveal>
            <Card3D className="card-dark mx-auto max-w-3xl rounded-2xl transition-colors duration-300 hover:border-gold/40">
              <div className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:py-12">
                <span className="depth-sm flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                  <TrendingUp className="h-6 w-6" />
                </span>
                <Counter
                  value={achievements[0].value}
                  className="block font-display text-[clamp(2.6rem,7vw,4rem)] font-semibold leading-[1] tracking-[-0.02em] text-gold-grad [font-variant-numeric:tabular-nums]"
                />
                <div>
                  <p className="font-display text-lg font-medium text-cream sm:text-xl">
                    {achievements[0].label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{achievements[0].sub}</p>
                </div>
              </div>
            </Card3D>
          </Reveal>
        )}

        {/* Faixa de números de redes */}
        <Reveal delay={0.1}>
          <div className="card-dark mt-4 grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {socialStats.map((s) => {
              const Icon = platformIcon[s.platform]
              return (
                <div key={s.platform} className="flex items-center gap-4 px-6 py-5">
                  {Icon && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  <div>
                    <Counter
                      value={s.value}
                      className="block font-display text-xl font-semibold text-cream [font-variant-numeric:tabular-nums] sm:text-2xl"
                    />
                    <p className="text-xs uppercase tracking-wide text-muted">
                      {s.platform} · {s.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
