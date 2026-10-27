import { about, achievements } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__inner">
        <div className="about__lead">
          <Reveal as="p" className="eyebrow">
            About
          </Reveal>
          <Reveal as="h2" className="section-title">
            Engineer, generalist, and work in progress.
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" className="about__para" delay={i * 0.05} key={i}>
              {p}
            </Reveal>
          ))}
        </div>

        <div className="about__side">
          <Reveal className="about__portrait">
            <img src="/assets/portrait.jpg" alt="Aniket Sahran" width="1010" height="1010" loading="lazy" />
            <span className="about__portrait-tag">Bengaluru, India</span>
          </Reveal>

          <Reveal className="about__block">
            <h3 className="about__block-title">Education</h3>
            <ul className="about__edu">
              {about.education.map((e) => (
                <li key={e.degree}>
                  <span className="about__edu-period">{e.period}</span>
                  <span className="about__edu-degree">{e.degree}</span>
                  <span className="about__edu-place">{e.place}</span>
                  <span className="about__edu-detail">{e.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about__block" delay={0.08}>
            <h3 className="about__block-title">Recognition</h3>
            <ul className="about__wins">
              {achievements.map((a) => (
                <li key={a.title}>
                  <span className="about__win-year">{a.year}</span>
                  <span className="about__win-title">{a.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
