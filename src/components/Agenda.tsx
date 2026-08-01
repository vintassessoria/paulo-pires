import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { shows, whatsappLink } from '../data/site'

/**
 * Agenda de Shows — prioridade nº 1 de um site de sertanejo (Murilo Huff /
 * Gusttavo Lima). Lista as datas confirmadas; sem datas, mostra o estado
 * "em atualização" com a chamada direta para contratar.
 */
export default function Agenda() {
  const hasShows = shows.length > 0
  return (
    <section id="agenda" className="relative bg-bone py-24 sm:py-32">
      <div className="container-pp">
        <SectionHeading
          eyebrow="Ao vivo"
          title="Agenda de Shows"
          description="Confira as próximas apresentações do Paulo Pires. Para levar o show para a sua cidade ou evento, fale com a equipe."
        />

        <div className="mt-14">
          {hasShows ? (
            <ul className="mx-auto max-w-3xl divide-y divide-ink/10">
              {shows.map((s) => (
                <Reveal key={`${s.date}-${s.city}`}>
                  <li className="flex flex-wrap items-center justify-between gap-4 py-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <Calendar className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-heading text-lg font-bold text-ink">
                          {s.city} <span className="text-muted">· {s.state}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-sm text-muted">
                          <MapPin className="h-3.5 w-3.5" /> {s.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-display text-xl font-bold text-ink">
                        {new Date(s.date + 'T00:00').toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                      {s.ticketUrl && (
                        <a href={s.ticketUrl} target="_blank" rel="noreferrer" className="btn-gold">
                          Ingressos
                        </a>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="mx-auto max-w-2xl">
              <div className="card-dark flex flex-col items-center rounded-3xl px-8 py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <Calendar className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase text-ink">
                  Agenda em atualização
                </h3>
                <p className="mt-3 max-w-md text-pretty text-muted">
                  Novas datas estão sendo confirmadas. Quer o Paulo Pires no seu evento? Fale com a
                  equipe e garanta a data.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold mt-8"
                >
                  Contratar show
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
