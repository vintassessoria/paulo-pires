import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, whatsappLink } from '../data/site'

/**
 * Cabeçalho no padrão dos sites de referência: barra FLAT e transparente
 * sobre o hero (logo à esquerda, links à direita), que vira sólida escura ao
 * rolar. Sem pílula flutuante.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const compute = () => {
      const probe = window.innerHeight * 0.38
      let current = '#inicio'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) current = '#' + id
      }
      setActive(current)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-solid py-3' : 'py-5'
      }`}
    >
      <div className="container-pp flex items-center justify-between">
        <a href="#inicio" aria-label="Paulo Pires — início" className="shrink-0">
          <img src="/images/logo.png" alt="Paulo Pires" className="h-6 w-auto invert sm:h-7" />
        </a>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`font-heading text-[13px] font-bold uppercase tracking-widest transition-colors duration-200 hover:text-gold-light ${
                  isActive ? 'text-gold-light' : 'text-white/85'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Hambúrguer mobile */}
        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold-light lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-coal/90 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                  className="font-display text-2xl font-bold uppercase tracking-wide text-white transition-colors hover:text-gold-light"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-gold mt-4"
              >
                Contato para shows
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
