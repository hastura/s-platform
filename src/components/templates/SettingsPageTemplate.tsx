import * as React from 'react'
import { SettingsSubNav } from '@/components/molecules/settings-sub-nav/SettingsSubNav'
import { cn } from '@/lib/utils'

export interface SettingsPageTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Settings section page shell — content area below Topbar.
 * Sidebar sub-nav and page title are handled by Sidebar + Topbar.
 */
const SettingsPageTemplate = React.forwardRef<HTMLDivElement, SettingsPageTemplateProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col gap-[var(--space-4)]', className)}
        {...props}
      >
        <SettingsSubNav />
        {children}
      </div>
    )
  }
)
SettingsPageTemplate.displayName = 'SettingsPageTemplate'

export { SettingsPageTemplate }
