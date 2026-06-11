import * as React from 'react'
import { QuickAccessCard } from '@/components/molecules/quick-access-card/QuickAccessCard'
import { IconBuilding } from '@/components/icons/IconBuilding'
import { IconTarget } from '@/components/icons/IconTarget'
import { IconRibbon } from '@/components/icons/IconRibbon'
import type { DashboardQuickAccessItem } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export interface QuickAccessRowProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DashboardQuickAccessItem[]
}

const QUICK_ACCESS_ICONS: Record<string, React.ReactNode> = {
  'Company Setup': <IconBuilding size={20} className="text-white" />,
  'OKR Cascading': <IconTarget size={20} className="text-white" />,
  'Competency Hub': <IconRibbon size={20} className="text-white" />,
}

const QuickAccessRow = React.forwardRef<HTMLDivElement, QuickAccessRowProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--space-3)]', className)} {...props}>
        <h3 className="text-[var(--font-size-base)] font-black text-[var(--color-text-primary)]">Quick Access</h3>
        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3">
          {items.map((item) => (
            <QuickAccessCard
              key={item.href}
              title={item.title}
              description={item.description}
              badge={item.badge}
              href={item.href}
              gradientStyle={item.gradientStyle}
              icon={QUICK_ACCESS_ICONS[item.title]}
            />
          ))}
        </div>
      </div>
    )
  }
)
QuickAccessRow.displayName = 'QuickAccessRow'

export { QuickAccessRow }
