'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fingerprint, Menu, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/lib/site-config'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: easeOut }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Navigation principale"
        className={cn(
          'mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5 lg:h-[4.5rem]',
          scrolled || open ? 'border-white/10 bg-background/95 shadow-xl shadow-black/25 sm:bg-background/88 sm:backdrop-blur-xl' : 'border-white/8 bg-black/65 sm:bg-black/20 sm:backdrop-blur-md'
        )}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Tattoo Lounge, accueil">
          <span className="grid size-10 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_35px_-14px_rgba(214,173,106,0.9)]"><Fingerprint className="size-5" aria-hidden="true" /></span>
          <span className="leading-tight"><span className="block text-base font-black tracking-tight text-foreground">Tattoo Lounge</span><span className="block text-[0.6rem] tracking-[0.17em] text-muted-foreground">ATELIER D&apos;OLIVIER</span></span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={cn('relative rounded-lg px-3.5 py-2 text-sm transition-colors', pathname === link.href ? 'bg-white/[0.07] text-primary' : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground')}>{link.label}</Link></li>)}
        </ul>

        <div className="hidden items-center gap-2 lg:flex"><Button asChild variant="ghost" size="icon" aria-label="Appeler le studio"><a href={`tel:${siteConfig.phone}`}><Phone aria-hidden="true" /></a></Button><Button asChild><Link href="/rendez-vous">Prendre rendez-vous</Link></Button></div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Ouvrir le menu"><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent side="right" className="w-[88vw] border-white/10 bg-background p-0 sm:bg-background/96 sm:backdrop-blur-2xl">
            <SheetHeader className="border-b border-white/10 p-6 text-left"><SheetTitle className="text-lg">Tattoo Lounge</SheetTitle><SheetDescription>Une création unique, pensée pour vous.</SheetDescription></SheetHeader>
            <div className="flex flex-1 flex-col px-4 py-5">
              <nav aria-label="Navigation mobile" className="space-y-1">
                {[{ href: '/', label: 'Accueil' }, ...navLinks].map((link) => <SheetClose asChild key={link.href}><Link href={link.href} className={cn('flex items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-colors', pathname === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/[0.05] hover:text-foreground')}>{link.label}<span className="text-xs text-white/25">→</span></Link></SheetClose>)}
              </nav>
              <div className="mt-auto space-y-3 border-t border-white/10 pt-5"><SheetClose asChild><Button asChild size="lg" className="w-full"><Link href="/rendez-vous">Prendre rendez-vous</Link></Button></SheetClose><Button asChild variant="outline" size="lg" className="w-full"><a href={`tel:${siteConfig.phone}`}><Phone />{siteConfig.phoneDisplay}</a></Button></div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
