import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { Stagger, StaggerItem } from '@/components/motion/reveal'

export function ContactSection() {
  const today = new Date().getDay()

  return (
    <Stagger className="grid lg:grid-cols-2 gap-12">
      <StaggerItem className="space-y-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-md shrink-0 flex items-center justify-center bg-primary/10">
            <MapPin size={18} className="text-gold" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-foreground font-medium mb-1">Adresse</h3>
            <address className="not-italic text-muted-foreground text-sm leading-relaxed">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              {siteConfig.address.region}, France
            </address>
            <a
              href={siteConfig.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-gold text-sm hover:text-gold/80 transition-colors"
            >
              <Navigation size={13} aria-hidden="true" />
              Obtenir l&apos;itinéraire
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-md shrink-0 flex items-center justify-center bg-primary/10">
            <Phone size={18} className="text-gold" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-foreground font-medium mb-1">Téléphone</h3>
            <a href={`tel:${siteConfig.phone}`} className="text-muted-foreground text-sm hover:text-gold transition-colors">
              {siteConfig.phoneDisplay}
            </a>
            <div className="mt-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs tracking-wider uppercase hover:bg-primary/90 transition-colors"
              >
                <Phone size={12} aria-hidden="true" />
                Appeler le studio
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-md shrink-0 flex items-center justify-center bg-primary/10">
            <Clock size={18} className="text-gold" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground font-medium mb-3">Horaires d&apos;ouverture</h3>
            <table className="w-full" aria-label="Horaires du studio">
              <tbody>
                {siteConfig.hours.map(({ day, hours }, index) => {
                  const dayIndex = index === 6 ? 0 : index + 1
                  const isToday = dayIndex === today
                  return (
                    <tr key={day} className={isToday ? 'text-foreground' : 'text-muted-foreground'}>
                      <td className={`text-sm py-1 pr-4 font-medium ${isToday ? 'text-gold' : ''}`}>{day}</td>
                      <td className="text-sm py-1">{hours}</td>
                      {isToday && <td className="text-xs py-1 pl-2 text-gold">(Aujourd&apos;hui)</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-foreground font-medium mb-3">Réseaux sociaux</h3>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm hover:border-gold hover:text-foreground transition-colors"
              aria-label="Instagram Tattoo Lounge (ouvre dans un nouvel onglet)"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground text-sm hover:border-gold hover:text-foreground transition-colors"
              aria-label="Facebook Tattoo Lounge (ouvre dans un nouvel onglet)"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </StaggerItem>

      <StaggerItem className="relative">
        <div className="media-frame w-full h-80 lg:h-full min-h-64 bg-surface border border-border">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.145,49.065,2.195,49.090&layer=mapnik&marker=49.0766,2.1720"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) brightness(0.85)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte de Tattoo Lounge à Auvers-sur-Oise"
          />
        </div>
        <a
          href={siteConfig.mapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-background/90 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-gold transition-colors"
          aria-label="Ouvrir dans Google Maps (nouvel onglet)"
        >
          <ExternalLink size={11} />
          Google Maps
        </a>
      </StaggerItem>
    </Stagger>
  )
}
