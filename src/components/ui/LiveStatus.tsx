import { useEffect, useState } from 'react'

/**
 * Indicador de disponibilidade com relógio ao vivo (estilo Porto) — localização
 * + hora local de Goiânia (fuso de Brasília) + status de agenda. Além de
 * elegante, comunica ao contratante que o artista está disponível.
 */
export default function LiveStatus({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-heading text-[11px] font-medium uppercase tracking-widest2 text-white/55 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span>Goiânia, BR</span>
      <span className="text-white/25">·</span>
      <span className="tabular-nums text-cream/80">{time || '--:--'}</span>
      <span className="text-white/25">·</span>
      <span className="text-gold">Agenda 2026 aberta</span>
    </div>
  )
}
