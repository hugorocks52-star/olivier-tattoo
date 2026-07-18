import { Star, ExternalLink, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Sophie M.',
    rating: 5,
    text: 'Olivier a fait un travail incroyable sur mon cover-up. Je n\'espérais plus grand chose de cet ancien tatouage et le résultat dépasse toutes mes attentes. L\'accueil est chaleureux, l\'ambiance détendue — on se sent vraiment à l\'aise.',
    date: 'Il y a 3 mois',
    highlight: 'Cover-up exceptionnel',
  },
  {
    name: 'Thomas L.',
    rating: 5,
    text: 'Ça fait 5 ans que je vais chez Olivier et j\'y emmène toute ma famille. Son travail est d\'une régularité et d\'une qualité remarquables. Je ne me ferais plus jamais tatouer ailleurs.',
    date: 'Il y a 6 mois',
    highlight: 'Client fidèle depuis 5 ans',
  },
  {
    name: 'Camille D.',
    rating: 5,
    text: 'Mon premier tatouage et je l\'ai fait avec Olivier. J\'avais peur, des doutes, mille questions — il a tout pris le temps de m\'expliquer, de me rassurer. Le résultat est exactement ce que je voulais. Je reviens très vite.',
    date: 'Il y a 1 mois',
    highlight: 'Premier tatouage en confiance',
  },
]

export function ReviewsSection() {
  return (
    <section id="avis" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Témoignages</span>
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Ce que disent nos clients
          </h2>

          {/* Rating summary */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-card border border-border px-8 py-5">
            <div className="text-center">
              <div className="font-serif text-5xl font-bold text-foreground leading-none">4,7</div>
              <div className="text-muted-foreground text-sm mt-1">sur 5</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-1 mb-1" aria-label="Note de 4,7 sur 5 étoiles">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" aria-hidden="true" />
                ))}
                <Star size={18} className="text-gold fill-gold opacity-70" aria-hidden="true" />
              </div>
              <div className="text-muted-foreground text-sm">217 avis Google</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="bg-card border border-border p-6 hover:border-gold/30 transition-colors duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-gold/40 mb-4 flex-shrink-0" aria-hidden="true" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3" aria-label={`Note : ${review.rating} sur 5`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-gold fill-gold" aria-hidden="true" />
                ))}
              </div>

              {/* Highlight tag */}
              <div className="inline-flex mb-3">
                <span className="text-xs text-gold tracking-wider border border-gold/30 px-2 py-0.5">
                  {review.highlight}
                </span>
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-foreground font-medium text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground text-xs">Google</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://maps.app.goo.gl/EnfAfA6CukYU2opB8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-all duration-200 text-sm tracking-wider uppercase"
          >
            Voir tous les avis Google
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
