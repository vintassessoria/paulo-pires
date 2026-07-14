import Reveal3D from './Reveal3D'
import RevealText from './RevealText'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: Props) {
  const isCenter = align === 'center'
  return (
    <Reveal3D
      className={`${isCenter ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
      )}
      <RevealText
        text={title}
        as="h2"
        className="block text-balance font-display text-[clamp(2.05rem,4.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white text-shadow-warm"
      />
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/85 text-shadow-warm sm:text-lg">
          {description}
        </p>
      )}
    </Reveal3D>
  )
}
