import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Experience from '../sections/Experience.jsx'
import Projects from '../sections/Projects.jsx'
import ToolGrid from '../sections/ToolGrid.jsx'
import BeyondCode from '../sections/BeyondCode.jsx'
import Contact from '../sections/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ToolGrid />
      <BeyondCode />
      <Contact />
      <Footer />
    </main>
  )
}
