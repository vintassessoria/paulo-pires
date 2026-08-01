import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import { contact, eventTypes, whatsappLink, mailtoLink } from '../data/site'

/** Contato para Shows — chamada direta pra fechar data (prioridade comercial). */
export default function Contact() {
  return (
    <section id="contato" className="bg-ink py-20 text-cream sm:py-28">
      <div className="container-pp">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="font-heading text-xs font-bold uppercase tracking-widest2 text-gold-light">
                Contratação de shows
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-black uppercase leading-[0.95] text-cream">
                Leve o Paulo Pires para o seu evento
              </h2>
              <p className="mt-5 max-w-md text-cream/70">
                Show, evento corporativo, festa ou rodeio: fale com a equipe e garanta a data com o
                artista que assina os maiores sucessos do sertanejo.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-cream/20 px-3 py-1.5 text-xs font-medium text-cream/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white/[0.06] p-7 sm:p-9">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full !py-4 text-sm"
              >
                Chamar no WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="mt-8 space-y-5">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gold-light">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-cream/50">WhatsApp</span>
                    <span className="font-heading text-lg font-bold text-cream group-hover:text-gold-light">
                      {contact.whatsappDisplay}
                    </span>
                  </span>
                </a>
                <a href={mailtoLink} className="flex items-center gap-4 group">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gold-light">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wide text-cream/50">E-mail</span>
                    <span className="block break-all font-heading text-lg font-bold text-cream group-hover:text-gold-light">
                      {contact.email}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
