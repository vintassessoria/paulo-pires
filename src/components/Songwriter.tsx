import { PenLine } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import Tilt from './ui/Tilt'
import { compositionCredits } from '../data/site'

/**
 * Composições — o diferencial do Paulo. Faixa CLARA (como a seção clara do
 * Murilo Huff), com cartões claros por artista.
 */
export default function Songwriter() {
  return (
    <Section
      id="composicoes"
      icon={PenLine}
      title="Composições"
      subtitle="Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição do Paulo Pires — de Marília Mendonça a Ana Castela."
      bg="light"
      watermark="Paulo Pires"
    >
      <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {compositionCredits.map((group, gi) => (
          <Reveal key={group.artist} delay={(gi % 3) * 0.05}>
            <Tilt glare={false} className="h-full">
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)] transition-colors hover:border-gold/40">
              <div className="mb-4 flex items-center justify-between border-b border-ink/10 pb-3">
                <h3 className="font-heading text-base font-bold text-ink">{group.artist}</h3>
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
                  {group.songs.length} {group.songs.length === 1 ? 'música' : 'músicas'}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.songs.map((s) => (
                  <li key={s.title} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm text-ink/80">{s.title}</span>
                    <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-gold">
                      {s.plays}
                    </span>
                  </li>
                ))}
              </ul>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
