import { User } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import CardReveal from './ui/CardReveal'
import Counter from './ui/Counter'
import { bio, socialStats } from '../data/site'

/** Biografia — com foto de fundo de Paulo Pires e overlay escuro elegante. */
export default function About() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Foto de fundo da biografia */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/paulo-bio.jpg"
          alt="Paulo Pires biografia"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/90" />
      </div>

      <Section
        id="biografia"
        icon={User}
        title="Biografia"
        subtitle="Quem é o goiano por trás dos maiores sucessos da música."
        bg="black"
        className="!bg-transparent"
      >
        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {bio.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-pretty leading-relaxed text-white/90 text-lg font-normal drop-shadow-sm">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/20 pt-10 sm:grid-cols-4">
          {socialStats.map((s, i) => (
            <CardReveal key={s.platform} index={i}>
              <Counter
                value={s.value}
                className="block font-display text-3xl font-black text-gold-light [font-variant-numeric:tabular-nums] sm:text-4xl"
              />
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
                {s.platform}
                <br />
                {s.label}
              </p>
            </CardReveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
