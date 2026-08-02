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

type Row = { title: string; artist: string; plays: string; n: number }

// Achata todas as composições numa lista só, tira títulos repetidos (mantém a
// versão mais tocada) e ordena do mais tocado para o menos.
const ranked: Row[] = Object.values(
  compositionCredits
    .flatMap((g) => g.songs.map((s) => ({ title: s.title, artist: g.artist, plays: s.plays, n: parsePlays(s.plays) })))
    .reduce<Record<string, Row>>((acc, cur) => {
      const key = cur.title.toLowerCase()
      if (!acc[key] || cur.n > acc[key].n) acc[key] = cur
      return acc
    }, {}),
).sort((a, b) => b.n - a.n)

const TOP = 20
const topRanked = ranked.slice(0, TOP)
const remaining = ranked.length - topRanked.length

/**
 * Composições — o diferencial do Paulo, em uma LISTA ÚNICA ranqueada por
 * streams (do mais tocado pro menos). Cada linha entra deslizando no scroll.
 */
export default function Songwriter() {
  return (
    <Section
      id="composicoes"
      icon={PenLine}
      title="Composições"
      subtitle="Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição do Paulo Pires — as mais tocadas, em ordem:"
      bg="light"
      watermark="Paulo Pires"
    >
      <ol className="mx-auto mt-12 max-w-3xl text-left">
        {topRanked.map((r, i) => (
          <motion.li
            key={r.title}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 border-b border-ink/10 py-3.5 transition-colors hover:bg-ink/[0.03] sm:gap-5"
          >
            <span className="w-8 shrink-0 text-center font-display text-lg font-black tabular-nums text-ink/25 sm:text-xl">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-heading text-base font-bold text-ink">{r.title}</span>
              <span className="block truncate text-sm text-ink/55">{r.artist}</span>
            </span>
            <span className="shrink-0 font-heading text-base font-bold tabular-nums text-gold sm:text-lg">
              {r.plays}
            </span>
          </motion.li>
        ))}
      </ol>

      {remaining > 0 && (
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink/50">
          + {remaining} outras composições gravadas por artistas de todo o país.
        </p>
      )}
    </Section>
  )
}
