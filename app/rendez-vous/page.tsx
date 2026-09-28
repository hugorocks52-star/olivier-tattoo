import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { BookingForm } from '@/components/booking-form'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = { title: 'Prendre rendez-vous', description: 'Présentez votre projet à Tattoo Lounge. Olivier vous recontacte pour parler du dessin, du budget et des disponibilités.', alternates: { canonical: '/rendez-vous' } }

export default function BookingPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Prendre rendez-vous', path: '/rendez-vous' }])) }} /><PageHeader eyebrow="Démarrer un projet" title="Tout commence par votre idée" description="Présentez votre projet avec le plus de détails possible. Olivier vous recontactera pour discuter du dessin, du budget et du meilleur moment pour la séance." breadcrumb="Prendre rendez-vous" /><section className="section-space"><div className="container-shell max-w-5xl"><BookingForm /></div></section></div>
}
