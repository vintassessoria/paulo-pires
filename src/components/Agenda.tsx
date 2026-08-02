import { Mic, MapPin, ArrowUpRight, CalendarDays } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import { shows, whatsappLink, contact } from '../data/site'

/**
 * Agenda de Shows — prioridade nº 1 (padrão Murilo Huff / Gusttavo Lima).
 * Cabeçalho centralizado com ícone + telefone de contratação; abaixo, a
 * lista de datas ou o estado "em atualização".
 */
export default function Agenda() {
  const hasShows = shows.length > 0
  return (
    <Section
      id="agenda"
      icon={Mic}
      title="Agenda de Shows"
      subtitle={
        <>
          Contrate um show do Paulo Pires:{' '}
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-bold text-gold-light">
            {contact.whatsappDisplay}
          </a>
        </>
      }
      bg="black"
      bgImage="/images/feed-3.webp"
      watermark="Paulo Pires"
    >
      <div className="mx-auto mt-12 max-w-2xl">
        {hasShows ? (
          <ul className="divide-y divide-white/10 text-left">
            {shows.map((s) => (
              <Reveal key={`${s.date}-${s.city}`}>
                <li className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gold/15 text-gold-light">
                      <span className="font-display text-sm font-black leading-none">
                        {new Date(s.date + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit' })}
                      </span>
                      <span className="text-[9px] font-bold uppercase">
                        {new Date(s.date + 'T00:00').toLocaleDateString('pt-BR', { month: 'short' })}
                      </span>
                    </span>
                    <div>
                      <p className="font-heading text-lg font-bold text-white">
                        {s.city} <span className="text-cream/50">· {s.state}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-cream/60">
                        <MapPin className="h-3.5 w-3.5" /> {s.venue}
                      </p>
                    </div>
                  </div>
                  {s.ticketUrl && (
                    <a href={s.ticketUrl} target="_blank" rel="noreferrer" className="btn-gold">
                      Ingressos
                    </a>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="card-dark flex flex-col items-center rounded-3xl px-8 py-12 text-center transition-colors">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                <CalendarDays className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-white">
                Agenda em atualização
              </h3>
              <p className="mt-3 max-w-md text-pretty text-cream/60">
                Novas datas estão sendo confirmadas. Quer o Paulo Pires no seu evento? Fale com a
                equipe e garanta a data.
              </p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-gold mt-7">
                Contratar show
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
