import { experience } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="xp section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Experience
        </Reveal>
        <Reveal as="h2" className="section-title">
          Where I&apos;ve been building.
        </Reveal>

        <div className="xp__timeline">
          {experience.map((role, i) => (
            <Reveal className="xp__node" delay={i * 0.06} key={`${role.company}-${role.role}`}>
              <span className="xp__dot" aria-hidden="true" />
              <div className="xp__head">
                <h3 className="xp__role">{role.role}</h3>
                <p className="xp__company">{role.company}</p>
                <p className="xp__meta">
                  <span>{role.period}</span>
                  <span className="xp__sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{role.location}</span>
                </p>
              </div>
              <ul className="xp__bullets">
                {role.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
