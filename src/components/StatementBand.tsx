import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/**
 * Uma linha de título que sobe revelando (máscara overflow + translateY).
 * `useInView` observa o CONTAINER estável (não o span transladado), senão o
 * IntersectionObserver enxergava o elemento já fora do quadro e nunca disparava.
 */
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2, margin: '0px 0px -12% 0px' })
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.06em]">
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

/**
 * Manifesto bold com uma CÁPSULA DE IMAGEM embutida no título gigante — o
 * efeito-assinatura do modelo Bold Design Portfolio. A cápsula faz parallax
 * suave ao rolar e revela por "cortina" (clip-path) ao entrar na tela.
 */
export default function StatementBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const capsuleY = useTransform(scrollYProgress, [0, 1], [26, -26])

  const capRef = useRef<HTMLSpanElement>(null)
  const capInView = useInView(capRef, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.10),transparent_60%)] blur-3xl" />
      <div className="container-pp relative z-10">
        <p className="eyebrow mb-8 text-center">Você já conhece o trabalho dele</p>

        <h2 className="text-center font-display text-[clamp(2.6rem,9.5vw,9rem)] uppercase leading-[0.86] tracking-[0.005em] text-cream">
          <span className="sr-only">Você já cantou uma música dele.</span>

          <Line>Você já</Line>
          <Line delay={0.08}>
            <span className="inline-flex items-center gap-[0.18em] align-middle">
              cantou
              {/* Cápsula de imagem embutida no título */}
              <motion.span
                ref={capRef}
                style={{ y: capsuleY }}
                className="relative inline-block h-[0.72em] w-[1.9em] shrink-0 overflow-hidden rounded-[0.18em] align-middle ring-1 ring-white/15"
              >
                <motion.span
                  className="block h-full w-full"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={capInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                >
                  <img src="/images/capsule.webp" alt="Paulo Pires" className="h-full w-full object-cover" />
                </motion.span>
              </motion.span>
            </span>
          </Line>
          <Line delay={0.16}>
            uma música <span className="text-gold">dele</span>
          </Line>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-9 max-w-xl text-balance text-center text-base leading-relaxed text-white/60"
        >
          De Marília a Gusttavo, de Ana Castela a Luan — Paulo Pires assina os
          refrões que o Brasil inteiro canta sem nem saber quem escreveu.
        </motion.p>
      </div>
    </section>
  )
}
