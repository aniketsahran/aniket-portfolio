import { describe, it, expect } from 'vitest'
import { computeDisplacement, RADIUS } from './displace.js'

describe('computeDisplacement', () => {
  it('returns zero displacement when the pointer is beyond the radius', () => {
    const d = computeDisplacement(100, 100, 100 + RADIUS + 50, 100)
    expect(d).toEqual({ x: 0, y: 0, rotate: 0 })
  })

  it('pushes the glyph away from the pointer (opposite the cursor)', () => {
    // pointer to the RIGHT of home → glyph should move LEFT (negative x)
    const d = computeDisplacement(100, 100, 140, 100)
    expect(d.x).toBeLessThan(0)
  })

  it('is deterministic — same home + pointer always yields the same result (no feedback loop)', () => {
    const a = computeDisplacement(100, 100, 130, 110)
    const b = computeDisplacement(100, 100, 130, 110)
    expect(a).toEqual(b)
  })
})
