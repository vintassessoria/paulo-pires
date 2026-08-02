import { User } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import CardReveal from './ui/CardReveal'
import Counter from './ui/Counter'
import { bio, socialStats } from '../data/site'

/** Biografia — faixa vermelha cheia (como a seção laranja do Murilo Huff). */
export default function About() {
  return (
    <Section
      id="biografia"
      icon={User}
      title="Biografia"
      subtitle="Quem é o goiano por trás dos maiores sucessos do sertanejo."
      bg="red"
      watermark="Paulo Pires"
    >
      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        {bio.map((p, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-pretty leading-relaxed text-white/85">{p}</p>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/25 pt-10 sm:grid-cols-4">
        {socialStats.map((s, i) => (
          <CardReveal key={s.platform} index={i}>
            <Counter
              value={s.value}
              className="block font-display text-3xl font-black text-white [font-variant-numeric:tabular-nums] sm:text-4xl"
            />
            <p className="mt-1.5 text-xs uppercase tracking-wide text-white/70">
              {s.platform}
              <br />
              {s.label}
            </p>
          </CardReveal>
        ))}
      </div>
    </Section>
  )
}
