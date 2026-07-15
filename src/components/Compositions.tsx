import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeading from './ui/SectionHeading'
import Coverflow, { type CoverItem } from './ui/Coverflow'
import PlayerBar from './ui/PlayerBar'
import FlowingLines from './ui/FlowingLines'
import { compositions, socials } from '../data/site'

/** Prévia de 30s + capa real, buscadas na API pública do iTunes. */
type Track = { previewUrl?: string; artwork?: string }

export default function Compositions() {
  const len = compositions.length
  const [active, setActive] = useState(Math.floor(len / 2))
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [tracks, setTracks] = useState<Track[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Busca prévias e capas reais (API pública, sem chave)
  useEffect(() => {
    let alive = true
    Promise.all(
      compositions.map(async (c): Promise<Track> => {
        try {
          const term = encodeURIComponent(`${c.song} ${c.artist.split(',')[0]}`)
          const res = await fetch(
            `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1&country=BR`,
          )
          const data = await res.json()
          const r = data.results?.[0]
          return r
            ? {
                previewUrl: r.previewUrl as string | undefined,
                artwork: typeof r.artworkUrl100 === 'string'
                  ? r.artworkUrl100.replace('100x100', '600x600')
                  : undefined,
              }
            : {}
        } catch {
          return {}
        }
      }),
    ).then((t) => {
      if (alive) setTracks(t)
    })
    return () => {
      alive = false
    }
  }, [])

  const covers: CoverItem[] = useMemo(
    () =>
      compositions.map((c, i) => ({
        title: c.song,
        subtitle: c.artist,
        cover: tracks[i]?.artwork ?? c.cover,
      })),
    [tracks],
  )

  // Espelhos do estado para os ouvintes de áudio: eles são registrados uma vez
  // só e, sem isto, enxergariam os valores do render em que nasceram.
  const tracksRef = useRef<Track[]>([])
  const mutedRef = useRef(muted)
  const activeRef = useRef(active)
  useEffect(() => {
    tracksRef.current = tracks
  }, [tracks])
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])
  useEffect(() => {
    activeRef.current = active
  }, [active])

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'none'
      audioRef.current = a
    }
    return audioRef.current
  }

  /**
   * Toca a faixa `i`.
   *
   * IMPORTANTE: precisa ser chamada DENTRO da pilha do toque do usuário. O
   * Safari do iOS só libera o áudio quando play() parte do próprio gesto —
   * de um efeito ou timer disparado depois, ele recusa com NotAllowedError.
   * Por isso os controles chamam esta função direto, em vez de reagir à
   * troca de `active` por um useEffect (que roda só após a renderização).
   */
  const playIndex = (i: number) => {
    const url = tracksRef.current[i]?.previewUrl
    const a = getAudio()
    if (!url) {
      a.pause()
      setIsPlaying(false)
      return
    }
    if (a.src !== url) a.src = url
    a.muted = mutedRef.current
    a.play()
      .then(() => {
        setIsPlaying(true)
        // Avisa os demais players do site (ex.: trilha sonora) para pausarem
        window.dispatchEvent(new CustomEvent('pp:audio', { detail: 'compositions' }))
      })
      .catch(() => setIsPlaying(false))
  }

  /** Muda o foco e, se já estiver tocando, emenda o áudio no mesmo gesto. */
  const goTo = (i: number) => {
    setActive(i)
    if (isPlaying) playIndex(i)
  }

  const togglePlay = () => {
    const a = getAudio()
    if (isPlaying) {
      a.pause()
      setIsPlaying(false)
    } else {
      playIndex(active)
    }
  }

  const toggleMute = () => {
    setMuted((m) => {
      const nm = !m
      if (audioRef.current) audioRef.current.muted = nm
      return nm
    })
  }

  const prev = () => goTo((active - 1 + len) % len)
  const next = () => goTo((active + 1) % len)

  // Se a trilha do site começar a tocar, este player pausa
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'compositions' && audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
    window.addEventListener('pp:audio', onOther)
    return () => window.removeEventListener('pp:audio', onOther)
  }, [])

  // Fim da prévia → avança e emenda a próxima. Aqui o iOS permite, porque o
  // elemento de áudio já foi liberado pelo toque que iniciou a reprodução.
  useEffect(() => {
    const a = getAudio()
    const onEnded = () => {
      const nxt = (activeRef.current + 1) % len
      setActive(nxt)
      playIndex(nxt)
    }
    a.addEventListener('ended', onEnded)
    return () => {
      a.removeEventListener('ended', onEnded)
      a.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len])

  // Giro automático do coverflow — pausa no hover e enquanto a música toca
  useEffect(() => {
    if (paused || isPlaying) return
    const id = setInterval(() => setActive((a) => (a + 1) % len), 5200)
    return () => clearInterval(id)
  }, [paused, isPlaying, len])

  return (
    <section id="composicoes" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <FlowingLines className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-1/3 opacity-30 lg:block" />
      <div className="container-pp relative z-10">
        <SectionHeading
          eyebrow="Composições"
          title="Hits que levam sua assinatura"
          description="Além de cantor, Paulo Pires é compositor de grandes sucessos gravados por alguns dos maiores nomes da música brasileira. Dê o play e ouça uma prévia de cada um."
        />

        <div
          className="mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Coverflow items={covers} active={active} onActiveChange={goTo} />
          <div className="mt-14">
            <PlayerBar
              items={covers}
              active={active}
              isPlaying={isPlaying}
              muted={muted}
              onPrev={prev}
              onNext={next}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              spotifyUrl={socials.spotify}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
