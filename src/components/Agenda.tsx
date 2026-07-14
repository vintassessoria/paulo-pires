import { CalendarClock, MapPin, Ticket, MessageCircle } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import FlowingLines from './ui/FlowingLines'
import { shows, whatsappLink } from '../data/site'

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return {
    day: d.toLocaleDateString('pt-BR', { day: '2-digit' }),
    month: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase(),
    year: d.getFullYear(),
  }
}

export default function Agenda() {
  const hasShows = shows.length > 0

  return (
    <section id="agenda" className="relative overflow-hidden py-20 sm:py-28">
      <FlowingLines className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="Shows"
          title="Agenda de shows"
          description="Acompanhe onde Paulo Pires vai se apresentar."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {hasShows ? (
            <ul className="space-y-4">
              {shows.map((show, i) => {
                const d = formatDate(show.date)
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <li className="card-dark flex flex-col items-start gap-4 rounded-2xl p-5 transition-colors hover:border-gold/40 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                        <span className="font-display text-2xl leading-none text-gold-grad">{d.day}</span>
                        <span className="text-[0.65rem] font-semibold tracking-widest text-muted">{d.month}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-heading text-lg font-semibold text-cream">
                          {show.city} <span className="text-muted">— {show.state}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-sm text-muted">
                          <MapPin className="h-3.5 w-3.5 text-gold" />
                          {show.venue} · {d.year}
                        </p>
                      </div>
                      {show.ticketUrl && (
                        <a href={show.ticketUrl} target="_blank" rel="noreferrer" className="btn-gold w-full sm:w-auto">
                          <Ticket className="h-4 w-4" />
                          Comprar ingresso
                        </a>
                      )}
                    </li>
                  </Reveal>
                )
              })}
            </ul>
          ) : (
            /* Estado: agenda em atualização — cartão 3D com camadas */
            <Card3D max={6} className="card-dark rounded-2xl">
              <div className="relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-12">
                <span className="depth relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                  <CalendarClock className="h-8 w-8" />
                </span>
                <h3 className="depth-sm relative font-display text-[1.7rem] font-semibold tracking-[-0.01em] text-cream sm:text-3xl">
                  Agenda em atualização
                </h3>
                <p className="relative mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
                  Novas datas serão divulgadas em breve. Para consultar disponibilidade e
                  contratar Paulo Pires para o seu evento, entre em contato com a produção.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold depth-sm relative mt-7"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar com a produção
                </a>
              </div>
            </Card3D>
          )}
        </div>
      </div>
    </section>
  )
}
