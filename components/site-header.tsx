'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { Drawer } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'
import { motion } from 'motion/react'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/lib/site-config'

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || isOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex flex-col leading-none group" aria-label="Tattoo Lounge — retour à l'accueil">
            <span className="font-serif text-xl lg:text-2xl text-foreground tracking-widest uppercase font-bold">
              Tattoo
            </span>
            <span className="font-serif text-xl lg:text-2xl text-gold tracking-widest uppercase font-bold -mt-1">
              Lounge
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-sm tracking-wider uppercase transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300',
                      active
                        ? 'text-foreground after:w-full'
                        : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:flex">
            <Link href="/rendez-vous" className={buttonVariants({ variant: 'primary', size: 'md' })}>
              Prendre rendez-vous
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <Drawer.Root isOpen={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger className="lg:hidden p-2 text-foreground" aria-label="Ouvrir le menu">
              <Menu size={22} aria-hidden="true" />
            </Drawer.Trigger>
            <Drawer.Backdrop>
              <Drawer.Content placement="right" className="w-[85vw] max-w-sm">
                <Drawer.Dialog className="flex h-full flex-col bg-background">
                  <Drawer.Header className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                    <Drawer.Heading className="font-serif text-lg tracking-widest uppercase text-foreground">
                      Menu
                    </Drawer.Heading>
                    <Drawer.CloseTrigger
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Fermer le menu"
                    >
                      <X size={20} aria-hidden="true" />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>
                  <Drawer.Body className="flex-1 overflow-y-auto px-6 py-6">
                    <ul className="flex flex-col gap-1" role="list">
                      <li>
                        <Link
                          href="/"
                          onClick={closeMenu}
                          className="block w-full py-3 text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors"
                        >
                          Accueil
                        </Link>
                      </li>
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className="block w-full py-3 text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Drawer.Body>
                  <Drawer.Footer className="px-6 pb-8 pt-4 border-t border-border flex flex-col gap-3">
                    <Link href="/rendez-vous" onClick={closeMenu} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}>
                      Prendre rendez-vous
                    </Link>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full')}
                    >
                      <Phone size={14} aria-hidden="true" />
                      {siteConfig.phoneDisplay}
                    </a>
                  </Drawer.Footer>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer.Root>
        </div>
      </nav>
    </motion.header>
  )
}
