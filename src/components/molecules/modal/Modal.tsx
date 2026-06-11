'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { IconClose } from '@/components/icons'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  /** Hide the default header (title/subtitle/close) for fully custom content. */
  hideHeader?: boolean
  widthClassName?: string
}

/**
 * Base modal — white panel, rounded-lg, header with title/subtitle + close,
 * scrollable body and pinned footer. Matches the Figma settings modals.
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  hideHeader = false,
  widthClassName = 'max-w-[650px]',
}: ModalProps) {
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    const previouslyFocused = document.activeElement as HTMLElement | null
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('input, select, button')?.focus()
    })
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-[var(--space-4)]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'flex max-h-[calc(100vh-48px)] w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-2xl)]',
          widthClassName
        )}
      >
        {!hideHeader && (
          <div className="flex h-[84.5px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-2">
            <div className="flex flex-col gap-0.5 px-2">
              <h2 className="text-lg font-semibold leading-7 text-[var(--color-text-primary)]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm leading-5 text-[var(--color-text-secondary)]">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex size-12 items-center justify-center rounded-lg text-[var(--color-neutral-400)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <IconClose size={24} />
            </button>
          </div>
        )}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-[24px] py-[20px]">{children}</div>
        {footer && (
          <div className="flex h-[72px] shrink-0 items-center justify-center gap-[16px] border-t border-[var(--color-neutral-300)] pt-px px-[8px]">
            <div className="flex h-[72px] w-full items-center justify-center gap-[16px] px-[8px]">{footer}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
