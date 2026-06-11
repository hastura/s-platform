'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import {
  OKR_LEVEL_LABEL,
  OKR_LEVEL_ICON_BG,
} from '@/lib/okr-utils'
import type { Objective } from '@/types/okr'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'
import { IconClose } from '@/components/icons'

export interface OKRDetailDrawerProps {
  open: boolean
  objective: Objective | null
  onClose: () => void
  onAddKeyResult?: (objective: Objective) => void
}

export function OKRDetailDrawer({ open, objective, onClose, onAddKeyResult }: OKRDetailDrawerProps) {
  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open || !objective || typeof document === 'undefined') return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[var(--z-modal)] bg-neutral-900/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Objective details: ${objective.title}`}
        className={cn(
          'fixed right-0 top-0 z-[calc(var(--z-modal)+1)] flex h-full w-full max-w-[576px] flex-col',
          'rounded-l-2xl border-l border-neutral-200 bg-white shadow-2xl'
        )}
      >
        <div className="flex items-start justify-between px-8 pb-6 pt-8">
          <div className="flex gap-4">
            <div
              className={cn(
                'flex size-[60px] items-center justify-center rounded-2xl shadow-xs',
                OKR_LEVEL_ICON_BG[objective.level]
              )}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2" aria-hidden="true">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-black leading-tight tracking-tight text-neutral-900">
                {objective.title}
              </h2>
              <p className="border-b border-neutral-200 pb-1 text-[10px] font-black uppercase tracking-[1px] text-neutral-500">
                Level: {OKR_LEVEL_LABEL[objective.level]}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="flex size-12 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <IconClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-2">
          <h3 className="mb-4 text-sm font-black uppercase tracking-[1.4px] text-neutral-500">
            Key Results
          </h3>

          <div className="flex flex-col gap-4">
            {objective.keyResults.map((kr) => (
              <div
                key={kr.id}
                className="rounded-xl border border-neutral-200 bg-neutral-100 p-4 transition-colors hover:border-primary-100"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h4 className="text-base font-bold leading-snug text-neutral-900">{kr.title}</h4>
                  <span className="shrink-0 rounded-lg bg-primary-50 px-2 py-1 text-xs font-black text-primary-600">
                    Weight: {kr.weight}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-4">
                  <ProgressBar
                    value={kr.progress}
                    size="md"
                    fillClassName="bg-primary-500"
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-sm font-black text-neutral-900">{kr.progress}%</span>
                </div>
                <p className="text-xs text-neutral-500">
                  {kr.current} / {kr.target}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-neutral-100 px-8 py-6">
          <button
            type="button"
            onClick={() => onAddKeyResult?.(objective)}
            aria-label="Open Strativy Brain"
            className="flex size-[60px] items-center justify-center rounded-full bg-neutral-900 text-white shadow-elevation-03 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="6" r="2" /><circle cx="6" cy="14" r="2" /><circle cx="18" cy="14" r="2" /><circle cx="12" cy="18" r="2" />
            </svg>
          </button>
        </div>
      </aside>
    </>,
    document.body
  )
}
