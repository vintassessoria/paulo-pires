import Header from './components/Header'
import Hero from './components/Hero'
import Agenda from './components/Agenda'
import Music from './components/Music'
import About from './components/About'
import Songwriter from './components/Songwriter'
import Video from './components/Video'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="min-h-screen bg-coal">
      <Header />
      <main>
        <Hero />
        <Agenda />
        <Music />
        <About />
        <Songwriter />
        <Video />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
