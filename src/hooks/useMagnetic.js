import { useRef } from 'react'
import { useSpring } from 'framer-motion'
import useReducedMotion from './useReducedMotion.js'

// Returns spring x/y motion values and pointer handlers that pull an element
// toward the cursor by `strength` fraction of the cursor offset, settling back
// to 0,0 on leave. A no-op (stays at 0,0) under reduced motion.
export default function useMagnetic(strength = 0.35) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })

  const onPointerMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x, y, onPointerMove, onPointerLeave, reduced }
}
