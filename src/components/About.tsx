import { User } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import Counter from './ui/Counter'
import { bio, socialStats } from '../data/site'

/** Biografia — texto centralizado + os números que dão autoridade. */
export default function About() {
  return (
    <Section
      id="biografia"
      icon={User}
      title="Biografia"
      subtitle="Quem é o goiano por trás dos maiores sucessos do sertanejo."
      bgImage="/images/paulo-bio.jpg"
      bgPosition="center 20%"
    >
      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        {bio.map((p, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-pretty leading-relaxed text-cream/75">{p}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {socialStats.map((s) => (
            <div key={s.platform}>
              <Counter
                value={s.value}
                className="block font-display text-3xl font-black text-gold-light [font-variant-numeric:tabular-nums] sm:text-4xl"
              />
              <p className="mt-1.5 text-xs uppercase tracking-wide text-cream/55">
                {s.platform}
                <br />
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
