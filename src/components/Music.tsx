import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import Reveal from './ui/Reveal'
import { topSongs, socials, spotifyArtistId } from '../data/site'
import { SpotifyIcon } from './icons/BrandIcons'

/**
 * Músicas — grade limpa dos hits do Paulo como artista (capa, título, créditos,
 * streams), com prévia de 30s, mais o player do Spotify embutido. Sem gimmick:
 * layout direto, no padrão de site de artista.
 */
export default function Music() {
  const [playing, setPlaying] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggle = (i: number) => {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'none'
      a.addEventListener('ended', () => setPlaying(null))
      audioRef.current = a
    }
    const a = audioRef.current
    if (playing === i) {
      a.pause()
      setPlaying(null)
      return
    }
    const url = topSongs[i].preview
    if (!url) return
    if (a.src !== url) a.src = url
    a.play()
      .then(() => setPlaying(i))
      .catch((e: unknown) => {
        if ((e as { name?: string })?.name !== 'AbortError') setPlaying(null)
      })
  }

  return (
    <section id="sucessos" className="bg-white py-20 sm:py-28">
      <div className="container-pp">
        <Reveal>
          <p className="eyebrow">Músicas</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] text-ink">
            Os hits nas plataformas
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Os maiores sucessos do Paulo Pires como artista — somando mais de 950 milhões de streams.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topSongs.map((song, i) => {
            const isPlaying = playing === i
            return (
              <Reveal key={song.title} delay={(i % 3) * 0.06}>
                <div className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-3 transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)]">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-label={isPlaying ? `Pausar ${song.title}` : `Tocar ${song.title}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                  >
                    <img src={song.cover} alt={`Capa de ${song.title}`} loading="lazy" className="h-full w-full object-cover" />
                    <span
                      className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                        isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white">
                        {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 translate-x-[1px] fill-current" />}
                      </span>
                    </span>
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-heading text-base font-bold text-ink">{song.title}</h3>
                      {song.badge && (
                        <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          {song.badge}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted">{song.credit}</p>
                    <p className="mt-1 font-heading text-sm font-bold text-gold">{song.streams} <span className="font-medium text-muted">streams</span></p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Player do Spotify */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
            <iframe
              title="Paulo Pires no Spotify"
              src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              loading="lazy"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 text-center">
          <a href={socials.spotify} target="_blank" rel="noreferrer" className="btn-ghost">
            <SpotifyIcon className="h-4 w-4" />
            Seguir no Spotify
          </a>
        </Reveal>
      </div>
    </section>
  )
}
