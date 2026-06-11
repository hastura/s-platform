'use client'

import { useToastStore, type ToastVariant } from '@/lib/stores/toast-store'
import { cn } from '@/lib/utils'
import { IconAlertTriangle, IconCheckCircle, IconClose, IconInfo } from '@/components/icons'

const VARIANT_STYLES: Record<ToastVariant, { icon: React.ReactNode; accent: string }> = {
  success: {
    icon: <IconCheckCircle size={18} />,
    accent: 'text-[var(--color-success-600)] border-[var(--color-success-200)]',
  },
  error: {
    icon: <IconAlertTriangle size={18} />,
    accent: 'text-[var(--color-danger-600)] border-[var(--color-danger-200)]',
  },
  warning: {
    icon: <IconAlertTriangle size={18} />,
    accent: 'text-[var(--color-warning-600)] border-[var(--color-warning-200)]',
  },
  info: {
    icon: <IconInfo size={18} />,
    accent: 'text-[var(--color-primary-600)] border-[var(--color-primary-200)]',
  },
}

/** Global toast viewport — render once in the app layout. */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-[var(--space-6)] right-[var(--space-6)] z-[var(--z-toast)] flex w-[360px] max-w-[calc(100vw-32px)] flex-col gap-[var(--space-2)]"
    >
      {toasts.map((t) => {
        const style = VARIANT_STYLES[t.variant]
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-[var(--space-3)] rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-[var(--space-4)] shadow-[var(--shadow-elevation-02)]',
              style.accent
            )}
          >
            <span className="mt-[1px] shrink-0">{style.icon}</span>
            <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
              <p className="text-[var(--font-size-sm)] font-bold text-[var(--color-text-primary)]">{t.title}</p>
              {t.description && (
                <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
                  {t.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-[var(--radius-sm)] p-[2px] text-[var(--color-neutral-400)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <IconClose size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
