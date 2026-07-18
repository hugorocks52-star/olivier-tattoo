'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Style = 'Tous' | 'Réalisme' | 'Noir & gris' | 'Couleur' | 'Fineline' | 'Cover' | 'Piercing'

interface PortfolioItem {
  id: number
  src: string
  style: Exclude<Style, 'Tous'>
  zone: string
  title: string
  description: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    src: '/images/portfolio-1.png',
    style: 'Réalisme',
    zone: 'Avant-bras',
    title: 'Loup réaliste',
    description: 'Portrait de loup en réalisme noir et gris, avec un travail détaillé sur les textures du pelage et l\'expression des yeux.',
  },
  {
    id: 2,
    src: '/images/portfolio-2.png',
    style: 'Fineline',
    zone: 'Poignet',
    title: 'Botanique fineline',
    description: 'Illustration botanique en fineline sur le poignet intérieur, avec des lignes d\'une précision millimétrée.',
  },
  {
    id: 3,
    src: '/images/portfolio-3.png',
    style: 'Couleur',
    zone: 'Bras',
    title: 'Rose néo-traditionnelle',
    description: 'Rose en style néo-traditionnel avec des couleurs vives et des contours gras, associée à des éléments géométriques.',
  },
  {
    id: 4,
    src: '/images/portfolio-4.png',
    style: 'Cover',
    zone: 'Épaule',
    title: 'Cover-up mandala',
    description: 'Transformation d\'un ancien tatouage en un mandala géométrique sombre — une cover alliant technique et créativité.',
  },
  {
    id: 5,
    src: '/images/portfolio-5.png',
    style: 'Réalisme',
    zone: 'Mollet',
    title: 'Lion portrait',
    description: 'Portrait de lion en réalisme noir et gris, avec un travail d\'ombre et de lumière d\'une grande finesse.',
  },
  {
    id: 6,
    src: '/images/portfolio-6.png',
    style: 'Fineline',
    zone: 'Côtes',
    title: 'Géométrie sacrée',
    description: 'Mandala de géométrie sacrée en fineline sur les côtes, avec des lignes d\'une précision extrême.',
  },
]

const filters: Style[] = ['Tous', 'Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Cover', 'Piercing']

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Style>('Tous')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filtered = activeFilter === 'Tous'
    ? portfolioItems
    : portfolioItems.filter((item) => item.style === activeFilter)

  const currentIndex = selectedItem ? filtered.findIndex((i) => i.id === selectedItem.id) : -1

  const navigate = (dir: 'prev' | 'next') => {
    if (currentIndex === -1) return
    const next = dir === 'next'
      ? (currentIndex + 1) % filtered.length
      : (currentIndex - 1 + filtered.length) % filtered.length
    setSelectedItem(filtered[next])
  }

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Réalisations</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Le portfolio d&apos;Olivier
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Chaque tatouage raconte une histoire. Découvrez une sélection de réalisations dans différents styles, du réalisme à la fineline.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12" role="tablist" aria-label="Filtres par style">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
              className={cn(
                'px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 border',
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-gold hover:text-foreground'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square overflow-hidden bg-surface cursor-pointer"
              aria-label={`Voir ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={24} className="text-gold" aria-hidden="true" />
                <span className="text-foreground text-sm font-medium tracking-wide">{item.title}</span>
                <span className="text-gold text-xs tracking-wider uppercase">{item.style}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Aucune réalisation dans ce style pour le moment.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col lg:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 aspect-square lg:aspect-auto lg:min-h-[500px]">
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Info */}
            <div className="lg:w-72 flex flex-col justify-center">
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{selectedItem.style}</span>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{selectedItem.title}</h3>
              <p className="text-muted-foreground text-sm mb-1">
                <span className="text-foreground font-medium">Zone :</span> {selectedItem.zone}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4 text-sm">{selectedItem.description}</p>
              <button
                onClick={() => {
                  setSelectedItem(null)
                  document.getElementById('rendez-vous')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-8 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wider uppercase font-medium hover:bg-primary/90 transition-colors"
              >
                Demander un projet similaire
              </button>
            </div>

            {/* Navigation */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={() => navigate('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 text-foreground hover:text-gold transition-colors"
                  aria-label="Réalisation précédente"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="absolute right-2 lg:right-auto lg:left-auto top-1/2 -translate-y-1/2 p-2 bg-background/80 text-foreground hover:text-gold transition-colors"
                  aria-label="Réalisation suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 p-2 bg-background/80 text-foreground hover:text-gold transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
