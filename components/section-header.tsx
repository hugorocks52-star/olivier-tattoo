import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, description, align = 'left', className }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <Reveal className={cn('mb-12', centered && 'text-center', className)}>
      <div className={cn('flex items-center gap-3 mb-4', centered && 'justify-center')}>
        <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
        <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">{eyebrow}</span>
        {centered && <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />}
      </div>
      <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">{title}</h2>
      {description && (
        <p className={cn('text-muted-foreground text-lg leading-relaxed max-w-2xl', centered && 'mx-auto')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
