import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DashboardPageTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  greetingName: string
  greetingSubtitle: string
  children: React.ReactNode
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const DashboardPageTemplate = React.forwardRef<HTMLDivElement, DashboardPageTemplateProps>(
  ({ className, greetingName, greetingSubtitle, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-[var(--space-12)]', className)} {...props}>
        <header className="flex min-h-[54px] items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <h1 className="text-[var(--font-size-2xl)] font-black leading-[32px] tracking-[-0.6px] text-[var(--color-neutral-900)]">
              {getGreeting()}, {greetingName}
            </h1>
            <p className="text-[var(--font-size-sm)] leading-[normal] text-[var(--color-text-muted)]">{greetingSubtitle}</p>
          </div>
        </header>

        {children}
      </div>
    )
  }
)
DashboardPageTemplate.displayName = 'DashboardPageTemplate'

export { DashboardPageTemplate }
