'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconCalendar, IconChevronLeft, IconChevronRight } from '@/components/icons'

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatDisplayDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`
}

function toIso(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

interface CalendarCell {
  iso: string
  day: number
  inMonth: boolean
}

function buildCalendar(year: number, month: number): CalendarCell[] {
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const cells: CalendarCell[] = []
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = daysInPrev - i
    const m = month === 0 ? 11 : month - 1
    const y = month === 0 ? year - 1 : year
    cells.push({ iso: toIso(y, m, day), day, inMonth: false })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ iso: toIso(year, month, day), day, inMonth: true })
  }
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    const m = month === 11 ? 0 : month + 1
    const y = month === 11 ? year + 1 : year
    cells.push({ iso: toIso(y, m, nextDay), day: nextDay, inMonth: false })
    nextDay++
  }
  return cells
}

export interface DatePickerFieldProps {
  /** ISO date (yyyy-mm-dd) or empty string. */
  value: string
  onValueChange: (iso: string) => void
  placeholder?: string
  error?: boolean
  disabled?: boolean
  'aria-label': string
  id?: string
  className?: string
  /** field: Figma modal form control (40px, 6px radius, #CBD5E1 border) */
  variant?: 'default' | 'field'
}

/** Date input with a Figma-style calendar popover (month grid, adjacent days greyed). */
export function DatePickerField({
  value,
  onValueChange,
  placeholder = 'Select date',
  error = false,
  disabled = false,
  className,
  variant = 'default',
  id,
  ...props
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const initial = value ? new Date(value + 'T00:00:00') : new Date()
  const [viewYear, setViewYear] = React.useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(initial.getMonth())
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  function openCalendar() {
    if (disabled) return
    if (value) {
      const d = new Date(value + 'T00:00:00')
      setViewYear(d.getFullYear())
      setViewMonth(d.getMonth())
    }
    setOpen((v) => !v)
  }

  function navigateMonth(delta: number) {
    let m = viewMonth + delta
    let y = viewYear
    if (m < 0) {
      m = 11
      y--
    } else if (m > 11) {
      m = 0
      y++
    }
    setViewMonth(m)
    setViewYear(y)
  }

  const cells = buildCalendar(viewYear, viewMonth)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={openCalendar}
        aria-label={props['aria-label']}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'flex w-full items-center justify-between gap-[var(--space-2)] border bg-[var(--color-surface)] px-[var(--space-4)] text-left text-[var(--font-size-sm)] transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'default' && 'h-11 rounded-[var(--radius-lg)]',
          variant === 'field' && 'h-10 rounded-[var(--radius-md)]',
          error ? 'border-[var(--color-danger-500)]' : variant === 'field' ? 'border-[var(--color-neutral-300)]' : 'border-[var(--color-border)]'
        )}
      >
        <span className={cn(!value && 'text-[var(--color-text-tertiary)]')}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <IconCalendar size={15} className="shrink-0 text-[var(--color-text-tertiary)]" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className="absolute left-0 top-[calc(100%+6px)] z-[var(--z-dropdown)] w-[300px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] shadow-[var(--shadow-xl)]"
        >
          <div className="mb-[var(--space-3)] flex items-center justify-between">
            <p className="text-[var(--font-size-base)] font-bold text-[var(--color-text-primary)]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>
            <div className="flex items-center gap-[var(--space-1)]">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                aria-label="Previous month"
                className="rounded-[var(--radius-md)] p-[var(--space-1)] text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
              >
                <IconChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
                className="rounded-[var(--radius-md)] p-[var(--space-1)] text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
              >
                <IconChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-[2px]">
            {WEEKDAY_LABELS.map((d) => (
              <span key={d} className="flex h-[28px] items-center justify-center text-[var(--font-size-xs)] font-medium text-[var(--color-text-tertiary)]">
                {d}
              </span>
            ))}
            {cells.map((cell) => {
              const selected = cell.iso === value
              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => {
                    onValueChange(cell.iso)
                    setOpen(false)
                  }}
                  aria-label={formatDisplayDate(cell.iso)}
                  aria-pressed={selected}
                  className={cn(
                    'mx-auto flex h-[32px] w-[32px] items-center justify-center rounded-full text-[var(--font-size-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
                    selected
                      ? 'bg-[var(--color-primary-600)] font-bold text-white'
                      : cell.inMonth
                        ? 'text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)]'
                        : 'text-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)]'
                  )}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          <p className="mt-[var(--space-3)] rounded-[var(--radius-md)] bg-[var(--color-bg-page)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
            Light gray numbers indicate days from previous or next month.
          </p>
        </div>
      )}
    </div>
  )
}
