import { motion } from 'framer-motion'
import type { ElementType } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  as?: ElementType
}

/**
 * Revela um texto palavra por palavra (fade + leve subida).
 * Sem máscaras de recorte e com gatilho de viewport folgado —
 * o texto nunca fica preso invisível.
 */
export default function RevealText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  once = true,
  as: Tag = 'span',
}: Props) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: '0.45em' }}
          whileInView={{ opacity: 1, y: '0em' }}
          viewport={{ once, amount: 0.1, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
