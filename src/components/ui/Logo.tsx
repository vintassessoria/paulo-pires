import { useState } from 'react'

type Props = {
  className?: string
  withTagline?: boolean
}

/**
 * Marca de Paulo Pires.
 * Por padrão usa o wordmark tipográfico (premium, estilo pôster).
 * Para usar o logotipo oficial, coloque o arquivo em
 * `/public/images/logo.png` (ou .svg) que ele será exibido no lugar.
 */
export default function Logo({ className = '', withTagline = true }: Props) {
  const [useImage, setUseImage] = useState(true)

  if (useImage) {
    return (
      <img
        src="/images/logo.png"
        alt="Paulo Pires"
        className={`h-6 w-auto invert sm:h-7 ${className}`}
        onError={() => setUseImage(false)}
      />
    )
  }

  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.5rem] font-semibold tracking-[-0.01em] text-cream sm:text-[1.7rem]">
        Paulo <span className="italic font-normal text-gold-grad">Pires</span>
      </span>
      {withTagline && (
        <span className="font-heading text-[0.55rem] font-medium uppercase tracking-widest2 text-muted">
          Cantor • Compositor
        </span>
      )}
    </div>
  )
}
