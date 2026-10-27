import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Returns true when the user has asked the OS to reduce motion. Subscribes to
// changes so a mid-session toggle is respected. Safe under SSR/tests where
// matchMedia may be absent.
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mql = window.matchMedia(QUERY)
    const onChange = (e) => setReduced(e.matches)
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}
