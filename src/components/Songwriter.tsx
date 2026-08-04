import { PenLine } from 'lucide-react'
import Section from './ui/Section'
import CardReveal from './ui/CardReveal'
import { compositionCredits } from '../data/site'

/** Converte "334 mi" / "6,2 mi" / "704 k" em número, para ordenar. */
function parsePlays(s: string): number {
  const m = s.match(/([\d.,]+)\s*(mi|k|mil)?/i)
  if (!m) return 0
  const num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'))
  const unit = (m[2] || '').toLowerCase()
  if (unit === 'mi') return num * 1e6
  if (unit === 'k' || unit === 'mil') return num * 1e3
  return num
}

// Ordena as músicas de cada artista por streams e os artistas pelo total.
const groups = compositionCredits
  .map((g) => ({
    artist: g.artist,
    songs: [...g.songs].sort((a, b) => parsePlays(b.plays) - parsePlays(a.plays)),
    total: g.songs.reduce((sum, s) => sum + parsePlays(s.plays), 0),
  }))
  .sort((a, b) => b.total - a.total)

/**
 * Composições — exibidas com os cards no estilo exato da referência (Header + Badge rosa/vermelho + lista de faixas + plays em vermelho).
 */
export default function Songwriter() {
  return (
    <Section
      id="composicoes"
      icon={PenLine}
      title="Composições"
      subtitle="Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição de Paulo Pires — de Marília Mendonça a Ana Castela."
      bg="light"
    >
      <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, index) => (
          <CardReveal key={g.artist} index={index}>
            <div className="flex h-full flex-col rounded-2xl border border-gray-200/70 bg-white p-5 sm:p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              {/* Topo do card: Nome do artista + badge rosa/vermelho */}
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <h3 className="truncate font-heading text-base sm:text-lg font-bold text-gray-900">
                  {g.artist}
                </h3>
                <span className="shrink-0 rounded-full bg-[#FFEAEA] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#E52E4D]">
                  {g.songs.length} {g.songs.length === 1 ? 'MÚSICA' : 'MÚSICAS'}
                </span>
              </div>

              {/* Lista de músicas do artista */}
              <ul className="space-y-3">
                {g.songs.map((s) => (
                  <li key={s.title} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm text-gray-600 font-normal">
                      {s.title}
                    </span>
                    <span className="shrink-0 font-heading text-sm font-bold text-[#E52E4D] tabular-nums">
                      {s.plays}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardReveal>
        ))}
      </div>
    </Section>
  )
}
