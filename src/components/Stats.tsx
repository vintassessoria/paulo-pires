import { Gem, Trophy, TrendingUp, Globe2 } from 'lucide-react'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import Counter from './ui/Counter'
import FlowingLines from './ui/FlowingLines'
import { achievements, socialStats } from '../data/site'
import { SpotifyIcon, YoutubeIcon, InstagramIcon } from './icons/BrandIcons'

const icons = [TrendingUp, Gem, Trophy, Globe2]
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

        {/* Cards de conquista — estrutura alinhada:
            [ícone + rótulo] / número / contexto fixado na base */}
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Card3D
                key={item.value}
                delay={i * 0.08}
                className="card-dark h-full rounded-2xl transition-colors duration-300 hover:border-gold/40"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="depth-sm flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-widest2 text-muted">
                      {item.label}
                    </span>
                  </div>
                  <Counter
                    value={item.value}
                    className="depth mt-5 block font-display text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.01em] text-gold-grad [font-variant-numeric:tabular-nums] xl:text-[2.1rem]"
                  />
                  <p className="mt-auto pt-4 text-sm text-muted">{item.sub}</p>
                </div>
              </Card3D>
            )
          })}
        </div>

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
