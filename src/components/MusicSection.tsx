import { ExternalLink, Disc3, Music4 } from 'lucide-react'
import Reveal from './ui/Reveal'
import RevealText from './ui/RevealText'
import Card3D from './ui/Card3D'
import FlowingLines from './ui/FlowingLines'
import { SpotifyIcon, YoutubeIcon } from './icons/BrandIcons'
import { socials, spotifyArtistId } from '../data/site'

export default function MusicSection() {
  return (
    <section id="musicas" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      {/* Linhas fluidas atrás do player (esquerda) */}
      <FlowingLines className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full w-1/3 opacity-40 lg:block" />

      <div className="container-pp relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Player (esquerda no desktop; abaixo do texto no mobile) */}
        <Reveal className="order-2 lg:order-1">
          <div className="card-dark relative overflow-hidden rounded-3xl p-2 sm:p-3">
            <div className="absolute inset-x-0 top-0 h-px hairline-gold" />
            <div className="overflow-hidden rounded-2xl">
              <iframe
                title="Paulo Pires no Spotify"
                src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
                width="100%"
                height="420"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block w-full"
              />
            </div>
          </div>
        </Reveal>

        {/* Texto + plataformas (direita no desktop; primeiro no mobile) */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Plataformas</span>
            </div>
            <RevealText
              text="Ouça Paulo Pires"
              as="h2"
              className="block text-balance font-display text-[clamp(2.05rem,4.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white text-shadow-warm"
            />
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 text-shadow-warm">
              Conheça as músicas que levam a identidade, a voz e a composição de Paulo Pires
              para milhões de ouvintes.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            <a href={socials.spotify} target="_blank" rel="noreferrer" className="block">
              <Card3D
                delay={0.05}
                max={7}
                className="card-dark flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-gold/40"
              >
                <span className="depth-sm flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1DB954]/15 text-[#1DB954]">
                  <SpotifyIcon className="h-7 w-7" />
                </span>
                <div className="depth-sm min-w-0 flex-1">
                  <p className="font-heading font-semibold text-cream">Ouça no Spotify</p>
                  <p className="text-sm text-muted">Perfil oficial · 2 mi de ouvintes mensais</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted transition-colors group-hover/c3d:text-gold" />
              </Card3D>
            </a>

            <a href={socials.youtube} target="_blank" rel="noreferrer" className="block">
              <Card3D
                delay={0.1}
                max={7}
                className="card-dark flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-gold/40"
              >
                <span className="depth-sm flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FF0000]/15 text-[#FF4D4D]">
                  <YoutubeIcon className="h-7 w-7" />
                </span>
                <div className="depth-sm min-w-0 flex-1">
                  <p className="font-heading font-semibold text-cream">Assista no YouTube</p>
                  <p className="text-sm text-muted">Clipes e vídeos oficiais</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted transition-colors group-hover/c3d:text-gold" />
              </Card3D>
            </a>

            {/* Ao Vivo em Goiás */}
            <Card3D delay={0.15} max={6} className="card-dark rounded-xl p-6">
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]" />
              <div className="depth-sm relative">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/40 px-3 py-1">
                  <Disc3 className="h-3.5 w-3.5 animate-spin text-gold" style={{ animationDuration: '6s' }} />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-widest2 text-gold">
                    Projeto em destaque
                  </span>
                </div>
                <h3 className="font-display text-[1.6rem] font-semibold tracking-[-0.01em] text-cream">
                  Ao Vivo em Goiás
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A energia do palco e o repertório que conecta o público, gravados na terra
                  natal do artista.
                </p>
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  <Music4 className="h-4 w-4" />
                  Conferir
                </a>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  )
}
