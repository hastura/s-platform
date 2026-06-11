import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IconArrowUpRight } from '@/components/icons/IconArrowUpRight'

export interface QuickAccessCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string
  description: string
  badge: string
  icon: React.ReactNode
  gradientStyle: React.CSSProperties
  href: string
}

const QuickAccessCard = React.forwardRef<HTMLAnchorElement, QuickAccessCardProps>(
  ({ className, title, description, badge, icon, gradientStyle, href, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          'group relative flex min-h-[188px] flex-col rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] shadow-[var(--shadow-xs)] transition-shadow hover:shadow-[var(--shadow-md)]',
          className
        )}
        {...props}
      >
        <div
          className="mb-[var(--space-4)] flex size-11 items-center justify-center rounded-[var(--radius-xl)] text-white shadow-[var(--shadow-lg)]"
          style={gradientStyle}
        >
          {icon}
        </div>

        <div className="mb-[var(--space-1)] flex items-start justify-between gap-[var(--space-2)]">
          <h4 className="text-[var(--font-size-base)] font-bold leading-[24px] text-[var(--color-text-primary)]">{title}</h4>
          <IconArrowUpRight
            size={16}
            className="shrink-0 text-[var(--color-text-tertiary)] transition-colors group-hover:text-[var(--color-primary-600)]"
          />
        </div>

        <p className="mb-[var(--space-4)] text-[var(--font-size-xs)] leading-[19.5px] text-[var(--color-text-muted)]">
          {description}
        </p>

        <span className="mt-auto inline-flex w-fit rounded-[var(--radius-full)] bg-[var(--color-neutral-100)] px-[var(--space-2-5)] py-[var(--space-1)] text-[11px] font-bold leading-[16.5px] text-[var(--color-text-muted)]">
          {badge}
        </span>
      </Link>
    )
  }
)
QuickAccessCard.displayName = 'QuickAccessCard'

export { QuickAccessCard }
