import { motion } from 'framer-motion'
import { profile } from '../data/content.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './Hero.css'

export default function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        }

  return (
    <section className="hero" aria-labelledby="hero-headline">
      <div className="hero__inner container">
        <div className="hero__copy">
          <motion.p className="eyebrow hero__eyebrow" {...rise(0)}>
            {profile.heroEyebrow}
          </motion.p>

          <motion.h1 id="hero-headline" className="hero__headline" {...rise(0.08)}>
            {profile.heroHeadline}
          </motion.h1>

          <motion.p className="hero__subline" {...rise(0.16)}>
            {profile.heroSubline}
          </motion.p>

          <motion.p className="hero__tagline" {...rise(0.24)}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__ctas" {...rise(0.32)}>
            <a className="btn btn--primary" href="#work">
              View my work
            </a>
            <a className="btn btn--ghost" href={profile.resumePath} download>
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
              })}
        >
          <img src="/assets/portrait.jpg" alt="Aniket Sahran" width="1010" height="1010" />
          <span className="hero__portrait-ring" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
