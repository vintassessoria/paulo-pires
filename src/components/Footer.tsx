import { socialItems } from './icons/BrandIcons'
import { navLinks, socials, contact, whatsappLink, mailtoLink } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="container-pp flex flex-col items-center gap-8 py-14 text-center">
        <img src="/images/logo.png" alt="Paulo Pires" className="h-7 w-auto invert" />

        {/* Navegação */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-xs font-bold uppercase tracking-widest text-cream/60 transition-colors hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contato rápido */}
        <div className="flex flex-col items-center gap-2 text-sm text-cream/60">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
            {contact.whatsappDisplay}
          </a>
          <a href={mailtoLink} className="break-all transition-colors hover:text-white">
            {contact.email}
          </a>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-4">
          {socialItems.map(({ name, Icon, key }) => (
            <a
              key={key}
              href={socials[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-light"
            >
              <Icon className="h-[1.05rem] w-[1.05rem]" />
            </a>
          ))}
        </div>

        <p className="mt-2 text-xs text-cream/40">
          © {year} Paulo Pires · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
