import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { BookingForm } from '@/components/booking-form'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Prendre rendez-vous',
  description:
    'Demandez un rendez-vous ou un projet de tatouage à Tattoo Lounge, Auvers-sur-Oise. Olivier vous recontacte pour échanger sur votre idée.',
  alternates: { canonical: '/rendez-vous' },
}

export default function RendezVousPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Prendre rendez-vous', path: '/rendez-vous' }])
          ),
        }}
      />
      <PageHeader
        eyebrow="Projet"
        title="Parlez-moi de votre projet"
        description="Remplissez ce formulaire pour présenter votre projet à Olivier. Il vous recontactera dans les meilleurs délais pour valider votre demande et convenir d'un rendez-vous."
        breadcrumb="Prendre rendez-vous"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </div>
  )
}
