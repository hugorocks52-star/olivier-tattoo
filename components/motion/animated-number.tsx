'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'

interface AnimatedNumberProps {
  value: number
  decimals?: number
  className?: string
}

/** Counts up to `value` once it scrolls into view. */
export function AnimatedNumber({ value, decimals = 1, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1.2, bounce: 0 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest.toFixed(decimals)
    })
  }, [spring, decimals])

  return <motion.span ref={ref} className={className}>0</motion.span>
}
