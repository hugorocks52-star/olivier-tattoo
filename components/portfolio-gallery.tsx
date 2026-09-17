'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ZoomIn, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { Modal, ToggleButtonGroup, ToggleButton, EmptyState } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/motion'

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
    description:
      "Portrait de loup en réalisme noir et gris, avec un travail détaillé sur les textures du pelage et l'expression des yeux.",
  },
  {
    id: 2,
    src: '/images/portfolio-2.png',
    style: 'Fineline',
    zone: 'Poignet',
    title: 'Botanique fineline',
    description:
    "Illustration botanique en fineline sur le poignet intérieur, avec des lignes d'une précision millimétrée.",
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
    description: "Portrait de lion en réalisme noir et gris, avec un travail d'ombre et de lumière d'une grande finesse.",
  },
  {
    id: 6,
    src: '/images/portfolio-6.png',
    style: 'Fineline',
    zone: 'Côtes',
    title: 'Géométrie sacrée',
    description: "Mandala de géométrie sacrée en fineline sur les côtes, avec des lignes d'une précision extrême.",
  },
]

const filters: Style[] = ['Tous', 'Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Cover', 'Piercing']

interface PortfolioGalleryProps {
  /** 'full' shows filters and every item; 'teaser' shows a subset with no filters. */
  variant?: 'full' | 'teaser'
  limit?: number
}

export function PortfolioGallery({ variant = 'full', limit }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<Style>('Tous')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const base = activeFilter === 'Tous' || variant === 'teaser'
    ? portfolioItems
    : portfolioItems.filter((item) => item.style === activeFilter)
  const filtered = variant === 'teaser' && limit ? base.slice(0, limit) : base

  const currentIndex = selectedItem ? filtered.findIndex((i) => i.id === selectedItem.id) : -1

  const navigate = (dir: 'prev' | 'next') => {
    if (currentIndex === -1) return
    const next = dir === 'next'
      ? (currentIndex + 1) % filtered.length
      : (currentIndex - 1 + filtered.length) % filtered.length
    setSelectedItem(filtered[next])
  }

  return (
    <div>
      {variant === 'full' && (
        <ToggleButtonGroup
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={new Set([activeFilter])}
          onSelectionChange={(keys) => setActiveFilter(Array.from(keys)[0] as Style)}
          isDetached
          aria-label="Filtrer par style"
          className="flex-wrap gap-3 mb-12"
        >
          {filters.map((filter) => (
            <ToggleButton key={filter} id={filter} className="text-xs tracking-wider uppercase">
              {filter}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      <motion.div
        key={activeFilter}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.button
              key={item.id}
              layout
              variants={fadeUp}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedItem(item)}
              className="media-frame group relative aspect-square bg-surface cursor-pointer"
              aria-label={`Voir ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={24} className="text-gold" aria-hidden="true" />
                <span className="text-foreground text-sm font-medium tracking-wide">{item.title}</span>
                <span className="text-gold text-xs tracking-wider uppercase">{item.style}</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <EmptyState className="py-20 text-center">
          <ImageOff size={28} className="mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
          <p>Aucune réalisation dans ce style pour le moment.</p>
        </EmptyState>
      )}

      {variant === 'teaser' && (
        <div className="mt-10 text-center">
          <Link href="/portfolio" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Voir tout le portfolio
          </Link>
        </div>
      )}

      <Modal.Root
        isOpen={selectedItem !== null}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <Modal.Backdrop>
          <Modal.Container size="lg">
            <Modal.Dialog aria-label={selectedItem?.title}>
              {selectedItem && (
                <div className="relative flex flex-col lg:flex-row gap-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="media-frame relative flex-1 aspect-square lg:aspect-auto lg:min-h-[500px]"
                    >
                      <Image
                        src={selectedItem.src}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="lg:w-72 flex flex-col justify-center p-6 lg:p-0 lg:pr-6">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{selectedItem.style}</span>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{selectedItem.title}</h3>
                    <p className="text-muted-foreground text-sm mb-1">
                      <span className="text-foreground font-medium">Zone :</span> {selectedItem.zone}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4 text-sm">{selectedItem.description}</p>
                    <Link
                      href="/rendez-vous"
                      onClick={() => setSelectedItem(null)}
                      className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-8')}
                    >
                      Demander un projet similaire
                    </Link>
                  </div>

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
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 text-foreground hover:text-gold transition-colors"
                        aria-label="Réalisation suivante"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  <Modal.CloseTrigger className="absolute top-2 right-2 p-2 bg-background/80 text-foreground hover:text-gold transition-colors">
                    <X size={20} />
                  </Modal.CloseTrigger>
                </div>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>
    </div>
  )
}
