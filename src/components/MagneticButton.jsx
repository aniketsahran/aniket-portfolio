import { motion } from 'framer-motion'
import useMagnetic from '../hooks/useMagnetic.js'

// A button/link that subtly pulls toward the cursor and springs back.
// Renders an <a> when `href` is set (keeps href/download/focus), else a
// <button> (keeps onClick/type). Magnetism is disabled under reduced motion.
export default function MagneticButton({
  as,
  href,
  children,
  className = '',
  strength = 0.35,
  ...rest
}) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(strength)
  const isLink = as === 'a' || (as === undefined && href != null)
  const Tag = isLink ? motion.a : motion.button

  const tagProps = isLink ? { href } : { type: rest.type || 'button' }

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...tagProps}
      {...rest}
    >
      {children}
    </Tag>
  )
}
