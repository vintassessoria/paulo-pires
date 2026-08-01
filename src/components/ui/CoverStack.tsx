import { motion } from 'framer-motion'

export type StackItem = { cover: string; title: string }

type Props = {
  items: StackItem[]
  active: number
  onNext: () => void
  onPrev: () => void
  className?: string
}

// Giro leve alternado por camada, como uma pilha "bagunçada" (igual ao stack
// do mídia kit / Framer). Índice 0 = carta do topo.
const rotations = [-3, 4, -2.5, 3, -2]

/**
 * Pilha de capas estilo "deck": as cartas ficam empilhadas com leve rotação;
 * a de cima pode ser arrastada (ou clicada) para avançar. Arrastar para a
 * esquerda = próxima; para a direita = anterior. Reproduz, com framer-motion,
 * o Gallery Stack do Framer — sem depender do runtime dele.
 */
export default function CoverStack({ items, active, onNext, onPrev, className = '' }: Props) {
  const len = items.length

  return (
    <div className={`relative select-none ${className}`}>
      {items.map((item, i) => {
        // Posição na pilha a partir do topo (0 = topo)
        const offset = (i - active + len) % len
        const visible = offset <= 4
        const isTop = offset === 0
        const rot = rotations[offset % rotations.length]

        return (
          <motion.div
            key={item.title}
            className="absolute inset-0"
            style={{ zIndex: len - offset, cursor: isTop ? 'grab' : 'default' }}
            initial={false}
            animate={{
              y: offset * 14,
              scale: 1 - offset * 0.05,
              rotate: isTop ? 0 : rot,
              opacity: visible ? (offset === 0 ? 1 : Math.max(0.35, 1 - offset * 0.18)) : 0,
              filter: `brightness(${offset === 0 ? 1 : 0.7})`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            drag={isTop ? 'x' : false}
            dragSnapToOrigin
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            whileDrag={{ cursor: 'grabbing', scale: 1.03 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -450) onNext()
              else if (info.offset.x > 80 || info.velocity.x > 450) onPrev()
            }}
            onClick={() => {
              if (isTop) onNext()
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ink/12 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={item.cover}
                alt={`Capa de ${item.title}`}
                draggable={false}
                loading={offset <= 1 ? 'eager' : 'lazy'}
                className="pointer-events-none h-full w-full object-cover"
              />
              {/* Escurece as cartas de baixo para dar profundidade */}
              {!isTop && <div className="absolute inset-0 bg-ink/40" />}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-ink/10" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
