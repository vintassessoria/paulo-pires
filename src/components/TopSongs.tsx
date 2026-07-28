import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Counter from './ui/Counter'
import CoverStack from './ui/CoverStack'
import FlowingLines from './ui/FlowingLines'
import { topSongs, socials } from '../data/site'
import { SpotifyIcon } from './icons/BrandIcons'

/**
 * As Mais Ouvidas — os hits do Paulo como ARTISTA (mídia kit 2026).
 * Apresentado como uma pilha de capas (arraste ou clique para avançar); a
 * carta do topo toca a prévia de 30s. Só um player do site toca por vez,
 * coordenado por `pp:audio`.
 */
export default function TopSongs() {
  const len = topSongs.length
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wantRef = useRef(false)
  const activeRef = useRef(0)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'none'
      audioRef.current = a
      a.addEventListener('ended', () => {
        // Ao acabar, avança e emenda a próxima (o gesto já liberou o áudio)
        const nxt = (activeRef.current + 1) % len
        setActive(nxt)
        if (wantRef.current) play(nxt)
      })
    }
    return audioRef.current
  }

  const play = (i: number) => {
    const url = topSongs[i].preview
    const a = getAudio()
    if (!url) return
    if (a.src !== url) a.src = url
    a.play()
      .then(() => {
        setIsPlaying(true)
        window.dispatchEvent(new CustomEvent('pp:audio', { detail: 'topsongs' }))
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        wantRef.current = false
        setIsPlaying(false)
      })
  }

  const togglePlay = () => {
    const a = getAudio()
    if (wantRef.current) {
      wantRef.current = false
      a.pause()
      setIsPlaying(false)
    } else {
      wantRef.current = true
      play(active)
    }
  }

  const go = (i: number) => {
    setActive(i)
    if (wantRef.current) play(i)
  }
  const next = () => go((active + 1) % len)
  const prev = () => go((active - 1 + len) % len)

  // Se outro player do site tocar, este pausa
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'topsongs' && audioRef.current) {
        wantRef.current = false
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
    window.addEventListener('pp:audio', onOther)
    return () => window.removeEventListener('pp:audio', onOther)
  }, [])

  useEffect(() => () => audioRef.current?.pause(), [])

  const song = topSongs[active]

  return (
    <section id="sucessos" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gold" />
      <FlowingLines className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="As Mais Ouvidas"
          title="Os hits nas plataformas"
          description="Os maiores sucessos do Paulo Pires como artista, somando streams em todas as plataformas. Arraste as capas e dê o play."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Pilha de capas */}
          <div className="order-1 flex justify-center">
            <CoverStack
              items={topSongs}
              active={active}
              onNext={next}
              onPrev={prev}
              className="aspect-square w-[min(78vw,22rem)]"
            />
          </div>

          {/* Detalhes da faixa do topo */}
          <div className="order-2 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                {song.badge && (
                  <span className="mb-3 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-gold-light">
                    {song.badge}
                  </span>
                )}
                <h3 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight text-white">
                  {song.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{song.credit}</p>
                <div className="mt-4 flex items-baseline justify-center gap-2 lg:justify-start">
                  <Counter
                    value={song.streams}
                    className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold text-gold-grad [font-variant-numeric:tabular-nums]"
                  />
                  <span className="text-sm uppercase tracking-wide text-white/40">de streams</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="mt-7 flex items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-cream"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar' : 'Tocar'}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-[0_12px_30px_-8px_rgba(229,16,46,0.7)] transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="h-5 w-5 translate-x-[1px] fill-current" />
                )}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próxima"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-cream"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Indicadores */}
            <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
              {topSongs.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para ${s.title}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <a href={socials.spotify} target="_blank" rel="noreferrer" className="btn-ghost">
                <SpotifyIcon className="h-4 w-4" />
                Ouvir no Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
