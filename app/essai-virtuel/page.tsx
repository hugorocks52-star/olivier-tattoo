import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { VirtualTryon } from '@/components/virtual-tryon'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = { title: 'Essayage virtuel', description: 'Visualisez votre motif sur le corps avant la séance et ajustez sa taille, sa position, son angle et son rendu.', alternates: { canonical: '/essai-virtuel' } }

export default function VirtualTryonPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Essayage virtuel', path: '/essai-virtuel' }])) }} /><PageHeader eyebrow="Outil interactif" title={'Visualisez votre tatouage\navant de vous lancer'} description="Importez une photo et votre motif, puis ajustez librement sa position, sa taille, son angle et son intensité." breadcrumb="Essayage virtuel" /><section className="section-space"><div className="container-shell"><VirtualTryon /></div></section></div>
}
