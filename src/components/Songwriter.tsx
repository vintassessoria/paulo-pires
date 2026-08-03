import { PenLine } from 'lucide-react'
import Section from './ui/Section'
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

type Group = (typeof groups)[number]

/** Fileira de cards que desliza sozinha para o lado (loop infinito). Pausa no hover. */
function CardMarquee({ items, duration = 60 }: { items: Group[]; duration?: number }) {
  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-stretch" aria-hidden={hidden}>
      {items.map((g, i) => (
        <div
          key={i}
          className="mx-2 flex w-72 shrink-0 flex-col rounded-2xl border border-ink/10 bg-white p-5 text-left shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]"
        >
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
            <h3 className="truncate font-heading text-base font-bold text-ink">{g.artist}</h3>
            <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
              {g.songs.length} {g.songs.length === 1 ? 'música' : 'músicas'}
            </span>
          </div>
          <ul className="space-y-2">
            {g.songs.slice(0, 3).map((s) => (
              <li key={s.title} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 flex-1 truncate text-sm text-ink/80">{s.title}</span>
                <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-gold">
                  {s.plays}
                </span>
              </li>
            ))}
          </ul>
          {g.songs.length > 3 && (
            <p className="mt-auto pt-3 text-xs font-medium text-ink/45">
              + {g.songs.length - 3} {g.songs.length - 3 === 1 ? 'outra música' : 'outras músicas'}
            </p>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="group flex overflow-hidden py-1">
      <div
        className="flex w-max items-stretch animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}

/**
 * Composições — o diferencial do Paulo. Cards por artista num carrossel que
 * desliza sozinho para o lado (igual as fotos). Cada card mostra as 3 mais
 * tocadas + "+N outras".
 */
export default function Songwriter() {
  return (
    <Section
      id="composicoes"
      icon={PenLine}
      title="Composições"
      subtitle="Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição do Paulo Pires — de Marília Mendonça a Ana Castela."
      bg="light"
      animated
      watermark="Paulo Pires"
    >
      {/* Carrossel full-bleed (de ponta a ponta) */}
      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden">
        <CardMarquee items={groups} duration={60} />
      </div>
    </Section>
  )
}
