import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

// Reveals its children on scroll into view: fade up from a slight offset,
// once. Under reduced-motion it renders a plain element with the children
// immediately visible (no transform, no opacity animation).
export default function Reveal({ children, as = 'div', delay = 0, className, ...rest }) {
  const reduced = useReducedMotion()

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.8, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
