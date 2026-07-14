import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import MusicSection from './components/MusicSection'
import Biography from './components/Biography'
import Compositions from './components/Compositions'
import Agenda from './components/Agenda'
import Booking from './components/Booking'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import SmoothScroll from './components/ui/SmoothScroll'
import Intro from './components/ui/Intro'
import ScrollProgress from './components/ui/ScrollProgress'
import Marquee from './components/ui/Marquee'
import SectionFX from './components/ui/SectionFX'

const marqueeArtists = [
  'Marília Mendonça',
  'Gusttavo Lima',
  'Mano Walter',
  'Maiara & Maraisa',
  'Henrique & Juliano',
  'Simone & Simaria',
  'João Neto & Frederico',
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
          {/* seção SIM */}
          <div className="relative isolate">
            <SectionFX variant="washes" />
            <Stats />
          </div>
          {/* Faixa de artistas com leve inclinação 3D de "chão" */}
          <div className="border-y border-gold/10 bg-coal/60 py-7 [perspective:700px]">
            <div className="[transform:rotateX(7deg)]">
              <Marquee items={marqueeArtists} />
            </div>
          </div>
          {/* seção não */}
          <MusicSection />
          {/* seção SIM */}
          <div className="relative isolate">
            <SectionFX variant="orbs" />
            <Biography />
          </div>
          {/* seção não */}
          <Compositions />
          {/* seção SIM */}
          <div className="relative isolate">
            <SectionFX variant="aurora" />
            <Agenda />
          </div>
          {/* seção SIM */}
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
