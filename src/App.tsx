import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import TopSongs from './components/TopSongs'
import Biography from './components/Biography'
import Audience from './components/Audience'
import Media from './components/Media'
import Compositions from './components/Compositions'
import Booking from './components/Booking'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import SmoothScroll from './components/ui/SmoothScroll'
import Intro from './components/ui/Intro'
import ScrollProgress from './components/ui/ScrollProgress'
import Marquee from './components/ui/Marquee'
import SectionFX from './components/ui/SectionFX'

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
        <div className="relative min-h-screen">
          <Header />
          <main>
            <Hero />

            {/* Faixa de artistas com leve inclinação 3D de "chão" */}
            <div className="border-y border-gold/10 bg-coal/60 py-7 [perspective:700px]">
              <div className="[transform:rotateX(7deg)]">
                <Marquee items={marqueeArtists} />
              </div>
            </div>

            {/* As Mais Ouvidas */}
            <div className="relative isolate">
              <SectionFX variant="washes" />
              <TopSongs />
            </div>

            {/* Biografia */}
            <div className="relative isolate">
              <SectionFX variant="orbs" />
              <Biography />
            </div>

            {/* Público */}
            <div className="relative isolate">
              <SectionFX variant="aurora" />
              <Audience />
            </div>

            {/* Na Mídia */}
            <Media />

            {/* Composições */}
            <Compositions />

            {/* Contato */}
            <div className="relative isolate">
              <SectionFX variant="beam" />
              <Booking />
            </div>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </MotionConfig>
  )
}
