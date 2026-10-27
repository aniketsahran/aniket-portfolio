import { tools } from '../data/content.js'
import Reveal from '../components/Reveal.jsx'
import ToolCircle from '../components/ToolCircle.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './ToolCarousel.css'

const allTools = tools.flatMap((g) => g.items)

export default function ToolCarousel() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="toolcar section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Toolbox
        </Reveal>
        <Reveal as="h2" className="section-title">
          What I reach for.
        </Reveal>
      </div>

      {reduced ? (
        <div className="toolcar__viewport">
          <div className="toolcar__track toolcar__track--static">
            {allTools.map((t) => (
              <ToolCircle name={t.name} slug={t.slug} key={t.name} />
            ))}
          </div>
        </div>
      ) : (
        <div className="toolcar__viewport">
          <div className="toolcar__track">
            {allTools.map((t) => (
              <ToolCircle name={t.name} slug={t.slug} key={t.name} />
            ))}
            {/* seamless-loop duplicate, hidden from assistive tech */}
            <div className="toolcar__dup" aria-hidden="true" style={{ display: 'contents' }}>
              {allTools.map((t) => (
                <ToolCircle name={t.name} slug={t.slug} key={`dup-${t.name}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
