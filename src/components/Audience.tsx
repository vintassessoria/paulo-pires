import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import Counter from './ui/Counter'
import { audience, socialStats } from '../data/site'
import { SpotifyIcon, YoutubeIcon, InstagramIcon, TiktokIcon } from './icons/BrandIcons'

const platformIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Spotify: SpotifyIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
  TikTok: TiktokIcon,
}

const maxPct = Math.max(...audience.ageRanges.map((a) => a.pct))

export default function Audience() {
  return (
    <section id="publico" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="Público"
          title="Quem ouve o Paulo Pires"
          description="Uma audiência majoritariamente adulta, engajada e espalhada pelas maiores capitais — o perfil que lota casas de show por todo o país."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Perfil: gênero + faixas etárias */}
          <Card3D className="card-dark rounded-2xl">
            <div className="p-6 sm:p-8">
              <p className="eyebrow mb-5">Perfil</p>

              {/* Gênero */}
              <div className="mb-6 flex items-end gap-6">
                <div>
                  <span className="block font-display text-3xl font-semibold text-gold-grad">
                    {audience.gender.men}
                  </span>
                  <span className="text-sm text-muted">Homens</span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-semibold text-ink">
                    {audience.gender.women}
                  </span>
                  <span className="text-sm text-muted">Mulheres</span>
                </div>
              </div>
              <div className="mb-8 flex h-2 overflow-hidden rounded-full bg-ink/5">
                <span className="bg-gold" style={{ width: audience.gender.men }} />
                <span className="bg-warm-300/60" style={{ width: audience.gender.women }} />
              </div>

              {/* Faixas etárias */}
              <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-widest2 text-muted">
                Principais faixas etárias
              </p>
              <div className="space-y-2.5">
                {audience.ageRanges.map((a, i) => (
                  <div key={a.range} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-xs tabular-nums text-ink/55">{a.range}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.06]">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(a.pct / maxPct) * 100}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-xs tabular-nums text-ink/70">
                      {a.pct.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card3D>

          {/* Principais praças */}
          <Card3D className="card-dark rounded-2xl">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <p className="eyebrow mb-5">Principais praças</p>
              <ul className="space-y-3">
                {audience.cities.map((city, i) => (
                  <Reveal key={city} delay={0.05 * i} y={16}>
                    <li className="flex items-center gap-3 border-b border-ink/[0.06] pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <span className="font-heading text-base text-ink">{city}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-muted">
                Presença forte no Centro-Oeste e Sudeste, com alcance nacional pelas plataformas
                digitais.
              </p>
            </div>
          </Card3D>
        </div>

        {/* Números de redes */}
        <Reveal delay={0.1}>
          <div className="card-dark mt-4 grid grid-cols-2 divide-ink/10 overflow-hidden rounded-2xl sm:grid-cols-4 sm:divide-x lg:divide-x">
            {socialStats.map((s) => {
              const Icon = platformIcon[s.platform]
              return (
                <div key={s.platform} className="flex flex-col gap-2 p-5 sm:p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.04] text-gold">
                    {Icon && <Icon className="h-4 w-4" />}
                  </span>
                  <Counter
                    value={s.value}
                    className="mt-1 block font-display text-xl font-semibold text-ink [font-variant-numeric:tabular-nums] sm:text-2xl"
                  />
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {s.platform} · {s.label}
                  </p>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
