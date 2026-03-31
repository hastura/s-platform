'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'

const navItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    ),
  },
  {
    label: 'OKR Cascading',
    href: '/okr',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: 'Competency',
    href: '/competency',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, isDark, toggleCollapse, toggleDark } = useSidebar()

  return (
    <aside
      className="fixed left-[12px] top-[12px] bottom-[12px] bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-40 transition-all duration-300"
      style={{ width: isCollapsed ? '68px' : '248px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-[70px] shrink-0 border-b border-[#e2e8f0] overflow-hidden">
        <div className="w-9 h-9 bg-[#2563eb] rounded-[12px] flex items-center justify-center shadow-[0px_10px_15px_0px_rgba(59,130,246,0.3),0px_4px_6px_0px_rgba(59,130,246,0.3)] shrink-0">
          <span className="text-white font-black text-base">S</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col gap-[2px] whitespace-nowrap">
            <span className="text-[#0f172a] font-black italic text-[14px] tracking-[-0.35px] uppercase leading-none">Strativy</span>
            <span className="text-[#64748b] font-bold text-[9px] tracking-[0.9px] uppercase leading-none">Platform</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-[2px] pt-[10px] px-[10px] overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center h-[40px] rounded-[12px] text-[14px] font-semibold transition-all duration-200 overflow-hidden',
                isCollapsed ? 'justify-center px-0' : 'gap-3 pl-[12px]',
                isActive
                  ? 'bg-[#2563eb] text-white shadow-[0px_10px_15px_0px_rgba(59,130,246,0.2),0px_4px_6px_0px_rgba(59,130,246,0.2)]'
                  : 'text-[#334155] hover:bg-slate-50'
              )}
            >
              <span className={cn('shrink-0', isActive ? 'text-white' : 'text-[#334155]')}>{item.icon}</span>
              {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#e2e8f0] pt-[11px] px-[10px] pb-[10px] shrink-0">
        {/* Dark Mode */}
        <button
          onClick={toggleDark}
          title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
          className={cn(
            'flex items-center h-[38px] rounded-[12px] text-[12px] font-semibold hover:bg-slate-50 transition-all w-full',
            isCollapsed ? 'justify-center px-0' : 'gap-3 pl-[12px]',
            isDark ? 'text-[#2563eb]' : 'text-[#64748b]'
          )}
        >
          {isDark ? (
            /* Sun icon — shown in dark mode to switch back to light */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            /* Moon icon — shown in light mode */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
          {!isCollapsed && <span className="whitespace-nowrap">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Collapse */}
        <button
          onClick={toggleCollapse}
          title={isCollapsed ? 'Expand' : 'Collapse'}
          className={cn(
            'flex items-center h-[38px] rounded-[12px] text-[#64748b] text-[12px] font-semibold hover:bg-slate-50 transition-all w-full',
            isCollapsed ? 'justify-center px-0' : 'gap-3 pl-[12px]'
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('transition-transform duration-300', isCollapsed ? 'rotate-180' : '')}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
