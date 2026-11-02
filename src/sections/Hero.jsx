import { motion } from 'framer-motion'
import { profile } from '../data/content.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import InteractiveName from '../components/InteractiveName.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import './Hero.css'

export default function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { type: 'spring', stiffness: 120, damping: 20, mass: 0.7, delay },
        }

  return (
    <section className="hero dot-grid" aria-labelledby="hero-name">
      <div className="hero__inner">
        <div className="hero__copy">
          <motion.p className="eyebrow hero__eyebrow" {...rise(0)}>
            {profile.heroEyebrow}
          </motion.p>

          <motion.div id="hero-name" className="hero__name" {...rise(0.06)}>
            <InteractiveName text={profile.name} />
          </motion.div>

          <motion.h1 className="hero__headline" {...rise(0.12)}>
            {profile.heroHeadline}
          </motion.h1>

          <motion.p className="hero__subline" {...rise(0.18)}>
            {profile.heroSubline}
          </motion.p>

          <motion.p className="hero__tagline" {...rise(0.24)}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__ctas" {...rise(0.3)}>
            <MagneticButton href="#work" className="btn btn--primary">
              View my work
            </MagneticButton>
            <MagneticButton href={profile.resumePath} download className="btn btn--ghost">
              Download CV
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              })}
        >
          <span className="hero__portrait-glow" aria-hidden="true" />
          <img src="/assets/hero-portrait.png" alt="Aniket Sahran" />
        </motion.div>
      </div>

      <div className="hero__hint" aria-hidden="true">
        <span className="hero__hint-dot" /> move your cursor across my name
      </div>
    </section>
  )
}
