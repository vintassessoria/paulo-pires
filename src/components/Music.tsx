import { useRef, useState } from 'react'
import { Music as MusicIcon, Play, Pause } from 'lucide-react'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import CardReveal from './ui/CardReveal'
import Tilt from './ui/Tilt'
import { topSongs, socials, spotifyArtistId } from '../data/site'
import { SpotifyIcon, YoutubeIcon } from './icons/BrandIcons'

/**
 * Músicas — os hits do Paulo como artista (com prévia de 30s), o player do
 * Spotify e os links para ouvir nas plataformas. Cabeçalho centralizado.
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
    <Section
      id="sucessos"
      icon={MusicIcon}
      title="Músicas"
      subtitle="Os maiores sucessos do Paulo Pires como artista — mais de 950 milhões de streams. Ouça nas plataformas."
      bg="dark"
      watermark="Paulo Pires"
    >
      <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {topSongs.map((song, i) => {
          const isPlaying = playing === i
          return (
            <CardReveal key={song.title} index={i} className="h-full">
              <Tilt className="h-full">
              <div className="card-dark group flex items-center gap-4 rounded-2xl p-3 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={isPlaying ? `Pausar ${song.title}` : `Tocar ${song.title}`}
                  className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl"
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
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-heading text-base font-bold text-white">{song.title}</h3>
                    {song.badge && (
                      <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        {song.badge}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-cream/55">{song.credit}</p>
                  <p className="mt-1 font-heading text-sm font-bold text-gold-light">
                    {song.streams} <span className="font-medium text-cream/50">streams</span>
                  </p>
                </div>
              </div>
              </Tilt>
            </CardReveal>
          )
        })}
      </div>

      {/* Player do Spotify */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10">
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

      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={socials.spotify} target="_blank" rel="noreferrer" className="btn-outline">
            <SpotifyIcon className="h-4 w-4" />
            Ouvir no Spotify
          </a>
          <a href={socials.youtube} target="_blank" rel="noreferrer" className="btn-outline">
            <YoutubeIcon className="h-4 w-4" />
            Ver no YouTube
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
