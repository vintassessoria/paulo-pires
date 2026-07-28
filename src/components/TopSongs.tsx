import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Card3D from './ui/Card3D'
import Counter from './ui/Counter'
import FlowingLines from './ui/FlowingLines'
import { topSongs, socials } from '../data/site'
import { SpotifyIcon } from './icons/BrandIcons'

/**
 * As Mais Ouvidas — os hits do Paulo como ARTISTA (mídia kit 2026).
 * Cada cartão toca a prévia de 30s (URL fixa nos dados). Só um player do site
 * toca por vez, coordenado pelo evento `pp:audio`.
 */
export default function TopSongs() {
  const [playing, setPlaying] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wantRef = useRef<number | null>(null)

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'none'
      audioRef.current = a
      a.addEventListener('ended', () => {
        wantRef.current = null
        setPlaying(null)
      })
    }
    return audioRef.current
  }

  const toggle = (i: number) => {
    const a = getAudio()
    if (wantRef.current === i) {
      wantRef.current = null
      a.pause()
      setPlaying(null)
      return
    }
    const url = topSongs[i].preview
    if (!url) return
    if (a.src !== url) a.src = url
    wantRef.current = i
    a.play()
      .then(() => {
        setPlaying(i)
        window.dispatchEvent(new CustomEvent('pp:audio', { detail: 'topsongs' }))
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        wantRef.current = null
        setPlaying(null)
      })
  }

  // Se outro player do site tocar, este pausa
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'topsongs' && audioRef.current) {
        wantRef.current = null
        audioRef.current.pause()
        setPlaying(null)
      }
    }
    window.addEventListener('pp:audio', onOther)
    return () => window.removeEventListener('pp:audio', onOther)
  }, [])

  useEffect(() => () => audioRef.current?.pause(), [])

  return (
    <section id="sucessos" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gold" />
      <FlowingLines className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="As Mais Ouvidas"
          title="Os hits nas plataformas"
          description="Os maiores sucessos do Paulo Pires como artista, somando streams em todas as plataformas. Dê o play e ouça uma prévia."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topSongs.map((song, i) => {
            const isPlaying = playing === i
            return (
              <Card3D
                key={song.title}
                delay={i * 0.06}
                className="card-dark overflow-hidden rounded-2xl transition-colors duration-300 hover:border-gold/40"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Capa + botão de play */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-label={isPlaying ? `Pausar ${song.title}` : `Tocar ${song.title}`}
                    className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                  >
                    <img
                      src={song.cover}
                      alt={`Capa de ${song.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span
                      className={`absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity ${
                        isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white">
                        {isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="h-4 w-4 translate-x-[1px] fill-current" />
                        )}
                      </span>
                    </span>
                  </button>

                  {/* Texto */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-heading text-base font-semibold text-white">
                        {song.title}
                      </h3>
                      {song.badge && (
                        <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-light">
                          {song.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">{song.credit}</p>
                    <Counter
                      value={song.streams}
                      className="mt-1.5 block font-display text-lg font-semibold text-gold-grad [font-variant-numeric:tabular-nums]"
                    />
                    <p className="text-[11px] uppercase tracking-wide text-white/35">de streams</p>
                  </div>
                </div>
              </Card3D>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={socials.spotify}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <SpotifyIcon className="h-4 w-4" />
            Ouvir no Spotify
          </a>
        </div>
      </div>
    </section>
  )
}
