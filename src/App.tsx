import Header from './components/Header'
import Hero from './components/Hero'
import Agenda from './components/Agenda'
import About from './components/About'
import Songwriter from './components/Songwriter'
import Music from './components/Music'
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
        <About />
        <Songwriter />
        <Music />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
