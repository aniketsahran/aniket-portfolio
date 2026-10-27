import { motion } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic.js'

// A tool chip that pulls toward the cursor. Renders a mask-tinted brand logo
// when `slug` is set (decorative, aria-hidden), plus the tool name as text.
export default function ToolChip({ name, slug }) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(0.4)

  return (
    <motion.div
      ref={ref}
      className="tool-chip"
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {slug && (
        <span
          className="tool-chip__logo"
          aria-hidden="true"
          style={{
            maskImage: `url(/assets/logos/${slug}.svg)`,
            WebkitMaskImage: `url(/assets/logos/${slug}.svg)`,
          }}
        />
      )}
      <span className="tool-chip__name">{name}</span>
    </motion.div>
  )
}
