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
    <Reveal className={cn('mb-12 lg:mb-16', centered && 'text-center', className)}>
      <span className={cn('eyebrow mb-4', centered && 'justify-center')}>{eyebrow}</span>
      <h2 className="text-balance text-3xl font-black leading-tight tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className={cn('mt-5 max-w-2xl text-base leading-8 text-muted-foreground', centered && 'mx-auto')}>{description}</p>}
    </Reveal>
  )
}
