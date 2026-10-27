import { useEffect, useState } from 'react'

// True when the viewport is at or below `maxWidth` (default 820px). Used to fall
// back to the vertical experience layout on small screens. Safe under SSR/tests.
export default function useIsSmallScreen(maxWidth = 820) {
  const query = `(max-width: ${maxWidth}px)`
  const [small, setSmall] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mql = window.matchMedia(query)
    const onChange = (e) => setSmall(e.matches)
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [query])

  return small
}
