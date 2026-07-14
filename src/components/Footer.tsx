import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import Logo from './ui/Logo'
import Magnetic from './ui/Magnetic'
import { socialItems } from './icons/BrandIcons'
import { navLinks, socials, contact, whatsappLink, mailtoLink } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-coal">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gold" />
      <div className="container-pp relative z-10 pt-16">
        {/* Fechamento editorial */}
        <div className="flex flex-col items-start justify-between gap-7 border-b border-white/8 pb-12 md:flex-row md:items-end">
          <h2 className="max-w-xl text-balance font-display text-[clamp(2.05rem,3.8vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-cream">
            Leve <span className="italic font-normal text-warm-100">Paulo Pires</span> para o seu
            palco.
          </h2>
          <Magnetic strength={0.2}>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-gold shrink-0">
              Falar com a produção
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>

        {/* Colunas */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Cantor e compositor goiano. Sertanejo, pop e romantismo em canções que conectam o
              Brasil.
            </p>
            <div className="mt-6 flex gap-3">
              {socialItems.map(({ name, Icon, key }) => (
                <a
                  key={key}
                  href={socials[key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-cream"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow">Navegação</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Contato comercial</h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink}
                  className="flex items-center gap-3 break-all text-sm text-muted transition-colors hover:text-cream"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted/70">
            © {year} Paulo Pires. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted/50">Site oficial · Cantor &amp; Compositor</p>
        </div>
      </div>

    </footer>
  )
}
