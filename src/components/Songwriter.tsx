import { PenLine } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import { compositionCredits } from '../data/site'

/**
 * Composições — o diferencial do Paulo: ele assina hits de meio Brasil.
 * Cabeçalho centralizado + grade de cartões escuros por artista.
 */
export default function Songwriter() {
  return (
    <Section
      id="composicoes"
      icon={PenLine}
      title="Composições"
      subtitle="Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição do Paulo Pires — de Marília Mendonça a Ana Castela."
      bgImage="/images/feed-5.webp"
    >
      <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {compositionCredits.map((group, gi) => (
          <Reveal key={group.artist} delay={(gi % 3) * 0.05}>
            <div className="card-dark h-full rounded-2xl p-5 transition-colors">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-heading text-base font-bold text-white">{group.artist}</h3>
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-light">
                  {group.songs.length} {group.songs.length === 1 ? 'música' : 'músicas'}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.songs.map((s) => (
                  <li key={s.title} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm text-cream/80">{s.title}</span>
                    <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-gold-light">
                      {s.plays}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
