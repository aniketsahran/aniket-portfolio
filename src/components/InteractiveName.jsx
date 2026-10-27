import { useRef } from 'react'
import { motion, useSpring, useAnimationFrame } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './InteractiveName.css'

const SPRING = { stiffness: 260, damping: 14, mass: 0.7 }
const RADIUS = 120 // px of cursor influence
const PUSH = 0.9 // displacement strength

function Glyph({ ch, pointer }) {
  const ref = useRef(null)
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const r = useSpring(0, SPRING)

  useAnimationFrame(() => {
    const el = ref.current
    if (!el) return
    const p = pointer.current
    if (!p.active) {
      x.set(0)
      y.set(0)
      r.set(0)
      return
    }
    const box = el.getBoundingClientRect()
    const cx = box.left + box.width / 2
    const cy = box.top + box.height / 2
    const dx = cx - p.x
    const dy = cy - p.y
    const dist = Math.hypot(dx, dy)
    if (dist < RADIUS) {
      const f = (RADIUS - dist) / RADIUS
      x.set((dx / (dist || 1)) * f * RADIUS * PUSH)
      y.set((dy / (dist || 1)) * f * RADIUS * PUSH)
      r.set((dx / (dist || 1)) * f * 16)
    } else {
      x.set(0)
      y.set(0)
      r.set(0)
    }
  })

  return (
    <motion.span className="inm__glyph" ref={ref} style={{ x, y, rotate: r }}>
      {ch === ' ' ? ' ' : ch}
    </motion.span>
  )
}

export default function InteractiveName({ text, className = '' }) {
  const reduced = useReducedMotion()
  const pointer = useRef({ x: -9999, y: -9999, active: false })

  if (reduced) {
    return <span className={`inm inm--static ${className}`}>{text}</span>
  }

  const onMove = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY, active: true }
  }
  const onLeave = () => {
    pointer.current = { ...pointer.current, active: false }
  }

  return (
    <span
      className={`inm ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Accessible full text for screen readers. */}
      <span className="sr-only">{text}</span>
      {/* Visual, interactive glyphs — hidden from the a11y tree. */}
      <span className="inm__glyphs" aria-hidden="true">
        {text.split('').map((ch, i) => (
          <Glyph ch={ch} pointer={pointer} key={`${ch}-${i}`} />
        ))}
      </span>
    </span>
  )
}
