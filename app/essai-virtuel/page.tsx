import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { VirtualTryon } from '@/components/virtual-tryon'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Essayage virtuel',
  description:
    'Visualisez votre futur tatouage avant de vous lancer : importez une photo et votre motif pour un aperçu réaliste, directement dans le navigateur.',
  alternates: { canonical: '/essai-virtuel' },
}

export default function EssaiVirtuelPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Essayage virtuel', path: '/essai-virtuel' }])
          ),
        }}
      />
      <PageHeader
        eyebrow="Outil interactif"
        title={'Essayez votre tatouage\navant de vous lancer'}
        description="Importez une photo de votre corps et le motif souhaité pour visualiser le rendu en temps réel. Déplacez, redimensionnez et ajustez librement."
        breadcrumb="Essayage virtuel"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualTryon />
        </div>
      </section>
    </div>
  )
}
