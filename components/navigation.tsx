'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#salon', label: 'Le salon' },
  { href: '#essayage', label: 'Essayage virtuel' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleNavClick('#accueil') }}
            className="flex flex-col leading-none group"
            aria-label="Tattoo Lounge — retour à l'accueil"
          >
            <span className="font-serif text-xl lg:text-2xl text-foreground tracking-widest uppercase font-bold">
              Tattoo
            </span>
            <span className="font-serif text-xl lg:text-2xl text-gold tracking-widest uppercase font-bold -mt-1">
              Lounge
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <button
              onClick={() => handleNavClick('#rendez-vous')}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm tracking-wider uppercase font-medium hover:bg-primary/90 transition-all duration-200 border border-primary hover:border-gold"
            >
              Prendre rendez-vous
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-screen pb-6' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 px-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-4">
              <button
                onClick={() => handleNavClick('#rendez-vous')}
                className="w-full py-3 bg-primary text-primary-foreground text-sm tracking-wider uppercase font-medium"
              >
                Prendre rendez-vous
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
