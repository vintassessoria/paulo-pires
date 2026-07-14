import { useState } from 'react'
import { Camera, Disc3 } from 'lucide-react'

type Props = {
  src?: string
  alt: string
  label?: string
  className?: string
  imgClassName?: string
  /** Modo enxuto (usado em capas pequenas do coverflow). */
  compact?: boolean
  /** Carrega imediatamente (use na foto principal, acima da dobra). */
  priority?: boolean
}

/**
 * Imagem do artista com placeholder elegante.
 * Enquanto as fotos profissionais não são adicionadas em /public/images,
 * mostra uma área preparada (gradiente + textura) com a etiqueta indicada.
 * Basta colocar o arquivo no caminho `src` para a foto aparecer.
 */
export default function ArtistImage({
  src,
  alt,
  label = 'Foto oficial',
  className = '',
  imgClassName = '',
  compact = false,
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(!src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#2a2521_0%,#14110e_60%,#0b0a08_100%)]"
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />
          {compact ? (
            <div className="relative flex flex-col items-center gap-3 px-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <Disc3 className="h-5 w-5" />
              </span>
              <span className="font-heading text-sm font-semibold leading-tight text-cream">
                {label}
              </span>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="font-display text-[18vw] leading-none text-white/[0.05] lg:text-[7vw]">
                Paulo Pires
              </span>
              <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest2 text-white/35">
                <Camera className="h-3.5 w-3.5" />
                {label}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
