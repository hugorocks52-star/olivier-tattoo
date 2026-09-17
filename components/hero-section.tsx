'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { buttonVariants } from '@heroui/styles'
import { motion, useScroll, useTransform } from 'motion/react'
import { siteConfig } from '@/lib/site-config'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Section d'accueil"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <Image
          src="/images/hero-bg.png"
          alt="Intérieur du salon Tattoo Lounge"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/95" />
        <div className="absolute inset-0 bg-background/30" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: 'inset 0 0 220px 40px rgba(0,0,0,0.75)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 h-144 w-xl rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%)' }}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        style={{ opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Tatouage & Piercing — {siteConfig.address.city}
            </span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-none mb-6 text-balance">
            <motion.span variants={fadeUp} className="block">Votre histoire.</motion.span>
            <motion.span variants={fadeUp} className="block text-gold">Votre peau.</motion.span>
            <motion.span variants={fadeUp} className="block">Votre tatouage.</motion.span>
          </h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Tattoo Lounge est un salon artistique et professionnel où chaque projet est unique.
            Olivier vous accompagne avec écoute et expertise pour créer un tatouage qui vous ressemble.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/portfolio" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Découvrir les réalisations
            </Link>
            <Link href="/essai-virtuel" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Essayer un tatouage
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5" aria-label={`Note : ${siteConfig.rating.value} sur 5`}>
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" aria-hidden="true" />
                ))}
                <Star size={14} className="text-gold fill-gold opacity-70" aria-hidden="true" />
              </div>
              <span className="text-foreground font-semibold text-sm">{siteConfig.rating.value}/5</span>
              <span className="text-muted-foreground text-sm">
                — {siteConfig.rating.count} avis {siteConfig.rating.provider}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin size={14} className="text-gold shrink-0" aria-hidden="true" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
