'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Clock3, Fingerprint, MapPin, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { easeOut } from '@/lib/motion'
import { footerLegalLinks, navLinks, siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  const [showCookies, setShowCookies] = useState(true)

  const chooseCookies = (choice: 'accepted' | 'declined') => {
    localStorage.setItem('cookie-choice', choice)
    setShowCookies(false)
  }

  return (
    <>
      <footer className="relative overflow-hidden border-t border-white/10 bg-[#0c0909] pt-20">
        <div className="absolute right-0 top-0 hidden size-96 rounded-full bg-wine/15 blur-[110px] sm:block" aria-hidden="true" />
        <div className="container-shell relative">
          <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_1fr_1fr]">
            <div>
              <Link href="/" className="mb-5 inline-flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary"><Fingerprint className="size-5" /></span><span><strong className="block text-lg">Tattoo Lounge</strong><span className="text-[0.65rem] tracking-[0.18em] text-muted-foreground">ATELIER D&apos;OLIVIER</span></span></Link>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">Salon de tatouage et piercing à Auvers-sur-Oise, spécialisé dans les créations sur mesure, le réalisme, la fineline et les covers.</p>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><Camera className="size-4" /> Instagram</a>
            </div>
            <div><h3 className="mb-5 text-sm font-bold text-foreground">Navigation</h3><ul className="space-y-3 text-sm text-muted-foreground"><li><Link href="/" className="hover:text-primary">Accueil</Link></li>{navLinks.slice(0, 4).map((link) => <li key={link.href}><Link href={link.href} className="hover:text-primary">{link.label}</Link></li>)}</ul></div>
            <div><h3 className="mb-5 text-sm font-bold text-foreground">Coordonnées</h3><div className="space-y-4 text-sm text-muted-foreground"><div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><address className="not-italic leading-7">{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}</address></div><a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 transition-colors hover:text-primary"><Phone className="size-4 text-primary" /><span>{siteConfig.phoneDisplay}</span></a></div></div>
            <div><h3 className="mb-5 text-sm font-bold text-foreground">Horaires</h3><div className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"><Clock3 className="mt-1 size-4 shrink-0 text-primary" /><div><p>Lundi au samedi</p><p className="text-foreground">10 h – 19 h</p><p className="mt-2">Dimanche fermé</p></div></div></div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-muted-foreground sm:flex-row"><p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p><div className="flex flex-wrap items-center justify-center gap-4">{footerLegalLinks.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}<button onClick={() => setShowCookies(true)} className="cursor-pointer hover:text-foreground">Cookies</button></div></div>
        </div>
      </footer>

      <AnimatePresence>
        {showCookies && <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.4, ease: easeOut }} className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-popover p-4 shadow-xl shadow-black/40 sm:bg-popover/95 sm:p-5 sm:backdrop-blur-2xl" role="region" aria-label="Préférences de cookies"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><p className="flex-1 text-xs leading-6 text-muted-foreground">Nous utilisons des données de visite anonymes pour améliorer votre expérience. Consultez notre <Link href="/politique-de-confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>.</p><div className="flex gap-2"><Button size="sm" onClick={() => chooseCookies('accepted')}>Accepter</Button><Button size="sm" variant="outline" onClick={() => chooseCookies('declined')}>Refuser</Button></div></div></motion.div>}
      </AnimatePresence>
    </>
  )
}
