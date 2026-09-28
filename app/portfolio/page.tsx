import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = { title: 'Portfolio', description: "Découvrez les réalisations d'Olivier en réalisme, noir & gris, fineline, couleur et cover.", alternates: { canonical: '/portfolio' } }

export default function PortfolioPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])) }} /><PageHeader eyebrow="Archives du studio" title="Le portfolio d'Olivier" description="Choisissez un style et découvrez le détail de chaque projet. Chaque pièce est conçue pour le corps et l'histoire de son propriétaire." breadcrumb="Portfolio" /><section className="section-space"><div className="container-shell"><PortfolioGallery variant="full" /></div></section></div>
}
