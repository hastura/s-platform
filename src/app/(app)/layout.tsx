'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { SidebarProvider, useSidebar } from '@/lib/sidebar-context'

function AppContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <Sidebar />
      <Topbar />
      <main
        className="pt-[96px] pr-6 pb-8 min-h-screen transition-all duration-300"
        style={{ paddingLeft: isCollapsed ? '104px' : '284px' }}
      >
        {children}
      </main>
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('strativy_auth')
      if (auth !== 'true') {
        router.push('/login')
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAuthenticated(true)
      }
    }
  }, [router])

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppContent>{children}</AppContent>
    </SidebarProvider>
  )
}
