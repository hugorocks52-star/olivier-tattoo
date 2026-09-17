'use client'

import { Breadcrumbs } from '@heroui/react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  breadcrumb: string
}

export function PageHeader({ eyebrow, title, description, breadcrumb }: PageHeaderProps) {
  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-surface border-b border-border">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <Breadcrumbs separator={<ChevronRight size={12} className="text-muted-foreground" aria-hidden="true" />} className="mb-6 text-xs">
            <Breadcrumbs.Item href="/" className="text-muted-foreground hover:text-gold transition-colors">
              Accueil
            </Breadcrumbs.Item>
            <Breadcrumbs.Item href="#" className="text-foreground pointer-events-none" aria-current="page">
              {breadcrumb}
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </motion.div>
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">{eyebrow}</span>
        </motion.div>
        <motion.h1 variants={fadeUp} className="font-serif text-4xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
