/**
 * Fundo de gradiente que se move sozinho — "brumas" quentes e
 * monocromáticas que derivam lentamente. Sutil de propósito (mantém o
 * clima sóbrio). Pausa com prefers-reduced-motion (regra global do CSS).
 *
 * Uso: colocar dentro de um container `relative` (atrás do conteúdo).
 */
export default function AnimatedGradient({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="animate-drift1 absolute -left-[15%] top-[-20%] h-[65vh] w-[65vh] rounded-full opacity-70 blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(126,42,38,0.5), transparent 62%)' }}
      />
      <div
        className="animate-drift2 absolute -right-[10%] bottom-[-15%] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(154,80,52,0.5), transparent 62%)' }}
      />
      <div
        className="animate-drift3 absolute left-[35%] top-[20%] h-[50vh] w-[50vh] rounded-full opacity-50 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(101,60,46,0.5), transparent 62%)' }}
      />
    </div>
  )
}
