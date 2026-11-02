import { useLayoutEffect, useRef } from 'react'
import { motion, useSpring, useAnimationFrame } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { computeDisplacement } from './displace.js'
import './InteractiveName.css'

// Bouncy: low damping + extra mass gives a visible overshoot/wobble as letters
// are pushed and as they settle back home.
const SPRING = { stiffness: 320, damping: 8, mass: 0.9 }

function Glyph({ ch, pointer }) {
  const ref = useRef(null)
  const home = useRef(null)
  const wasActive = useRef(false)
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const r = useSpring(0, SPRING)

  // The glyph's resting center = its current rect center minus whatever
  // transform we've currently applied. Subtracting the live transform makes
  // this correct no matter the animation state, and immune to the stale-home
  // bug when web fonts / layout reflow after mount.
  const measure = () => {
    const el = ref.current
    if (!el) return
    const b = el.getBoundingClientRect()
    home.current = {
      x: b.left + b.width / 2 - x.get(),
      y: b.top + b.height / 2 - y.get(),
    }
  }

  // Measure on mount, on resize, and once web fonts finish loading (which
  // reflows the text and would otherwise leave home pointing at the old spot).
  useLayoutEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    let cancelled = false
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure()
      })
    }
    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAnimationFrame(() => {
    const p = pointer.current
    if (!p.active) {
      wasActive.current = false
      x.set(0)
      y.set(0)
      r.set(0)
      return
    }
    // Re-measure the moment the pointer enters, so home reflects the real
    // on-screen position (fonts loaded, entrance settled, page scrolled).
    if (!wasActive.current || !home.current) {
      measure()
      wasActive.current = true
    }
    if (!home.current) return
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
      {/* Visual, interactive glyphs — grouped by word so wrapping only happens
          at spaces, never mid-word. Hidden from the a11y tree. */}
      <span className="inm__glyphs" aria-hidden="true">
        {text.split(' ').map((word, wi) => (
          <span className="inm__word" key={`w-${wi}`}>
            {word.split('').map((ch, ci) => (
              <Glyph ch={ch} pointer={pointer} key={`${wi}-${ci}`} />
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}
