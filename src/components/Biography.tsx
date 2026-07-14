import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from './ui/Reveal'
import Card3D from './ui/Card3D'
import ArtistImage from './ui/ArtistImage'
import { timeline } from '../data/site'

/**
 * Linha do tempo "viva":
 *  - a linha se desenha conforme a rolagem, com um cometa brilhante na ponta
 *  - cada marco entra em 3D (flip com física de mola)
 *  - o marco em foco acende (nó pulsando + ano gigante em marca d'água),
 *    os demais esfriam — o olhar é guiado pela luz
 */
function LivingTimeline() {
  const wrapRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)

  // Linha que se desenha ao rolar (com inércia de mola)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.72', 'end 0.45'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const cometTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  // Marco em foco = o mais próximo do centro da tela
  useEffect(() => {
    const compute = () => {
      const probe = window.innerHeight * 0.5
      let best = 0
      let bestDist = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - probe)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <ol ref={wrapRef} className="relative [perspective:1200px]">
      {/* Trilho apagado */}
      <span aria-hidden className="absolute left-[13px] top-0 h-full w-px bg-white/10" />
      {/* Linha que se desenha */}
      <motion.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute left-[13px] top-0 h-full w-px origin-top bg-gradient-to-b from-gold-light via-gold to-gold/30"
      />
      {/* Cometa na ponta da linha */}
      <motion.span
        aria-hidden
        style={{ top: cometTop }}
        className="absolute left-[13px] z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-[0_0_16px_4px_rgba(214,131,106,0.55)]"
      />

      {timeline.map((item, i) => {
        const isActive = i === active
        const hasYear = /\d/.test(item.year)
        return (
          <motion.li
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            initial={{ opacity: 0, x: -36, rotateY: -18, rotateX: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 95, damping: 16, delay: (i % 3) * 0.07 }}
            className="relative pb-9 pl-12 last:pb-0 [transform-style:preserve-3d]"
          >
            {/* Nó: aceso e pulsando quando em foco */}
            <span className="absolute left-[13px] top-1.5 -translate-x-1/2">
              <motion.span
                initial={{ scale: 0.68 }}
                animate={isActive ? { scale: 1 } : { scale: 0.68 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className={`block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 ${
                  isActive
                    ? 'border-gold-light bg-gold/40 shadow-[0_0_16px_3px_rgba(214,131,106,0.5)]'
                    : 'border-gold/40 bg-ink'
                }`}
              />
              {isActive && (
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
              )}
            </span>

            {/* Ano gigante em marca d'água (só no marco em foco) */}
            {hasYear && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: isActive ? 0.07 : 0, x: isActive ? 0 : 18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -top-5 right-0 select-none font-display text-[4.4rem] font-semibold italic leading-none text-warm-100"
              >
                {item.year}
              </motion.span>
            )}

            {/* Cartão do marco: em foco = aceso; fora = esfriado */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5, x: 0 }}
              animate={
                isActive ? { scale: 1.02, opacity: 1, x: 4 } : { scale: 1, opacity: 0.5, x: 0 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative origin-left [transform-style:preserve-3d]"
            >
              <span
                className={`depth-sm inline-block font-display text-lg tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-gold-light' : 'text-gold/70'
                }`}
              >
                {item.year}
              </span>
              <p className="font-heading text-base font-semibold text-cream">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted">{item.text}</p>
            </motion.div>
          </motion.li>
        )
      })}
    </ol>
  )
}

const paragraphs = [
  'Paulo Pires nasceu em Goiás, em 1986, e cresceu cercado por influências musicais de familiares e amigos. Aos 12 anos, já fazia parte de uma banda, dando seus primeiros passos em uma trajetória que logo se tornaria nacional.',
  'Aos 19, iniciou sua carreira como compositor no meio secular e, em 2013, decidiu também seguir carreira solo, gravando seu primeiro CD. Depois desse projeto, passou a se dedicar integralmente à composição, assinando grandes sucessos que ganharam o Brasil na voz de artistas como Marília Mendonça, Gusttavo Lima, Mano Walter, Maiara & Maraisa, entre outros.',
  'Em 2020, ao lado da Best Produções Artísticas, Paulo retomou sua carreira como cantor. Com letras descontraídas, melodias cativantes e uma identidade que mistura sertanejo, pop e romantismo, suas músicas passaram a alcançar cada vez mais público nas plataformas digitais.',
  'O hit “Ameaça”, lançado em 2021 em parceria com MC Danny e Marcynho, marcou uma nova fase em sua carreira: certificado triplo de Diamante, mais de 650 milhões de execuções e o topo do Spotify Brasil, além de entrar no Top 200 Global.',
]

export default function Biography() {
  return (
    <section id="biografia" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div className="container-pp">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Texto + linha do tempo (esquerda) */}
          <div className="glass-deep order-2 rounded-3xl p-6 sm:p-9 lg:order-1">
            <Reveal>
              <span className="eyebrow !text-gold" style={{ textShadow: 'none' }}>
                Biografia
              </span>
              <h2 className="mt-3 text-balance font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-cream">
                A história por trás da <span className="italic font-normal text-warm-100">voz</span>
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-pretty text-[0.975rem] leading-relaxed text-muted sm:text-base">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <h3 className="mb-6 mt-12 font-heading text-lg font-semibold text-cream">
                Marcos da carreira
              </h3>
            </Reveal>

            <LivingTimeline />
          </div>

          {/* Retrato 3D (direita): inclina com o cursor, brilho que segue o
              mouse, reflexo no chão e legenda flutuando em profundidade */}
          <div className="relative order-1 h-[56vh] lg:order-2 lg:sticky lg:top-24 lg:h-[74vh]">
            <Card3D max={7} className="h-full rounded-[1.5rem]">
              <div className="reflect-below-lg relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
                <ArtistImage
                  src="/images/paulo-bio.jpg"
                  alt="Paulo Pires — retrato"
                  label="Foto biografia"
                  imgClassName="object-top"
                  className="h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(168,66,60,0.10), transparent 45%, rgba(18,12,11,0.35))',
                  }}
                />
              </div>
              <div className="glass-strong depth absolute bottom-3 left-3 z-20 rounded-2xl px-5 py-4">
                <p className="font-display text-xl font-semibold tracking-tight text-warm-100">
                  Goiano, desde 1986
                </p>
                <p className="text-xs uppercase tracking-wide text-muted">
                  Sertanejo · Pop · Romântico
                </p>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  )
}
