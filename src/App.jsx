import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Business from './components/Business'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import CV from './components/CV'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#050d1f] text-white overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Business />
        <Projects />
        <Gallery />
        <CV />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
