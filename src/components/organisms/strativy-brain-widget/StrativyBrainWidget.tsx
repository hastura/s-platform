'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconClose, IconCheck } from '@/components/icons'

export interface StrativyBrainWidgetProps {
  className?: string
}

export function StrativyBrainWidget({ className }: StrativyBrainWidgetProps) {
  const [open, setOpen] = React.useState(true)
  const [query, setQuery] = React.useState('')

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Strativy Brain"
        className={cn(
          'fixed bottom-6 right-6 z-[var(--z-toast)] flex h-16 min-w-[200px] items-center justify-between rounded-md bg-neutral-900 px-4 text-sm font-medium text-white shadow-[var(--shadow-elevation-03)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          className
        )}
      >
        <span>Strativy Brain</span>
        <IconClose size={16} className="text-neutral-400" />
      </button>
    )
  }

  return (
      <div
        className={cn(
          'fixed bottom-6 right-6 z-[var(--z-toast)] w-[480px] overflow-hidden rounded-xl bg-white shadow-[var(--shadow-elevation-02)]',
          className
        )}
      >
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-3 py-2">
        <span className="text-sm text-neutral-900">Strativy Brain</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close Strativy Brain"
          className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <IconClose size={16} />
        </button>
      </div>

      <div className="px-2 py-1">
        <p className="px-1 py-1 text-xs font-medium tracking-[0.72px] text-neutral-400">Option</p>
        <div className="overflow-hidden rounded-lg border border-[var(--color-border-subtle)]">
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-[var(--color-border-subtle)] bg-primary-50 px-3 py-2 text-left transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
          >
            <div>
              <p className="text-xs font-medium text-neutral-900">OKR Setup</p>
              <p className="text-xs font-medium text-neutral-400">Auto-generate OKRs by uploading data</p>
            </div>
            <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary-800 text-white">
              <IconCheck size={12} />
            </div>
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-white px-3 py-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything…"
            aria-label="Ask Strativy Brain"
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
          />
          <button
            type="button"
            aria-label="Send message"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
