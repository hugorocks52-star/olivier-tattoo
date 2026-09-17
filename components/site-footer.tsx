'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@heroui/react'
import { AnimatePresence, motion } from 'motion/react'
import { easeOut } from '@/lib/motion'
import { navLinks, footerLegalLinks, siteConfig } from '@/lib/site-config'
import { Reveal } from '@/components/motion/reveal'

export function SiteFooter() {
  const [showCookies, setShowCookies] = useState(true)

  return (
    <>
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-serif text-2xl text-foreground tracking-widest uppercase font-bold">Tattoo</span>
                <span className="font-serif text-2xl text-gold tracking-widest uppercase font-bold -mt-1">Lounge</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Salon de tatouage et piercing professionnel à Auvers-sur-Oise, spécialisé dans les créations personnalisées et les covers.
              </p>
              <div className="flex gap-3">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-foreground text-xs tracking-[0.2em] uppercase font-medium mb-4">Navigation</h3>
              <ul className="space-y-2" role="list">
                <li>
                  <Link href="/" className="text-muted-foreground text-sm hover:text-gold transition-colors">Accueil</Link>
                </li>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground text-sm hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/rendez-vous" className="text-muted-foreground text-sm hover:text-gold transition-colors">
                    Prendre rendez-vous
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-foreground text-xs tracking-[0.2em] uppercase font-medium mb-4">Coordonnées</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin size={13} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <address className="not-italic">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </address>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone size={13} className="text-gold shrink-0" aria-hidden="true" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">{siteConfig.phoneDisplay}</a>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="text-foreground text-xs tracking-[0.2em] uppercase font-medium mb-4">Horaires</h3>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <Clock size={13} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p>Lun – Sam : 10 h – 19 h</p>
                  <p className="mt-1">Dimanche : Fermé</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} {siteConfig.name} — Tous droits réservés
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {footerLegalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </span>
              ))}
              <span aria-hidden="true">·</span>
              <button onClick={() => setShowCookies(true)} className="hover:text-foreground transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4"
            role="region"
            aria-label="Consentement aux cookies"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                Ce site utilise des cookies de mesure d&apos;audience (Vercel Analytics) pour améliorer votre expérience.
                En continuant, vous acceptez leur utilisation.{' '}
                <Link href="/politique-de-confidentialite" className="text-gold hover:underline">
                  En savoir plus
                </Link>
              </p>
              <div className="flex gap-3 shrink-0">
                <Button variant="primary" size="sm" onPress={() => setShowCookies(false)}>
                  Accepter
                </Button>
                <Button variant="outline" size="sm" onPress={() => setShowCookies(false)}>
                  Refuser
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
