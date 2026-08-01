import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Agenda from './components/Agenda'
import TopSongs from './components/TopSongs'
import VideoShowcase from './components/VideoShowcase'
import Biography from './components/Biography'
import Compositions from './components/Compositions'
import ParallaxFeed from './components/ParallaxFeed'
import Audience from './components/Audience'
import Media from './components/Media'
import Booking from './components/Booking'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import SmoothScroll from './components/ui/SmoothScroll'
import Intro from './components/ui/Intro'
import ScrollProgress from './components/ui/ScrollProgress'
import Marquee from './components/ui/Marquee'

const marqueeArtists = [
  'Gusttavo Lima',
  'Marília Mendonça',
  'Maiara & Maraisa',
  'Ana Castela',
  'Luan Santana',
  'Henrique & Juliano',
  'João Neto & Frederico',
  'Bruno & Marrone',
  'Mano Walter',
  'Zé Neto & Cristiano',
]

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <SmoothScroll>
        <Intro />
        <ScrollProgress />
        <div className="relative min-h-screen bg-white">
          <Header />
          <main>
            <Hero />

            {/* Faixa de artistas que gravam composições dele (prova social) */}
            <div className="border-y border-ink/10 bg-white py-6">
              <p className="container-pp mb-4 text-center font-heading text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Compõe para os maiores do Brasil
              </p>
              <Marquee items={marqueeArtists} />
            </div>

            {/* Agenda de Shows — prioridade do sertanejo */}
            <Agenda />

            {/* As Mais Ouvidas */}
            <TopSongs />

            {/* Vídeo de produção — cresce/revela ao rolar */}
            <VideoShowcase />

            {/* Biografia */}
            <Biography />

            {/* Composições */}
            <Compositions />

            {/* Fotos */}
            <ParallaxFeed />

            {/* Público */}
            <Audience />

            {/* Na Mídia */}
            <Media />

            {/* Contato */}
            <Booking />
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </MotionConfig>
  )
}
