import { Camera } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

const photos = [
  '/images/feed-1.webp',
  '/images/feed-4.webp',
  '/images/feed-2.webp',
  '/images/feed-5.webp',
  '/images/feed-3.webp',
  '/images/feed-6.webp',
]

/** Fotos — grade editorial com leve zoom no hover. Cabeçalho centralizado. */
export default function Gallery() {
  return (
    <Section id="fotos" icon={Camera} title="Fotos">
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 0.05} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
            <div className="group h-full overflow-hidden rounded-2xl border border-white/10">
              <img
                src={src}
                alt="Paulo Pires"
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? 'aspect-square lg:h-full' : 'aspect-[4/5]'
                }`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
