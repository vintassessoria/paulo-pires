import { motion } from 'framer-motion'
import {
  Mic2,
  Building2,
  PartyPopper,
  Tractor,
  Music,
  Theater,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'
import Card3D from './ui/Card3D'
import ArtistImage from './ui/ArtistImage'
import FlowingLines from './ui/FlowingLines'
import { eventTypes, contact, whatsappLink, mailtoLink } from '../data/site'

const eventIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Shows: Mic2,
  'Eventos corporativos': Building2,
  'Festas públicas': PartyPopper,
  Rodeios: Tractor,
  Festivais: Music,
  'Casas de show': Theater,
}

export default function Booking() {
  return (
    <section id="contrate" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      {/* Linhas fluidas atrás do recorte (direita) */}
      <FlowingLines className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-1/2 opacity-40 lg:block" />

      <div className="container-pp relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        {/* Texto + conversão (esquerda) */}
        <div>
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-heading text-xs font-semibold uppercase tracking-widest2 text-gold/90">
                Contratação de shows
              </span>
            </div>
            <h2 className="text-balance font-display text-[clamp(2.15rem,4.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white text-shadow-warm">
              Contrate <span className="italic font-normal text-warm-100">Paulo Pires</span>
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 text-shadow-warm sm:text-lg">
              Leve para o seu evento um show com repertório envolvente, presença de palco e a
              assinatura de um artista que carrega grandes sucessos da música brasileira.
            </p>
          </Reveal>

          {/* Tipos de evento (chips) */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {eventTypes.map((type, i) => {
              const Icon = eventIcons[type] ?? Music
              return (
                <motion.span
                  key={type}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)]"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {type}
                </motion.span>
              )
            })}
          </div>

          {/* CTAs */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-gold w-full sm:w-auto">
                  <Phone className="h-4 w-4" />
                  Chamar no WhatsApp
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <a href={mailtoLink} className="btn-ghost w-full sm:w-auto">
                  <Mail className="h-4 w-4" />
                  Enviar e-mail
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Contatos diretos */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] text-gold transition-colors group-hover:bg-gold/15">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-wide text-muted">WhatsApp</p>
                  <p className="font-heading font-semibold text-cream">{contact.whatsappDisplay}</p>
                </div>
              </a>
              <a href={mailtoLink} className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] text-gold transition-colors group-hover:bg-gold/15">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-wide text-muted">E-mail</p>
                  <p className="font-heading font-semibold text-cream">{contact.email}</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Retrato 3D (direita): mesmo tratamento do coverflow */}
        <div className="relative h-[54vh] lg:h-[68vh]">
          <Card3D max={7} className="h-full rounded-[1.5rem]">
            <div className="reflect-below-lg relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
              <ArtistImage
                src="/images/paulo-booking.jpg"
                alt="Paulo Pires — retrato"
                label="Retrato"
                imgClassName="object-top"
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(168,66,60,0.12), transparent 45%, rgba(18,12,11,0.4))',
                }}
              />
            </div>
            <div className="glass-strong depth absolute bottom-3 left-3 z-20 rounded-2xl px-4 py-3">
              <p className="font-heading text-xs font-semibold uppercase tracking-widest2 text-gold-light">
                Ao vivo
              </p>
              <p className="text-xs text-muted">Repertório que conecta o público</p>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}
