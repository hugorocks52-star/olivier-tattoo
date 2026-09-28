import Link from 'next/link'
import { ArrowUpRight, Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'

const reviews = [
  { name: 'Sophie M.', text: "Olivier a fait un travail incroyable sur mon cover-up. Le résultat dépasse toutes mes attentes. L'accueil est chaleureux et on se sent à l'aise dès les premières minutes.", date: 'Il y a 3 mois', highlight: 'Cover-up exceptionnel' },
  { name: 'Thomas L.', text: "Cela fait cinq ans que je vais chez Olivier. Son travail est d'une régularité et d'une qualité remarquables. Toute ma famille vient désormais au studio.", date: 'Il y a 6 mois', highlight: '5 ans de confiance' },
  { name: 'Camille D.', text: "C'était mon premier tatouage et j'avais beaucoup de questions. Olivier a pris le temps de tout expliquer et le résultat correspond exactement à ce que je voulais.", date: 'Il y a 1 mois', highlight: 'Premier tatouage serein' },
]

export function ReviewsSection({ limit, showSummary = true }: { limit?: number; showSummary?: boolean }) {
  const items = limit ? reviews.slice(0, limit) : reviews
  return (
    <div>
      {showSummary && <Reveal className="mb-12 flex justify-center"><div className="surface-panel glow-gold flex flex-wrap items-center justify-center gap-5 rounded-2xl px-7 py-5"><strong className="text-4xl font-black text-foreground">{siteConfig.rating.value.toLocaleString('fr-FR')}</strong><div className="h-11 w-px bg-white/10" /><div><div className="flex gap-1 text-primary" aria-label="Note de cinq étoiles">{[1,2,3,4,5].map((i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="mt-1 text-xs text-muted-foreground">sur {siteConfig.rating.count} avis Google</p></div></div></Reveal>}
      <Stagger className="grid gap-5 md:grid-cols-3">{items.map((review) => <StaggerItem key={review.name}><Card className="h-full border-white/10 bg-card/60 py-0 transition-[transform,border-color] hover:-translate-y-1 hover:border-primary/25"><CardContent className="flex h-full flex-col p-6"><div className="mb-5 flex items-center justify-between"><Quote className="size-7 text-primary/35" /><span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] text-primary">{review.highlight}</span></div><p className="flex-1 text-sm leading-7 text-muted-foreground">« {review.text} »</p><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5"><div><p className="text-sm font-bold">{review.name}</p><p className="mt-1 text-xs text-muted-foreground">{review.date}</p></div><div className="flex gap-0.5 text-primary">{[1,2,3,4,5].map((i) => <Star key={i} className="size-3 fill-current" />)}</div></div></CardContent></Card></StaggerItem>)}</Stagger>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button asChild variant="outline"><a href={siteConfig.social.googleReviews} target="_blank" rel="noreferrer">Voir tous les avis Google <ArrowUpRight /></a></Button>{limit && <Button asChild variant="ghost"><Link href="/avis">Lire les témoignages</Link></Button>}</div>
    </div>
  )
}
