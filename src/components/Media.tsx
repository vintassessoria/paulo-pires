import { Tv, Mic, Radio } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import FlowingLines from './ui/FlowingLines'
import { mediaAppearances } from '../data/site'

function iconFor(outlet: string) {
  if (/podcast/i.test(outlet)) return Mic
  if (/rádio|radio|fm/i.test(outlet)) return Radio
  return Tv
}

/** Na Mídia — presenças em TV e podcasts (mídia kit 2026). */
export default function Media() {
  return (
    <section id="midia" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gold" />
      <FlowingLines className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="Na Mídia"
          title="Do palco às maiores telas do país"
          description="Presença nos principais programas da TV aberta e nos podcasts de maior audiência do Brasil."
        />

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mediaAppearances.map((m, i) => {
            const Icon = iconFor(m.outlet)
            return (
              <Card3D
                key={m.program}
                delay={(i % 3) * 0.06}
                className="card-dark rounded-xl transition-colors duration-300 hover:border-gold/40"
              >
                <div className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-sm font-semibold text-ink">
                      {m.program}
                    </p>
                    <span className="mt-0.5 inline-block rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-light">
                      {m.outlet}
                    </span>
                  </div>
                </div>
              </Card3D>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-sm text-muted">
            Entre outras aparições em emissoras e canais de todo o Brasil.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
