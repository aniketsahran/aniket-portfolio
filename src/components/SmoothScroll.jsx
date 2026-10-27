import { useEffect } from 'react'
import Lenis from 'lenis'
import useReducedMotion from '../hooks/useReducedMotion.js'

// Drives page-wide smooth scrolling via Lenis. Disabled under reduced motion,
// where native scrolling is used instead. Renders children directly.
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduced])

  return children
}
