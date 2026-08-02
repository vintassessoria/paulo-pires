import { PenLine } from 'lucide-react'
import { motion } from 'framer-motion'
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

// Ordena as músicas de cada artista por streams e os artistas pelo total de
// streams (dá mais peso a quem tem várias composições grandes do Paulo).
const groups = compositionCredits
  .map((g) => ({
    artist: g.artist,
    songs: [...g.songs].sort((a, b) => parsePlays(b.plays) - parsePlays(a.plays)),
    total: g.songs.reduce((sum, s) => sum + parsePlays(s.plays), 0),
  }))
  .sort((a, b) => b.total - a.total)

/**
 * Composições — cards por artista num mosaico (masonry) que encaixa sem deixar
 * buracos quando um card é curto. Cada card entra suave no scroll.
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
      <div className="mx-auto mt-12 max-w-5xl columns-1 gap-4 text-left sm:columns-2 lg:columns-3">
        {groups.map((g, gi) => (
          <motion.div
            key={g.artist}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (gi % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 break-inside-avoid rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)] transition-colors hover:border-gold/40"
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
              <h3 className="font-heading text-base font-bold text-ink">{g.artist}</h3>
              <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
                {g.songs.length} {g.songs.length === 1 ? 'música' : 'músicas'}
              </span>
            </div>
            <ul className="space-y-2">
              {g.songs.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 flex-1 truncate text-sm text-ink/80">{s.title}</span>
                  <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-gold">
                    {s.plays}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
