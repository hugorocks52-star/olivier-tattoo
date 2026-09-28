'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Play, ShieldCheck, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24" aria-label="Présentation de Tattoo Lounge">
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="Intérieur du salon Tattoo Lounge" fill priority quality={82} className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,7,7,.97),rgba(9,7,7,.72)_55%,rgba(9,7,7,.22))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,7,.25),transparent_45%,#090707_96%)]" />
      </div>
      <div className="ambient-grid absolute inset-0 hidden opacity-50 sm:block" aria-hidden="true" />
      <div className="absolute -left-32 top-24 hidden size-[30rem] rounded-full bg-wine/25 blur-[120px] sm:block" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 hidden size-72 rounded-full bg-primary/10 blur-[100px] sm:block" aria-hidden="true" />

      <div className="container-shell relative z-10 flex min-h-[calc(100svh-6rem)] items-center py-16">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
          <motion.div variants={fadeUp} className="mb-7 flex flex-wrap items-center gap-3"><span className="eyebrow">Salon d&apos;art à {siteConfig.address.city}</span><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[0.68rem] text-emerald-300">Nouveaux projets ouverts</span></motion.div>
          <motion.h1 variants={fadeUp} className="text-balance text-5xl font-black leading-[1.08] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">Votre histoire.<span className="block bg-gradient-to-r from-[#f2d49d] via-primary to-[#9f6f36] bg-clip-text text-transparent">Sur votre peau.</span></motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">De la première idée au dernier trait, chaque tatouage est dessiné sur mesure. Fort de 18 ans d&apos;expérience, Olivier transforme votre histoire en une œuvre précise et durable.</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/rendez-vous">Démarrer mon projet <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg"><Link href="/portfolio"><Play className="fill-current" /> Voir le portfolio</Link></Button></motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />Hygiène professionnelle</span><span className="inline-flex items-center gap-2"><MapPin className="size-4 text-primary" />{siteConfig.address.city}, France</span></motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 lg:block"><div className="surface-panel flex items-center gap-5 rounded-2xl px-5 py-3 text-xs"><div className="flex items-center gap-1 text-primary">{[1, 2, 3, 4, 5].map((item) => <Star key={item} className="size-3.5 fill-current" />)}</div><span className="font-bold text-foreground">{siteConfig.rating.value}/5</span><span className="h-4 w-px bg-white/10" /><span className="text-muted-foreground">{siteConfig.rating.count} avis Google</span></div></div>
    </section>
  )
}
