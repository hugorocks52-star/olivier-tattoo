'use client'

import Image from 'next/image'
import { Star, MapPin, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Section d'accueil"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Intérieur du salon Tattoo Lounge"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Pre-title badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Tatouage & Piercing — Auvers-sur-Oise
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-none mb-6 text-balance">
            Votre histoire.
            <br />
            <span className="text-gold">Votre peau.</span>
            <br />
            Votre tatouage.
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Tattoo Lounge est un salon artistique et professionnel où chaque projet est unique.
            Olivier vous accompagne avec écoute et expertise pour créer un tatouage qui vous ressemble.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-medium hover:bg-primary/90 transition-all duration-300 border border-primary hover:border-gold"
            >
              Découvrir les réalisations
            </button>
            <button
              onClick={() => scrollTo('essayage')}
              className="px-8 py-4 bg-transparent text-foreground text-sm tracking-widest uppercase font-medium border border-foreground/30 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Essayer un tatouage
            </button>
          </div>

          {/* Rating + Address */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            {/* Star rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5" aria-label="Note: 4,7 sur 5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" aria-hidden="true" />
                ))}
                <Star size={14} className="text-gold fill-gold opacity-70" aria-hidden="true" />
              </div>
              <span className="text-foreground font-semibold text-sm">4,7/5</span>
              <span className="text-muted-foreground text-sm">— 217 avis Google</span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
              <span>37 rue du Général-de-Gaulle, 95430 Auvers-sur-Oise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('portfolio')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
