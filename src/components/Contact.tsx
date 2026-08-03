import { Star, Phone, Mail, ArrowUpRight } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import { contact, eventTypes, whatsappLink, mailtoLink } from '../data/site'

/** Contato para Shows — faixa vermelha cheia (como a seção verde do Murilo Huff). */
export default function Contact() {
  return (
    <Section
      id="contato"
      icon={Star}
      title="Contato para Shows"
      subtitle="Show, evento corporativo, festa ou rodeio: fale com a equipe e garanta a data com o artista que assina os maiores sucessos do sertanejo."
      bg="red"
      animated
      watermark="Paulo Pires"
    >
      {/* Contatos diretos */}
      <Reveal delay={0.05}>
        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-1 items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-5 text-left transition-colors hover:border-white/60"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <Phone className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-white/60">WhatsApp</span>
              <span className="font-heading text-lg font-bold text-white">
                {contact.whatsappDisplay}
              </span>
            </span>
          </a>
          <a
            href={mailtoLink}
            className="group flex flex-1 items-center gap-4 rounded-2xl border border-white/25 bg-white/10 p-5 text-left transition-colors hover:border-white/60"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-white/60">E-mail</span>
              <span className="block break-all font-heading text-base font-bold text-white">
                {contact.email}
              </span>
            </span>
          </a>
        </div>
      </Reveal>

      {/* CTA principal — botão branco sobre o vermelho */}
      <Reveal delay={0.1}>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-widest2 text-gold transition-colors hover:bg-cream"
        >
          Chamar no WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>

      {/* Tipos de evento */}
      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {eventTypes.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-medium text-white/85"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
