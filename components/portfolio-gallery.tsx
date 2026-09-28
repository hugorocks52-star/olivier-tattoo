'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ImageOff, ZoomIn } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
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
  { id: 1, src: '/images/portfolio-1.png', style: 'Réalisme', zone: 'Avant-bras', title: 'Loup réaliste', description: "Portrait de loup en noir et gris, avec un travail précis sur le regard et la texture du pelage." },
  { id: 2, src: '/images/portfolio-2.png', style: 'Fineline', zone: 'Poignet', title: 'Botanique fineline', description: 'Composition botanique minimaliste aux lignes très fines, pensée pour épouser le poignet.' },
  { id: 3, src: '/images/portfolio-3.png', style: 'Couleur', zone: 'Bras', title: 'Rose néo-traditionnelle', description: 'Rose colorée aux contrastes profonds, associée à des lignes fortes et des détails géométriques.' },
  { id: 4, src: '/images/portfolio-4.png', style: 'Cover', zone: 'Épaule', title: 'Cover-up mandala', description: "Transformation d'un ancien tatouage en mandala géométrique sombre et parfaitement intégré." },
  { id: 5, src: '/images/portfolio-5.png', style: 'Réalisme', zone: 'Mollet', title: 'Portrait de lion', description: 'Portrait de lion en noir et gris, avec un travail subtil de lumière, de volume et de texture.' },
  { id: 6, src: '/images/portfolio-6.png', style: 'Fineline', zone: 'Côtes', title: 'Géométrie sacrée', description: 'Mandala géométrique aux lignes nettes et à la symétrie précise, conçu pour suivre la ligne des côtes.' },
]

const filters: Style[] = ['Tous', 'Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Cover', 'Piercing']

export function PortfolioGallery({ variant = 'full', limit }: { variant?: 'full' | 'teaser'; limit?: number }) {
  const [activeFilter, setActiveFilter] = useState<Style>('Tous')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const base = activeFilter === 'Tous' || variant === 'teaser' ? portfolioItems : portfolioItems.filter((item) => item.style === activeFilter)
  const filtered = variant === 'teaser' && limit ? base.slice(0, limit) : base
  const currentIndex = selectedItem ? filtered.findIndex((item) => item.id === selectedItem.id) : -1

  const navigate = (direction: -1 | 1) => {
    if (currentIndex < 0) return
    setSelectedItem(filtered[(currentIndex + direction + filtered.length) % filtered.length])
  }

  return (
    <div>
      {variant === 'full' && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer les réalisations par style">
          {filters.map((filter) => <Button key={filter} type="button" size="sm" variant={activeFilter === filter ? 'default' : 'outline'} onClick={() => setActiveFilter(filter)}>{filter}</Button>)}
        </div>
      )}

      <motion.div key={activeFilter} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" initial="hidden" animate="visible" variants={staggerContainer}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.button
              key={item.id} layout variants={fadeUp} exit={{ opacity: 0, scale: 0.96 }}
              onClick={() => setSelectedItem(item)}
              className={cn('group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card text-left focus-visible:ring-2 focus-visible:ring-primary', index % 3 === 1 && variant === 'teaser' ? 'lg:translate-y-6' : '')}
              aria-label={`Voir ${item.title}`}
            >
              <div className="relative aspect-[4/5]"><Image src={item.src} alt={item.title} fill className="object-cover transition-[filter] duration-300 group-hover:brightness-110" sizes="(max-width: 768px) 50vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" /><span className="absolute start-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] text-white/80 backdrop-blur-md">{item.style}</span><span className="absolute inset-x-4 bottom-4"><strong className="block text-sm text-white sm:text-base">{item.title}</strong><span className="mt-1 flex items-center justify-between text-[0.68rem] text-white/55"><span>{item.zone}</span><ZoomIn className="size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" /></span></span></div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-muted-foreground"><ImageOff className="mx-auto mb-3 size-7" /><p>Aucune réalisation dans ce style pour le moment.</p></div>}

      {variant === 'teaser' && <div className="mt-14 text-center"><Button asChild variant="outline" size="lg"><Link href="/portfolio">Voir tout le portfolio <ArrowRight /></Link></Button></div>}

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-white/10 bg-popover/98 p-0 shadow-2xl shadow-black/60" showCloseButton>
          {selectedItem && <div className="grid lg:grid-cols-[1.25fr_.75fr]">
            <div className="relative min-h-[56vh] overflow-hidden rounded-t-xl lg:rounded-s-xl lg:rounded-e-none"><Image src={selectedItem.src} alt={selectedItem.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div>
            <div className="flex flex-col justify-center p-7 sm:p-9"><span className="eyebrow mb-4">{selectedItem.style}</span><DialogTitle className="text-2xl font-black sm:text-3xl">{selectedItem.title}</DialogTitle><p className="mt-3 text-xs text-primary">Zone : {selectedItem.zone}</p><DialogDescription className="mt-5 text-sm leading-7">{selectedItem.description}</DialogDescription><Button asChild className="mt-8"><Link href="/rendez-vous" onClick={() => setSelectedItem(null)}>Demander un projet similaire <ArrowRight /></Link></Button>{filtered.length > 1 && <div className="mt-5 flex gap-2"><Button variant="outline" size="icon" onClick={() => navigate(-1)} aria-label="Réalisation précédente"><ChevronLeft /></Button><Button variant="outline" size="icon" onClick={() => navigate(1)} aria-label="Réalisation suivante"><ChevronRight /></Button></div>}</div>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
