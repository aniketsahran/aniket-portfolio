import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function ProjectCard({ project, index = 0 }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="project-card"
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '0px 0px -12% 0px' },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 },
            whileHover: { y: -6 },
          })}
    >
      <Link to={`/projects/${project.slug}`} className="project-card__link">
        <div className="project-card__body">
          <p className="project-card__kind">{project.kind}</p>
          <h3 className="project-card__name">{project.name}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <ul className="project-card__tech">
            {project.tech.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <span className="project-card__cta">
            View project <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
