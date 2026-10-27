import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
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
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.round(v * (n - 1))))

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
          <h2 className="section-title xp__title">Where I&apos;ve been building.</h2>
        </div>

        {/* top bar: static full-width rail with dots that scroll with the text,
            each dot aligned above its role's column */}
        <div className="xp__bar" aria-hidden="true">
          <span className="xp__bar-rail" />
          <motion.div className="xp__bar-track" style={{ x }}>
            {chrono.map((role, i) => (
              <div className="xp__bar-cell" key={`${role.company}-${role.role}`}>
                <div className="container">
                  <span className={`xp__step ${i === active ? 'is-active' : ''}`}>
                    <span className="xp__step-dot" />
                    <span className="xp__step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="xp__step-role">{role.role}</span>
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
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
