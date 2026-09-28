'use client'

import Link from 'next/link'
import { ChevronRight, CircleDot } from 'lucide-react'
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
    <div className="relative overflow-hidden border-b border-white/10 pb-16 pt-36 lg:pb-24 lg:pt-44">
      <div className="ambient-grid absolute inset-0 hidden opacity-60 sm:block" aria-hidden="true" />
      <div className="absolute -end-28 top-14 hidden size-96 rounded-full bg-wine/20 blur-[100px] sm:block" aria-hidden="true" />
      <div className="absolute -start-20 bottom-0 hidden size-72 rounded-full bg-primary/10 blur-[90px] sm:block" aria-hidden="true" />
      <motion.div className="container-shell relative z-10" initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.nav variants={fadeUp} aria-label="Fil d’Ariane" className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">Accueil</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{breadcrumb}</span>
        </motion.nav>
        <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2 text-primary">
          <CircleDot className="size-4" aria-hidden="true" />
          <span className="text-xs font-bold tracking-[0.16em]">{eyebrow}</span>
        </motion.div>
        <motion.h1 variants={fadeUp} className="max-w-4xl whitespace-pre-line text-balance text-4xl font-black leading-[1.2] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </motion.h1>
        {description && <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</motion.p>}
      </motion.div>
    </div>
  )
}
