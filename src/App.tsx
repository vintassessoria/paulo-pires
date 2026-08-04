import Header from './components/Header'
import Hero from './components/Hero'
import Agenda from './components/Agenda'
import About from './components/About'
import Songwriter from './components/Songwriter'
import Gallery from './components/Gallery'
import Music from './components/Music'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="relative min-h-screen bg-coal">
      {/* Foto do Paulo sutil, fixa, atrás de todas as seções */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/images/paulo-single.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>
      <Header />
      <main>
        <Hero />
        <Agenda />
        <About />
        <Songwriter />
        <Gallery />
        <Music />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
