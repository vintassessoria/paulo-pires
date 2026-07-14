import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Cortina de abertura: mostra o wordmark e revela a página com um
 * "wipe" para cima. Toca uma vez por sessão. Espera as fontes ficarem
 * prontas (com teto de 450ms) para não "pular" no meio da cena.
 */
export default function Intro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('pp-intro')
    if (seen) return
    let cancelled = false
    let t: ReturnType<typeof setTimeout> | undefined
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 450))]).then(() => {
      if (cancelled) return
      setShow(true)
      document.body.style.overflow = 'hidden'
      t = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('pp-intro', '1')
        document.body.style.overflow = ''
      }, 1900)
    })
    return () => {
      cancelled = true
      if (t) clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-stage-radial opacity-70" />
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-5xl font-semibold tracking-[-0.01em] text-cream sm:text-7xl">
                Paulo <span className="italic font-normal text-gold-grad">Pires</span>
              </p>
              <motion.div
                className="mx-auto mt-4 h-[2px] w-56 origin-center rounded-full bg-gold-grad will-change-transform sm:w-80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.p
                className="mt-4 font-heading text-xs uppercase tracking-widest2 text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Cantor • Compositor
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
