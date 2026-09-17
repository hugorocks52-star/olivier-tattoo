import type { Transition, Variants } from 'motion/react'

/** Signature easing — decisive settle, no bounce. Used everywhere for brand consistency. */
export const easeOut: Transition['ease'] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
