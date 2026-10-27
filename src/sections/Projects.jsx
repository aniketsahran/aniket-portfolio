import { projects } from '../data/content.js'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import './Projects.css'

export default function Projects() {
  return (
    <section id="work" className="projects section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Selected Work
        </Reveal>
        <Reveal as="h2" className="section-title">
          Things I&apos;ve built, start to finish.
        </Reveal>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}
