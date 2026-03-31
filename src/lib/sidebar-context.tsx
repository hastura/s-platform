'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextValue {
  isCollapsed: boolean
  isDark: boolean
  toggleCollapse: () => void
  toggleDark: () => void
}

const SidebarContext = createContext<SidebarContextValue>({
  isCollapsed: false,
  isDark: false,
  toggleCollapse: () => {},
  toggleDark: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedCollapsed = localStorage.getItem('sidebar_collapsed') === 'true'
    const storedDark = localStorage.getItem('theme') === 'dark'
    setIsCollapsed(storedCollapsed)
    setIsDark(storedDark)
    if (storedDark) document.documentElement.classList.add('dark')
  }, [])

  function toggleCollapse() {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar_collapsed', String(next))
      return next
    })
  }

  function toggleDark() {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, isDark, toggleCollapse, toggleDark }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
