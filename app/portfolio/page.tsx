import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Découvrez le portfolio d'Olivier, tatoueur à Auvers-sur-Oise : réalisme, noir & gris, fineline, couleur et covers.",
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])),
        }}
      />
      <PageHeader
        eyebrow="Réalisations"
        title="Le portfolio d'Olivier"
        description="Chaque tatouage raconte une histoire. Filtrez par style pour explorer nos réalisations en réalisme, noir & gris, fineline, couleur et covers."
        breadcrumb="Portfolio"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGallery variant="full" />
        </div>
      </section>
    </div>
  )
}
