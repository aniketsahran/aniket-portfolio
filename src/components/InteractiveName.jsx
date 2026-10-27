import { useLayoutEffect, useRef } from 'react'
import { motion, useSpring, useAnimationFrame } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { computeDisplacement } from './displace.js'
import './InteractiveName.css'

const SPRING = { stiffness: 260, damping: 14, mass: 0.7 }

function Glyph({ ch, pointer }) {
  const ref = useRef(null)
  const home = useRef({ x: 0, y: 0 })
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const r = useSpring(0, SPRING)

  // Measure the glyph's resting (home) center once after layout, and again on
  // resize. The transform is 0 at these moments, so the rect is the true home.
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      const b = el.getBoundingClientRect()
      home.current = { x: b.left + b.width / 2, y: b.top + b.height / 2 }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useAnimationFrame(() => {
    const p = pointer.current
    if (!p.active) {
      x.set(0)
      y.set(0)
      r.set(0)
      return
    }
    const d = computeDisplacement(home.current.x, home.current.y, p.x, p.y)
    x.set(d.x)
    y.set(d.y)
    r.set(d.rotate)
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
  const stop = () => {
    pointer.current = { ...pointer.current, active: false }
  }

  return (
    <span
      className={`inm ${className}`}
      onPointerMove={onMove}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onPointerUp={stop}
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
