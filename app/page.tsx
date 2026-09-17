import Image from 'next/image'
import Link from 'next/link'
import { Wand2, MapPin, Phone } from 'lucide-react'
import { buttonVariants } from '@heroui/styles'
import { HeroSection } from '@/components/hero-section'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { StudioSection } from '@/components/studio-section'
import { ReviewsSection } from '@/components/reviews-section'
import { FaqSection } from '@/components/faq-section'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/lib/site-config'

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <div className="section-divider" aria-hidden="true" />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Réalisations"
            title="Un aperçu du portfolio"
            description="Chaque tatouage raconte une histoire. Découvrez une sélection de réalisations dans différents styles, du réalisme à la fineline."
          />
          <PortfolioGallery variant="teaser" limit={6} />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section id="salon" className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Le studio" title="18 ans de passion & d'expertise" />
          <StudioSection variant="teaser" />
          <div className="mt-10 text-center">
            <Link href="/studio" className={buttonVariants({ variant: 'outline', size: 'md' })}>
              Découvrir le studio et Olivier
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid lg:grid-cols-2 gap-12 items-center bg-card border border-border p-8 lg:p-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Outil interactif</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Essayez votre tatouage avant de vous lancer
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                Importez une photo de votre corps et le motif souhaité pour visualiser le rendu en temps réel —
                déplacez, redimensionnez et ajustez librement avant votre rendez-vous.
              </p>
              <Link href="/essai-virtuel" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                <Wand2 size={16} aria-hidden="true" />
                Essayer maintenant
              </Link>
            </div>
            <div className="relative aspect-video lg:aspect-square overflow-hidden">
              <Image
                src="/images/portfolio-3.png"
                alt="Aperçu de l'outil d'essayage virtuel de tatouage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section id="avis" className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Témoignages" title="Ce que disent nos clients" align="center" />
          <ReviewsSection limit={3} />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Questions fréquentes" title="Avant de nous contacter" align="center" />
          <FaqSection />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="py-24 lg:py-32 bg-surface">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Parlons de votre projet
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Décrivez votre idée et Olivier vous recontacte pour convenir d&apos;un rendez-vous.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/rendez-vous" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Prendre rendez-vous
            </Link>
            <a href={`tel:${siteConfig.phone}`} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <MapPin size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
            <span>
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
            </span>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
