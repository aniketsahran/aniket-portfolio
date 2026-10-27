import { skills } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Toolbox
        </Reveal>
        <Reveal as="h2" className="section-title">
          What I reach for.
        </Reveal>

        <div className="skills__grid">
          {skills.map((group, i) => (
            <Reveal className="skills__group" delay={i * 0.05} key={group.group}>
              <h3 className="skills__label">{group.group}</h3>
              <ul className="skills__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
