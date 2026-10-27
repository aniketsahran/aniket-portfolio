export const RADIUS = 120 // px of cursor influence
export const PUSH = 0.9 // displacement strength

// Pure displacement for one glyph: how far it should move given its FIXED home
// center and the current pointer position. Computed only from (home, pointer),
// never from the glyph's current transform — so it's deterministic and cannot
// feed back on itself. Beyond the radius it returns to home (0,0,0).
export function computeDisplacement(homeX, homeY, px, py, radius = RADIUS, push = PUSH) {
  const dx = homeX - px
  const dy = homeY - py
  const dist = Math.hypot(dx, dy)
  if (dist >= radius) return { x: 0, y: 0, rotate: 0 }
  const f = (radius - dist) / radius
  const ux = dx / (dist || 1)
  const uy = dy / (dist || 1)
  return {
    x: ux * f * radius * push,
    y: uy * f * radius * push,
    rotate: ux * f * 16,
  }
}
