import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { AboutSection } from '@/components/about-section'
import { VirtualTryon } from '@/components/virtual-tryon'
import { ReviewsSection } from '@/components/reviews-section'
import { BookingSection } from '@/components/booking-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />

      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />

      <PortfolioSection />

      <div className="section-divider" aria-hidden="true" />

      <AboutSection />

      <div className="section-divider" aria-hidden="true" />

      <VirtualTryon />

      <div className="section-divider" aria-hidden="true" />

      <ReviewsSection />

      <div className="section-divider" aria-hidden="true" />

      <BookingSection />

      <div className="section-divider" aria-hidden="true" />

      <ContactSection />

      <Footer />
    </main>
  )
}
