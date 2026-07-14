import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/site'

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-3"
        >
          <span className="hidden rounded-full glass-strong px-4 py-2 font-heading text-sm font-medium text-cream shadow-lg sm:group-hover:block">
            Fale com a produção
          </span>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            <MessageCircle className="relative h-7 w-7 fill-current" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
