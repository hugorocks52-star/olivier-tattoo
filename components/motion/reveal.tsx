'use client'

import { motion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
}

/** Fades a block up into place once it scrolls into view. */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Staggers its direct StaggerItem children in as the group scrolls into view. */
export function Stagger({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer} {...props}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  )
}
