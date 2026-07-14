import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'
import Logo from './ui/Logo'
import Magnetic from './ui/Magnetic'
import { navLinks, whatsappLink } from '../data/site'

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

  // Destaca no menu a seção visível no momento
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const compute = () => {
      const probe = window.innerHeight * 0.38
      let current = '#inicio'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom >= probe) {
          current = '#' + id
          break
        }
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

  // Bloqueia o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-pp">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? 'glass-deep shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]' : 'glass-panel'
          }`}
        >
          <a href="#inicio" aria-label="Paulo Pires — início" className="shrink-0">
            <Logo />
          </a>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative font-heading text-sm font-medium transition-colors duration-200 hover:text-white ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold-grad transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-flex">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-gold">
                <Calendar className="h-4 w-4" />
                Contratar show
              </a>
            </Magnetic>

            {/* Botão hamburguer mobile */}
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-white/[0.03] text-cream transition-colors hover:border-gold/50 hover:text-gold lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
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
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="container-pp relative pt-24"
            >
              <div className="glass-strong rounded-2xl p-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-base text-cream transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {link.label}
                    <span className="text-gold/40">›</span>
                  </motion.a>
                ))}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-gold mt-2 w-full"
                >
                  <Calendar className="h-4 w-4" />
                  Contratar show
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
