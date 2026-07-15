import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeading from './ui/SectionHeading'
import Coverflow, { type CoverItem } from './ui/Coverflow'
import PlayerBar from './ui/PlayerBar'
import FlowingLines from './ui/FlowingLines'
import { compositions, socials } from '../data/site'

export default function Compositions() {
  const len = compositions.length
  const [active, setActive] = useState(Math.floor(len / 2))
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [paused, setPaused] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const covers: CoverItem[] = useMemo(
    () =>
      compositions.map((c) => ({
        title: c.song,
        subtitle: c.artist,
        cover: c.cover,
      })),
    [],
  )

  // Espelhos do estado para os ouvintes de áudio: eles são registrados uma vez
  // só e, sem isto, enxergariam os valores do render em que nasceram.
  const mutedRef = useRef(muted)
  const activeRef = useRef(active)
  // "O usuário quer ouvir": decidido no próprio toque. É um ref, e não estado,
  // porque `isPlaying` chega atrasado (depende da promessa do play() resolver)
  // e não serve para decidir, no gesto, se a próxima faixa deve tocar.
  const wantsPlayRef = useRef(false)
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
    const url = compositions[i]?.preview
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
      .catch((err: unknown) => {
        // Trocar de faixa cancela o play() da faixa anterior, que rejeita com
        // AbortError. Isso é esperado e NÃO quer dizer que a música parou —
        // tratá-lo como falha derrubava `isPlaying` e fazia o toque seguinte
        // ser ignorado (dava "uma música sim, uma não" em rede lenta).
        if ((err as { name?: string })?.name === 'AbortError') return
        wantsPlayRef.current = false
        setIsPlaying(false)
      })
  }

  /** Muda o foco e, se o usuário estiver ouvindo, emenda a faixa no gesto. */
  const goTo = (i: number) => {
    setActive(i)
    if (wantsPlayRef.current) playIndex(i)
  }

  const togglePlay = () => {
    const a = getAudio()
    if (wantsPlayRef.current) {
      wantsPlayRef.current = false
      a.pause()
      setIsPlaying(false)
    } else {
      wantsPlayRef.current = true
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
        wantsPlayRef.current = false
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
      if (wantsPlayRef.current) playIndex(nxt)
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
          // No toque não existe enter/leave: sem isto o carrossel seguiria
          // girando sozinho e trocaria a faixa debaixo do dedo do visitante.
          // Assim que ele assume o controle, o giro automático não volta.
          onPointerDown={() => setPaused(true)}
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
