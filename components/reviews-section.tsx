import Link from 'next/link'
import { Star, ExternalLink, Quote } from 'lucide-react'
import { Card } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import { siteConfig } from '@/lib/site-config'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { AnimatedNumber } from '@/components/motion/animated-number'

const reviews = [
  {
    name: 'Sophie M.',
    rating: 5,
    text: "Olivier a fait un travail incroyable sur mon cover-up. Je n'espérais plus grand chose de cet ancien tatouage et le résultat dépasse toutes mes attentes. L'accueil est chaleureux, l'ambiance détendue — on se sent vraiment à l'aise.",
    date: 'Il y a 3 mois',
    highlight: 'Cover-up exceptionnel',
  },
  {
    name: 'Thomas L.',
    rating: 5,
    text: "Ça fait 5 ans que je vais chez Olivier et j'y emmène toute ma famille. Son travail est d'une régularité et d'une qualité remarquables. Je ne me ferais plus jamais tatouer ailleurs.",
    date: 'Il y a 6 mois',
    highlight: 'Client fidèle depuis 5 ans',
  },
  {
    name: 'Camille D.',
    rating: 5,
    text: "Mon premier tatouage et je l'ai fait avec Olivier. J'avais peur, des doutes, mille questions — il a tout pris le temps de m'expliquer, de me rassurer. Le résultat est exactement ce que je voulais. Je reviens très vite.",
    date: 'Il y a 1 mois',
    highlight: 'Premier tatouage en confiance',
  },
]

interface ReviewsSectionProps {
  limit?: number
  showSummary?: boolean
}

export function ReviewsSection({ limit, showSummary = true }: ReviewsSectionProps) {
  const items = limit ? reviews.slice(0, limit) : reviews

  return (
    <div>
      {showSummary && (
        <Reveal className="flex justify-center mb-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-card border border-border px-8 py-5">
            <div className="text-center">
              <div className="font-serif text-5xl font-bold text-foreground leading-none">
                <AnimatedNumber value={siteConfig.rating.value} />
              </div>
              <div className="text-muted-foreground text-sm mt-1">sur 5</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1 mb-1" aria-label={`Note de ${siteConfig.rating.value} sur 5 étoiles`}>
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" aria-hidden="true" />
                ))}
                <Star size={18} className="text-gold fill-gold opacity-70" aria-hidden="true" />
              </div>
              <div className="text-muted-foreground text-sm">
                {siteConfig.rating.count} avis {siteConfig.rating.provider}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
        {items.map((review) => (
          <StaggerItem key={review.name}>
          <Card className="bg-card border border-border hover:border-gold/30 transition-colors duration-300">
            <Quote size={20} className="text-gold/40" aria-hidden="true" />

            <div className="flex items-center gap-0.5" aria-label={`Note : ${review.rating} sur 5`}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={12} className="text-gold fill-gold" aria-hidden="true" />
              ))}
            </div>

            <span className="inline-flex w-fit text-xs text-gold tracking-wider border border-gold/30 px-2 py-0.5">
              {review.highlight}
            </span>

            <p className="text-muted-foreground text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-foreground font-medium text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.date}</p>
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-muted-foreground text-xs">Google</span>
              </div>
            </div>
          </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={siteConfig.social.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'outline', size: 'md' })}
        >
          Voir tous les avis Google
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        {limit && (
          <Link href="/avis" className={buttonVariants({ variant: 'ghost', size: 'md' })}>
            Lire tous les témoignages
          </Link>
        )}
      </div>
    </div>
  )
}
