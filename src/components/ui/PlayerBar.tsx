import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Quote,
  ListMusic,
  Volume2,
  VolumeX,
  AudioLines,
} from 'lucide-react'
import type { CoverItem } from './Coverflow'

type Props = {
  items: CoverItem[]
  active: number
  isPlaying: boolean
  muted?: boolean
  onPrev: () => void
  onNext: () => void
  onTogglePlay: () => void
  onToggleMute?: () => void
  spotifyUrl: string
}

function RoundBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  )
}

/**
 * Barra de player de vidro fosco, recriando o controle da referência.
 * Os botões anterior/próxima controlam o coverflow; "tocar" anima o
 * equalizador. O bloco "tocando agora" abre o perfil do Spotify.
 */
export default function PlayerBar({
  items,
  active,
  isPlaying,
  muted = false,
  onPrev,
  onNext,
  onTogglePlay,
  onToggleMute,
  spotifyUrl,
}: Props) {
  const cur = items[active]

  return (
    <div className="glass-deep mx-auto flex w-full max-w-2xl items-center gap-1.5 rounded-full p-2 sm:gap-3 sm:p-2.5">
      {/* Controles de transporte */}
      <div className="flex items-center gap-0.5 pl-1 sm:gap-1">
        <RoundBtn label="Faixa anterior" onClick={onPrev}>
          <SkipBack className="h-5 w-5 fill-current" />
        </RoundBtn>
        <button
          type="button"
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
          aria-pressed={isPlaying}
          onClick={onTogglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-warm-900 shadow-[0_8px_22px_-6px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5 fill-current" />
          )}
        </button>
        <RoundBtn label="Próxima faixa" onClick={onNext}>
          <SkipForward className="h-5 w-5 fill-current" />
        </RoundBtn>
      </div>

      {/* Tocando agora */}
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex min-w-0 flex-1 items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-white/5"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gold-grad">
          {cur.cover && (
            <img
              src={cur.cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          )}
          <span className="flex items-end gap-[2px]" aria-hidden="true">
            {[0, 1, 2, 3].map((b) => (
              <span
                key={b}
                className={`relative w-[3px] origin-bottom rounded-full bg-cream shadow-[0_0_5px_rgba(0,0,0,0.85)] ${
                  isPlaying ? 'animate-equalize' : ''
                }`}
                style={{
                  height: isPlaying ? '14px' : '6px',
                  animationDelay: `${b * 0.15}s`,
                }}
              />
            ))}
          </span>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white">{cur.title}</span>
          <span className="block truncate text-xs text-white/60">{cur.subtitle}</span>
        </span>
      </a>

      {/* Ícones auxiliares (estética da referência) */}
      <div className="hidden items-center gap-0.5 pr-1 sm:flex">
        <RoundBtn label="Visualizador">
          <AudioLines className="h-[18px] w-[18px]" />
        </RoundBtn>
        <RoundBtn label="Letras">
          <Quote className="h-[18px] w-[18px]" />
        </RoundBtn>
        <RoundBtn label="Fila">
          <ListMusic className="h-[18px] w-[18px]" />
        </RoundBtn>
        <RoundBtn label={muted ? 'Ativar som' : 'Silenciar'} onClick={onToggleMute}>
          {muted ? (
            <VolumeX className="h-[18px] w-[18px]" />
          ) : (
            <Volume2 className="h-[18px] w-[18px]" />
          )}
        </RoundBtn>
      </div>
    </div>
  )
}
