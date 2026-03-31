'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/lib/sidebar-context'
import { cn } from '@/lib/utils'

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Strativy Platform' },
  '/company-setup': { title: 'Company Setup', subtitle: 'Strativy Platform' },
  '/okr': { title: 'OKR Cascading', subtitle: 'Strativy Platform' },
  '/competency': { title: 'Competency', subtitle: 'Strativy Platform' },
  '/performance': { title: 'Performance', subtitle: 'Strativy Platform' },
  '/change-password': { title: 'Change Password', subtitle: 'Strativy Platform' },
}

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const meta = pageMeta[pathname] ?? { title: 'Dashboard', subtitle: 'Strativy Platform' }

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
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
      className="fixed top-[16px] right-[16px] h-[64px] bg-[rgba(255,255,255,0.9)] backdrop-blur-md border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] flex items-center justify-between px-[21px] z-30 transition-all duration-300"
      style={{ left: isCollapsed ? '108px' : '288px' }}
    >
      {/* Page title */}
      <div className="flex flex-col gap-[2px]">
        <p className="text-[#0f172a] font-black text-[16px] leading-[16px]">{meta.title}</p>
        <p className="text-[#64748b] font-medium text-[10px] leading-[15px]">{meta.subtitle}</p>
      </div>

      {/* Right controls */}
      <div className="relative flex items-center gap-[8px]">
        {/* Search */}
        <div className="flex items-center gap-[8px] bg-[#f1f5f9] border border-transparent rounded-[12px] h-[38px] px-[13px] w-[192px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[#64748b] text-[14px] font-normal">Search...</span>
        </div>

        {/* Bell */}
        <div className="relative bg-[#f1f5f9] rounded-[12px] w-[33px] h-[33px] flex items-center justify-center">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-[#ef4444] rounded-full" />
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-[32px] h-[32px] rounded-[12px] flex items-center justify-center shadow-[0px_4px_6px_0px_rgba(59,130,246,0.3),0px_2px_4px_0px_rgba(59,130,246,0.3)] focus:outline-none"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
          >
            <span className="text-white font-black text-[12px] leading-[16px]">A</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] overflow-hidden z-50">
              {/* User info header */}
              <div className="px-[16px] py-[14px] border-b border-[#f1f5f9]">
                <div className="flex items-center gap-[10px]">
                  <div
                    className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[0px_2px_4px_0px_rgba(59,130,246,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
                  >
                    <span className="text-white font-black text-[13px]">A</span>
                  </div>
                  <div className="flex flex-col gap-[2px] min-w-0">
                    <p className="text-[#0f172a] font-bold text-[13px] leading-none truncate">Admin User</p>
                    <p className="text-[#64748b] font-normal text-[11px] leading-none truncate">admin@strativy.com</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-[6px]">
                {/* Profile */}
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-[10px] w-full h-[38px] px-[10px] rounded-[10px] text-[#334155] text-[13px] font-medium hover:bg-[#f1f5f9] transition-colors text-left"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </button>

                {/* Change Password */}
                <button
                  onClick={handleChangePassword}
                  className={cn(
                    'flex items-center gap-[10px] w-full h-[38px] px-[10px] rounded-[10px] text-[13px] font-medium hover:bg-[#f1f5f9] transition-colors text-left',
                    pathname === '/change-password' ? 'text-[#2563eb] bg-[#eff6ff]' : 'text-[#334155]'
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Change Password
                </button>

                {/* Divider */}
                <div className="my-[6px] border-t border-[#f1f5f9]" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[10px] w-full h-[38px] px-[10px] rounded-[10px] text-[#ef4444] text-[13px] font-medium hover:bg-[#fef2f2] transition-colors text-left"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
