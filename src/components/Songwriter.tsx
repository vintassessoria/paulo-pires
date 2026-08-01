import Reveal from './ui/Reveal'
import { compositionCredits } from '../data/site'

/**
 * Composições — o diferencial do Paulo: ele assina hits de meio Brasil.
 * Grade limpa por artista, com as músicas e suas execuções. Sem player nem
 * coverflow — só o que importa: quem gravou o quê.
 */
export default function Songwriter() {
  return (
    <section id="composicoes" className="bg-white py-20 sm:py-28">
      <div className="container-pp">
        <Reveal>
          <p className="eyebrow">Composições</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] text-ink">
            A assinatura dele em<br className="hidden sm:block" /> dezenas de sucessos
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Mais de 80% dos grandes nomes do sertanejo já gravaram uma composição do Paulo Pires —
            de Marília Mendonça a Ana Castela.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compositionCredits.map((group, gi) => (
            <Reveal key={group.artist} delay={(gi % 3) * 0.05}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-5">
                <div className="mb-4 flex items-center justify-between border-b border-ink/8 pb-3">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
