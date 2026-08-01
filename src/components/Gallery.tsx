import Reveal from './ui/Reveal'

const photos = [
  '/images/feed-1.webp',
  '/images/feed-4.webp',
  '/images/feed-2.webp',
  '/images/feed-5.webp',
  '/images/feed-3.webp',
  '/images/feed-6.webp',
]

/** Fotos — grade editorial limpa, com leve zoom no hover. */
export default function Gallery() {
  return (
    <section id="fotos" className="bg-white py-20 sm:py-28">
      <div className="container-pp">
        <Reveal>
          <p className="eyebrow">Galeria</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] text-ink">
            Fotos
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((src, i) => (
            <Reveal
              key={src}
              delay={(i % 4) * 0.05}
              className={i === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <div className="group h-full overflow-hidden rounded-2xl border border-ink/10">
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
      </div>
    </section>
  )
}
