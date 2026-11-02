import { beyondCode } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import './BeyondCode.css'

// Short alt labels for the gallery, aligned with the volunteering items.
const GALLERY_ALT = [
  'Cloudera Cares volunteers painting an environmental mural at a government school',
  'The Cloudera Cares volunteer team at the government school',
]

export default function BeyondCode() {
  const { volunteering, leadership } = beyondCode

  return (
    <section id="beyond" className="beyond section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Beyond Code
        </Reveal>
        <Reveal as="h2" className="section-title">
          The part that isn&apos;t on the résumé.
        </Reveal>
        <Reveal as="p" className="beyond__intro">
          I try to leave things a little better than I found them — giving time where it helps and
          leading where I can.
        </Reveal>

        <div className="beyond__volunteer">
          <div className="beyond__text">
            <h3 className="beyond__org">{volunteering.org}</h3>
            <p className="beyond__role">
              {volunteering.role} · {volunteering.period}
            </p>
            <ul className="beyond__items">
              {volunteering.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="beyond__gallery">
            {volunteering.images.map((src, i) => (
              <Reveal className="beyond__photo" delay={i * 0.06} key={src}>
                <img src={src} alt={GALLERY_ALT[i] ?? `${volunteering.org} volunteering photo`} loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="beyond__leadership">
          <div className="beyond__text">
            <h3 className="beyond__org">{leadership.org}</h3>
            <p className="beyond__role">
              {leadership.role} · {leadership.period}
            </p>
          </div>
          <ul className="beyond__items beyond__items--lead">
            {leadership.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
