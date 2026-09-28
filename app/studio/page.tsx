import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StudioSection } from '@/components/studio-section'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = { title: 'Le studio', description: "Découvrez Tattoo Lounge, l'approche d'Olivier et plus de 18 ans d'expérience dans la création de tatouages sur mesure.", alternates: { canonical: '/studio' } }

export default function StudioPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Le studio', path: '/studio' }])) }} /><PageHeader eyebrow="Derrière chaque création" title="18 ans d'expérience, de précision et de passion" description="Découvrez le lieu, l'approche d'Olivier et les valeurs qui guident chaque projet." breadcrumb="Le studio" /><section className="section-space"><div className="container-shell"><StudioSection variant="full" /><div className="mt-16 text-center"><Button asChild size="lg"><Link href="/rendez-vous">Prendre rendez-vous avec Olivier <ArrowRight /></Link></Button></div></div></section></div>
}
