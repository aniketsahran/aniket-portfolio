import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const reduced = useReducedMotion()

  if (!project) {
    return (
      <main className="pd pd--missing" id="top">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1 className="pd__title">Project not found.</h1>
          <p className="pd__lead">
            That project doesn&apos;t exist (or moved). Let&apos;s get you back.
          </p>
          <Link to="/" className="btn btn--primary">
            Back home
          </Link>
        </div>
      </main>
    )
  }

  const hasDemo = project.demoUrl && project.demoUrl !== '#'
  const hasRepo = project.repoUrl && project.repoUrl !== '#'

  return (
    <main className="pd" id="top">
      <article className="container">
        <Link to="/#work" className="pd__back">
          ← All projects
        </Link>

        <motion.header
          className="pd__head"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              })}
        >
          <p className="eyebrow">{project.kind}</p>
          <h1 className="pd__title">{project.name}</h1>
          <p className="pd__lead">{project.summary}</p>

          <div className="pd__links">
            {hasRepo && (
              <a className="btn btn--primary" href={project.repoUrl} target="_blank" rel="noreferrer">
                View repo
              </a>
            )}
            {!hasRepo && (
              <span className="pd__soon">Repository coming soon</span>
            )}
            {hasDemo && (
              <a className="btn btn--ghost" href={project.demoUrl} target="_blank" rel="noreferrer">
                Live demo
              </a>
            )}
          </div>

          <ul className="pd__tech">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </motion.header>

        <section className="pd__gallery" aria-label={`${project.name} screenshots`}>
          {project.images.map((src, i) => (
            <Reveal className="pd__shot" delay={i * 0.06} key={src}>
              <img src={src} alt={`${project.name} screenshot ${i + 1}`} loading="lazy" />
            </Reveal>
          ))}
        </section>

        <section className="pd__detail">
          <Reveal as="h2" className="pd__h2">
            What I built
          </Reveal>
          <ul className="pd__highlights">
            {project.highlights.map((h) => (
              <Reveal as="li" key={h}>
                {h}
              </Reveal>
            ))}
          </ul>
        </section>

        <Link to="/#work" className="pd__back pd__back--bottom">
          ← Back to all projects
        </Link>
      </article>
    </main>
  )
}
