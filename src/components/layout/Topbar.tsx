'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/lib/sidebar-context'
import { cn } from '@/lib/utils'
import { IconBell } from '@/components/icons'

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Strativy Platform' },
  '/company-setup': { title: 'Company Setup', subtitle: 'Strativy Platform' },
  '/okr': { title: 'OKR Cascading', subtitle: 'Strativy Platform' },
  '/competency': { title: 'Competencies', subtitle: 'Review' },
  '/competency/setup': { title: 'Competencies', subtitle: 'Setup' },
  '/settings/invite-members': { title: 'Settings', subtitle: 'Invite Members' },
  '/settings/performance-configuration': { title: 'Settings', subtitle: 'Performance Configuration' },
  '/settings/schedule-reminders': { title: 'Settings', subtitle: 'Schedule & Reminders' },
  '/change-password': { title: 'Change Password', subtitle: 'Strativy Platform' },
}

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const meta = pageMeta[pathname] ?? { title: 'Dashboard', subtitle: 'Strativy Platform' }

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    setDropdownOpen(false)
    localStorage.removeItem('strativy_auth')
    router.push('/login')
  }

  function handleChangePassword() {
    setDropdownOpen(false)
    router.push('/change-password')
  }

  return (
    <header
      role="banner"
      className={cn(
        'fixed right-[var(--layout-gutter)] top-[var(--layout-gutter)] h-[var(--layout-topbar-height)]',
        'rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]',
        'z-[var(--z-sticky)] flex items-center justify-between px-[21px] shadow-[var(--shadow-elevation-01)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]'
      )}
      style={{
        left: isCollapsed
          ? 'calc(var(--layout-sidebar-collapsed) + var(--layout-gutter) + var(--layout-content-gap))'
          : 'calc(var(--layout-sidebar-width) + var(--layout-gutter) + var(--layout-content-gap))',
      }}
    >
      {/* Page title */}
      <div className="flex flex-col gap-[2px]">
        <p className="text-[15px] font-bold leading-[24px] text-[var(--color-text-primary)]">{meta.title}</p>
        <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)]">
          {meta.subtitle}
        </p>
      </div>

      {/* Right controls */}
      <div className="relative flex items-center gap-[var(--space-4)]">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-[33px] w-[33px] items-center justify-center rounded-[10px] bg-[var(--color-surface-subtle)] text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-neutral-200)] hover:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
        >
          <IconBell size={18} />
          <span className="absolute right-[6px] top-[6px] h-[7px] w-[7px] rounded-full border border-white bg-[var(--color-danger-500)]" />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="Account menu"
            aria-expanded={dropdownOpen}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary-500)] shadow-[var(--shadow-glow-primary)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
          >
            <span className="text-[var(--font-size-base)] font-black text-white">A</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] z-[var(--z-modal)] w-[240px] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-xl)]">
              <div className="border-b border-[var(--color-neutral-100)] bg-[var(--color-bg-page)] px-[var(--space-4)] py-[var(--space-4)]">
                <div className="flex items-center gap-[var(--space-3)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-500)] shadow-[var(--shadow-button-primary)]">
                    <span className="text-[var(--font-size-base)] font-black text-white">A</span>
                  </div>
                  <div className="flex min-w-0 flex-col gap-0">
                    <p className="truncate text-[var(--font-size-sm)] font-bold leading-none text-[var(--color-text-primary)]">Admin User</p>
                    <p className="mt-1 truncate text-[var(--font-size-xs)] font-medium leading-none text-[var(--color-text-tertiary)]">admin@strativy.com</p>
                  </div>
                </div>
              </div>

              <div className="p-[var(--space-2)]">
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="flex h-[40px] w-full items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-3)] text-left text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile Settings
                </button>

                <button
                  onClick={handleChangePassword}
                  className={cn(
                    'flex h-[40px] w-full items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-3)] text-left text-[var(--font-size-sm)] font-semibold transition-all hover:bg-[var(--color-neutral-100)]',
                    pathname === '/change-password'
                      ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                      : 'text-[var(--color-text-secondary)]'
                  )}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Security & Password
                </button>

                <div className="my-[var(--space-2)] border-t border-[var(--color-neutral-100)]" />

                <button
                  onClick={handleLogout}
                  className="flex h-[40px] w-full items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-3)] text-left text-[var(--font-size-sm)] font-semibold text-[var(--color-danger-600)] transition-all hover:bg-[var(--color-danger-50)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
