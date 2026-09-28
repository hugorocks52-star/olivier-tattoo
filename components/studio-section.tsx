'use client'

import Image from 'next/image'
import { HeartHandshake, Palette, RefreshCw, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const values = [
  { icon: HeartHandshake, title: 'Écoute & confiance', description: 'Nous prenons le temps de comprendre votre idée, vos attentes et vos appréhensions pour une expérience sereine.' },
  { icon: Palette, title: 'Création sur mesure', description: 'Chaque motif est dessiné pour vous et votre morphologie. Aucun copier-coller, uniquement une création personnelle.' },
  { icon: ShieldCheck, title: 'Hygiène irréprochable', description: 'Matériel à usage unique, environnement contrôlé et protocole rigoureux à chaque séance.' },
  { icon: RefreshCw, title: 'Expertise cover', description: 'Les tatouages anciens ou ratés sont transformés en compositions nouvelles, cohérentes et durables.' },
]

export function StudioSection({ variant = 'full' }: { variant?: 'full' | 'teaser' }) {
  return (
    <div>
      <Reveal className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative order-2 lg:order-1"><div className="grid grid-cols-2 gap-3 sm:gap-4"><div className="media-frame relative aspect-[3/4] translate-y-7"><Image src="/images/salon-interior.png" alt="Intérieur du salon Tattoo Lounge" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 25vw" /></div><div className="media-frame relative aspect-[3/4]"><Image src="/images/artist-olivier.png" alt="Olivier en séance de tatouage" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 25vw" /></div></div><div className="glow-gold absolute -bottom-4 right-5 rounded-2xl border border-primary/20 bg-background/90 px-5 py-4 backdrop-blur-xl"><strong className="block text-2xl text-primary">18+</strong><span className="text-xs text-muted-foreground">ans d&apos;expérience</span></div></div>
        <div className="order-1 lg:order-2"><span className="eyebrow mb-5">L&apos;histoire du studio</span><h3 className="text-balance text-3xl font-black leading-tight tracking-[-0.03em] text-foreground sm:text-4xl">Un lieu où les idées personnelles deviennent des œuvres durables</h3><p className="mt-6 text-base leading-8 text-muted-foreground">Tattoo Lounge est né de plusieurs années d&apos;expérience, de curiosité et d&apos;un profond respect pour l&apos;histoire de chaque client. Olivier associe maîtrise technique et regard artistique pour créer un projet adapté à votre corps et à votre personnalité.</p>{variant === 'full' && <p className="mt-4 text-base leading-8 text-muted-foreground">Premier tatouage, pièce ambitieuse, cover ou transformation : tout commence par un échange transparent. L&apos;objectif n&apos;est pas simplement d&apos;exécuter un motif, mais de créer une pièce que vous aimerez encore dans de nombreuses années.</p>}<blockquote className="mt-7 border-l-2 border-primary pl-5 text-lg font-semibold leading-8 text-foreground">« J&apos;ai fait de ma passion mon métier. »<footer className="mt-2 text-xs font-normal text-primary">Olivier, tatoueur</footer></blockquote></div>
      </Reveal>

      <Stagger className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ icon: Icon, title, description }) => <StaggerItem key={title}><Card className="h-full border-white/10 bg-card/55 py-0 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_-35px_rgba(214,173,106,.5)]"><CardContent className="p-6"><span className="mb-5 grid size-11 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Icon className="size-5" /></span><h3 className="text-base font-bold text-foreground">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p></CardContent></Card></StaggerItem>)}</Stagger>

      {variant === 'full' && <Reveal className="mt-16 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"><h3 className="mb-6 text-center text-lg font-bold">Spécialités du studio</h3><div className="flex flex-wrap justify-center gap-2">{['Réalisme', 'Noir & gris', 'Fineline', 'Couleur', 'Cover-up', 'Géométrique', 'Mandala', 'Piercing'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">{item}</span>)}</div></Reveal>}
    </div>
  )
}
