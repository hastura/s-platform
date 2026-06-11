'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'
import { IconTarget, IconRibbon, IconGear, IconChevronLeft } from '@/components/icons'

type SubNavItem = { label: string; href: string }
type NavItem = { label: string; href: string; icon: ReactNode; subItems?: SubNavItem[] }

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Company Setup',
    href: '/company-setup',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    ),
  },
  {
    label: 'OKR',
    href: '/okr',
    icon: <IconTarget size={18} />,
  },
  {
    label: 'Competencies',
    href: '/competency',
    icon: <IconRibbon size={18} />,
    subItems: [
      { label: 'Review', href: '/competency' },
      { label: 'Setup', href: '/competency/setup' },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <IconGear size={18} />,
    subItems: [
      { label: 'Invite Members', href: '/settings/invite-members' },
      { label: 'Performance Configuration', href: '/settings/performance-configuration' },
      { label: 'Schedule & Reminders', href: '/settings/schedule-reminders' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, isDark, toggleCollapse, toggleDark } = useSidebar()

  return (
    <aside
      className={cn(
        'fixed bottom-[var(--layout-gutter)] left-[var(--layout-gutter)] top-[var(--layout-gutter)]',
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-surface)]',
        'z-[var(--z-sticky)] flex flex-col overflow-hidden shadow-[var(--shadow-elevation-03)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]'
      )}
      style={{ width: isCollapsed ? 'var(--layout-sidebar-collapsed)' : 'var(--layout-sidebar-width)' }}
    >
      {/* Sidebar Header */}
      <div className="flex h-[69px] shrink-0 items-center gap-3 overflow-hidden border-b border-[var(--color-border)] px-[var(--space-4)]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary-600)] shadow-[var(--shadow-glow-primary)]">
          <span className="text-[var(--font-size-base)] font-black text-white">S</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col gap-[2px] whitespace-nowrap uppercase">
            <span className="text-[14px] font-black italic leading-[14px] tracking-[-0.35px] text-[var(--color-text-primary)]">Strativy</span>
            <span className="text-[9px] font-bold leading-[13.5px] tracking-[0.9px] text-[var(--color-text-muted)]">Platform</span>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="custom-scrollbar flex flex-1 flex-col gap-[2px] overflow-y-auto overflow-x-hidden px-[var(--space-3)] py-[var(--space-2)]">
        {navItems.map((item) => {
          const isParentActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <div key={item.href} className="w-full">
              <Link
                href={item.subItems ? item.subItems[0].href : item.href}
                title={isCollapsed ? item.label : undefined}
                aria-current={isParentActive ? 'page' : undefined}
                className={cn(
                  'flex h-[40px] items-center rounded-[var(--radius-lg)] text-[var(--font-size-xs)] tracking-[var(--letter-spacing-label)] transition-all duration-[var(--duration-normal)]',
                  isCollapsed ? 'justify-center px-0' : 'gap-3 px-[var(--space-3)]',
                  isParentActive
                    ? 'bg-[var(--color-primary-600)] font-bold text-[var(--color-text-inverse)] shadow-[var(--shadow-glow-primary-sm)]'
                    : 'font-medium text-[var(--color-text-tertiary)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]'
                )}
              >
                <span className="flex w-[18px] shrink-0 items-center justify-center">{item.icon}</span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
              {item.subItems && isParentActive && !isCollapsed && (
                <div className="flex flex-col gap-[var(--space-2)] py-[var(--space-2)]">
                  {item.subItems.map((sub) => {
                    const isSubActive = pathname === sub.href
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        aria-current={isSubActive ? 'page' : undefined}
                        className={cn(
                          'relative flex h-[32px] items-center gap-[var(--space-2)] overflow-hidden rounded-[var(--radius-lg)] pl-[14px] pr-[var(--space-2)] text-[var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] transition-all',
                          isSubActive
                            ? 'bg-[var(--color-nav-active-tint)] text-[var(--color-primary-600)]'
                            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]'
                        )}
                      >
                        {isSubActive && (
                          <span className="absolute left-[4px] top-[7px] h-[18px] w-[3px] rounded-[2px] bg-[var(--color-primary-600)]" />
                        )}
                        <span
                          className={cn(
                            'h-[6px] w-[6px] shrink-0 rounded-full',
                            isSubActive ? 'bg-[var(--color-primary-600)]' : 'bg-[var(--color-neutral-300)]'
                          )}
                        />
                        <span className="truncate">{sub.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="flex shrink-0 flex-col gap-[2px] border-t border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-2)]">
        <button
          onClick={toggleDark}
          title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
          className={cn(
            'flex h-[38px] w-full items-center rounded-[var(--radius-xl)] text-[var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)] transition-all hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
            isCollapsed ? 'justify-center px-0' : 'gap-3 px-[var(--space-3)]'
          )}
        >
          <span className="flex w-[18px] shrink-0 items-center justify-center">
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </span>
          {!isCollapsed && <span className="whitespace-nowrap">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={toggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className={cn(
            'flex h-[38px] w-full items-center rounded-[var(--radius-xl)] text-[var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)] transition-all hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
            isCollapsed ? 'justify-center px-0' : 'gap-3 px-[var(--space-3)]'
          )}
        >
          <span
            className={cn(
              'flex w-[18px] shrink-0 items-center justify-center transition-transform duration-[var(--duration-slow)]',
              isCollapsed && 'rotate-180'
            )}
          >
            <IconChevronLeft size={16} />
          </span>
          {!isCollapsed && <span className="whitespace-nowrap">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
