// A circular tool badge: big logo (or monogram fallback) with a small, quiet
// name underneath. Decorative glyph is aria-hidden; the name carries the label.
function monogram(name) {
  const words = name.replace(/[.]/g, '').split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2)
}

export default function ToolCircle({ name, slug }) {
  return (
    <div className="tool-circle">
      <div className="tool-circle__badge">
        {slug ? (
          <span
            className="tool-circle__logo"
            aria-hidden="true"
            style={{
              maskImage: `url(/assets/logos/${slug}.svg)`,
              WebkitMaskImage: `url(/assets/logos/${slug}.svg)`,
            }}
          />
        ) : (
          <span className="tool-circle__mono" aria-hidden="true">
            {monogram(name)}
          </span>
        )}
      </div>
      <span className="tool-circle__name">{name}</span>
    </div>
  )
}
