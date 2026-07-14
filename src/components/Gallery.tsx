import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { galleryPhotos } from '../data/site'

export default function Gallery() {
  return (
    <section id="galeria" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div className="container-pp">
        <SectionHeading
          eyebrow="Galeria"
          title="Nos cliques e no palco"
          description="A presença e a estética de Paulo Pires — do estúdio à energia do show ao vivo."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {galleryPhotos.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] ${
                i % 2 === 1 ? 'md:mt-12' : ''
              }`}
            >
              <motion.div
                initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: (i % 4) * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[3/4] overflow-hidden transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              >
                <motion.img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.14 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.1, delay: (i % 4) * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
              {/* Tinta quente + escurecimento na base */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(180deg, rgba(168,66,60,0.18), transparent 55%)' }}
              />
              <figcaption className="absolute bottom-4 left-4 font-display text-sm italic text-cream/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Paulo Pires
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
