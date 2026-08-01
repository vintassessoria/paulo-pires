import Header from './components/Header'
import Hero from './components/Hero'
import Agenda from './components/Agenda'
import Music from './components/Music'
import About from './components/About'
import Songwriter from './components/Songwriter'
import Video from './components/Video'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
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
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />

        {/* Prova social — artistas que gravam composições dele */}
        <div className="border-b border-ink/10 bg-white py-6">
          <p className="container-pp mb-4 text-center font-heading text-[11px] font-bold uppercase tracking-widest2 text-muted">
            Compõe para os maiores do Brasil
          </p>
          <Marquee items={marqueeArtists} />
        </div>

        <Agenda />
        <Music />
        <About />
        <Songwriter />
        <Video />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
