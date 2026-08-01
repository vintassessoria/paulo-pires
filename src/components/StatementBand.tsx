import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Linha de título que sobe revelando (máscara + translateY). `useInView`
 * observa o container estável — senão o observer via o elemento já fora do
 * quadro e nunca disparava (título ficava invisível).
 */
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2, margin: '0px 0px -12% 0px' })
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Manifesto minimalista (estilo Porto): tipografia grande, muito respiro. */
export default function StatementBand() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div className="container-pp">
        <p className="eyebrow mb-10">( Você já conhece o trabalho dele )</p>

        <h2 className="max-w-5xl font-display text-[clamp(2.2rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[-0.01em] text-ink">
          <span className="sr-only">Você já cantou uma música dele.</span>
          <Line>Você já cantou</Line>
          <Line delay={0.1}>
            uma música <span className="text-ink/30">dele.</span>
          </Line>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-ink/55 sm:text-lg"
        >
          De Marília a Gusttavo, de Ana Castela a Luan — Paulo Pires assina os
          refrões que o Brasil inteiro canta sem nem saber quem escreveu.
        </motion.p>
      </div>
    </section>
  )
}
