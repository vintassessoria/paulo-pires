import Reveal from './ui/Reveal'
import Counter from './ui/Counter'
import { bio, socialStats } from '../data/site'

/** Sobre — biografia direta: foto, texto e os números que dão autoridade. */
export default function About() {
  return (
    <section id="biografia" className="bg-bone py-20 sm:py-28">
      <div className="container-pp">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Foto */}
          <Reveal className="order-1">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/images/paulo-bio.jpg"
                alt="Paulo Pires"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Texto */}
          <div className="order-2">
            <Reveal>
              <p className="eyebrow">Biografia</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] text-ink">
                A história por trás da voz
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {bio.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-pretty leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Números */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-ink/10 pt-10 sm:grid-cols-4">
            {socialStats.map((s) => (
              <div key={s.platform}>
                <Counter
                  value={s.value}
                  className="block font-display text-3xl font-black text-ink [font-variant-numeric:tabular-nums] sm:text-4xl"
                />
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {s.platform} · {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
