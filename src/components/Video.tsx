import { useRef, useState } from 'react'
import { Video as VideoIcon, Play } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

/** Vídeo — a produção do Paulo. Poster + play; o vídeo só baixa ao clicar. */
export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <Section id="video" icon={VideoIcon} title="Paulo Pires em cena" subtitle="Um pedaço da produção ao vivo.">
      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black">
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
              className="group absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-[2px] fill-current" />
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
