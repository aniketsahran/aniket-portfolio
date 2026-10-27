import { tools } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import ToolChip from '../components/ToolChip.jsx'
import './ToolGrid.css'

export default function ToolGrid() {
  return (
    <section id="skills" className="toolgrid section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Toolbox
        </Reveal>
        <Reveal as="h2" className="section-title">
          What I reach for.
        </Reveal>

        <div className="toolgrid__groups">
          {tools.map((group, i) => (
            <Reveal className="toolgrid__group" delay={i * 0.04} key={group.group}>
              <h3 className="toolgrid__label">{group.group}</h3>
              <div className="toolgrid__chips">
                {group.items.map((t) => (
                  <ToolChip name={t.name} slug={t.slug} key={t.name} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
