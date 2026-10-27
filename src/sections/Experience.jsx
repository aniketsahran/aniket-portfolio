import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useIsSmallScreen from '../hooks/useIsSmallScreen.js'
import './Experience.css'

function RoleCard({ role }) {
  return (
    <div className="xp__card">
      <div className="xp__head">
        <h3 className="xp__role">{role.role}</h3>
        <p className="xp__company">{role.company}</p>
        <p className="xp__meta">
          <span>{role.period}</span>
          <span className="xp__sep" aria-hidden="true">·</span>
          <span>{role.location}</span>
        </p>
      </div>
      <ul className="xp__bullets">
        {role.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}

// Past → present for the left-to-right track.
const chrono = [...experience].reverse()

function VerticalFallback() {
  return (
    <section id="experience" className="xp section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Experience
        </Reveal>
        <Reveal as="h2" className="section-title">
          Where I&apos;ve been building.
        </Reveal>
        <div className="xp__stack">
          {experience.map((role) => (
            <Reveal className="xp__stack-item" key={`${role.company}-${role.role}`}>
              <RoleCard role={role} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Horizontal variant — isolated so its scroll hooks only run (and attach to the
// ref) when actually rendered, never in the fallback path.
function HorizontalExperience() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const n = chrono.length
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(n - 1) * 100}vw`])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="experience"
      className="xp xp--horizontal"
      ref={targetRef}
      style={{ height: `${n * 100}vh` }}
    >
      <div className="xp__sticky">
        <div className="xp__sticky-head container">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Where I&apos;ve been building.</h2>
          <div className="xp__progress" aria-hidden="true">
            <motion.span className="xp__progress-bar" style={{ width: progress }} />
          </div>
          <p className="xp__hint" aria-hidden="true">scroll ↓ to move →</p>
        </div>
        <motion.div className="xp__track" style={{ x }}>
          {chrono.map((role) => (
            <div className="xp__panel" key={`${role.company}-${role.role}`}>
              <div className="container">
                <RoleCard role={role} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Experience() {
  const reduced = useReducedMotion()
  const small = useIsSmallScreen()
  if (reduced || small) return <VerticalFallback />
  return <HorizontalExperience />
}
