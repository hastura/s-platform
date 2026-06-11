'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/settings/invite-members', label: 'Invite Members' },
  { href: '/settings/performance-configuration', label: 'Performance Configuration' },
  { href: '/settings/schedule-reminders', label: 'Schedule & Reminders' },
] as const

/** Settings section chips — Figma Frame 2 (Chip-Data/LG). */
export function SettingsSubNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Settings sections" className="flex h-[32px] items-center gap-[var(--space-2)]">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-[32px] items-center justify-center rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-1)] font-jakarta text-[var(--font-size-sm)] font-semibold tracking-[0.035px] shadow-[var(--shadow-elevation-02)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
              active
                ? 'bg-[var(--color-primary-600)] text-white'
                : 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-600)]'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
