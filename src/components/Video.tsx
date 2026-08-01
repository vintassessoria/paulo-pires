import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import Reveal from './ui/Reveal'

/** Vídeo — a produção do Paulo. Poster + play; o vídeo só baixa ao clicar. */
export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <section id="video" className="bg-bone py-20 sm:py-28">
      <div className="container-pp">
        <Reveal>
          <p className="eyebrow">Produção</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] text-ink">
            Paulo Pires em cena
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-3xl border border-ink/10 bg-black">
            <video
              ref={videoRef}
              poster="/videos/producao-poster.jpg"
              preload="none"
              playsInline
              controls={playing}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              className="h-full w-full object-cover"
            >
              <source src="/videos/producao.mp4" type="video/mp4" />
            </video>
            {!playing && (
              <button
                type="button"
                onClick={play}
                aria-label="Assistir ao vídeo"
                className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/15"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-7 w-7 translate-x-[2px] fill-current" />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
