import { useState } from 'react'

type Props = {
  src: string
  alt: string
  /** Texto do placeholder enquanto o PNG não existe. */
  label: string
  className?: string
}

/**
 * Figura recortada (PNG com fundo transparente) que "sangra" no layout,
 * estilo da referência. Enquanto o arquivo não existir, mostra um
 * placeholder elegante com o monograma e o caminho esperado.
 */
export default function Cutout({ src, alt, label, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative flex h-full w-full items-end justify-center ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="pointer-events-none h-auto max-h-full w-auto object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
        />
      ) : (
        <div className="relative flex h-full min-h-[260px] w-full items-center justify-center">
          <span className="font-display text-[24vw] font-semibold leading-none text-white/[0.05] lg:text-[11vw]">
            PP
          </span>
          <span className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-widest2 text-white/30">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
