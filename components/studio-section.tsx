'use client'

import Image from 'next/image'
import { Card } from '@heroui/react'
import { Palette, Shield, Heart, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const values = [
  {
    icon: Heart,
    title: 'Écoute & confiance',
    description: 'Olivier prend le temps de comprendre votre projet, vos attentes et vos peurs pour vous accompagner avec bienveillance.',
  },
  {
    icon: Palette,
    title: 'Créations personnalisées',
    description: 'Chaque tatouage est unique, conçu sur mesure pour vous. Pas de copier-coller, seulement votre vision.',
  },
  {
    icon: Shield,
    title: 'Hygiène irréprochable',
    description: 'Matériel à usage unique, protocoles stricts. Votre sécurité est une priorité absolue à chaque séance.',
  },
  {
    icon: Star,
    title: 'Expertise covers',
    description: 'Spécialiste des covers et transformations, Olivier redonne vie à des tatouages auxquels vous ne croyiez plus.',
  },
]

const galleryImages = [
  { src: '/images/salon-interior.png', alt: 'Intérieur du salon Tattoo Lounge' },
  { src: '/images/artist-olivier.png', alt: 'Olivier au travail' },
]

interface StudioSectionProps {
  /** 'teaser' renders a short version for the homepage; 'full' is the complete /studio page content. */
  variant?: 'full' | 'teaser'
}

export function StudioSection({ variant = 'full' }: StudioSectionProps) {
  return (
    <div>
      <Reveal className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
        <div>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Les 18 ans de Tattoolounge méritaient bien ce nouveau site internet consultable sur portable et partageant
            avec vous une large sélection de dessins d&apos;Olivier et réalisation de tatouages. Une réputation fondée
            sur des années d&apos;expériences et des clients heureux.
          </p>
          {variant === 'full' && (
            <>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Sérieux, écoute, fantaisie et expérience font la réputation du studio Tattoolounge tout comme ses
                participations et récompenses lors de nombreuses conventions, salons et expositions. Le tatouage
                n&apos;échappe pas à la turbulence des esprits et des modes. Toujours au plus près des nouvelles
                tendances et demandes de ses clients, Olivier et Mika sont à même de vous guider dans vos choix et de
                matérialiser vos rêves avec créativité et dextérité.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Une envie, un projet, un premier tatouage ? Passez au studio pour un premier contact. Le style,
                l&apos;emplacement, le traité, le sujet d&apos;un tatouage nécessitent réflexion. Nous échangerons nos
                idées en toute simplicité et mettrons notre expérience professionnelle au service de votre décision.
              </p>
            </>
          )}
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img) => (
              <div key={img.src} className="media-frame relative aspect-square">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
            <div className="col-span-2 rounded-md bg-primary/10 border border-primary/20 p-6 mt-1">
              <blockquote className="text-foreground font-serif text-lg italic leading-relaxed">
                &ldquo;J&rsquo;ai fait de ma passion mon métier.&rdquo;
              </blockquote>
              <p className="text-gold text-sm tracking-wider uppercase mt-3">— Olivier, tatoueur</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value) => {
          const Icon = value.icon
          return (
            <StaggerItem key={value.title}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card border border-border hover:border-gold/40 transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary/10 mb-1 group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} className="text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            </StaggerItem>
          )
        })}
      </Stagger>

      {variant === 'full' && (
        <div className="mt-16 border-t border-border pt-12">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">Spécialités du studio</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Réalisme', 'Noir & gris', 'Fineline', 'Couleur', 'Cover-up', 'Géométrique', 'Mandala', 'Piercing'].map((spec) => (
              <span
                key={spec}
                className="px-4 py-2 rounded-full border border-border text-muted-foreground text-sm tracking-wider hover:border-gold hover:text-foreground transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
