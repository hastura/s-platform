'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconChevronDown } from '@/components/icons'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value: string | null
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  'aria-label'?: string
  id?: string
  className?: string
  /** filter: table toolbar selects; field: modal form selects (40px, 6px radius). */
  variant?: 'default' | 'filter' | 'field'
}

/** Custom select with full keyboard support (listbox pattern). */
export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  disabled = false,
  error = false,
  className,
  variant = 'default',
  id,
  ...props
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const listboxId = React.useId()
  const selected = options.find((o) => o.value === value) ?? null

  React.useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  React.useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex] as HTMLElement | undefined
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex])

  function openList() {
    if (disabled) return
    setOpen(true)
    setActiveIndex(selected ? options.indexOf(selected) : 0)
  }

  function commit(index: number) {
    const option = options[index]
    if (!option || option.disabled) return
    onValueChange(option.value)
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open && activeIndex >= 0) commit(activeIndex)
        else openList()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openList()
        else setActiveIndex((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openList()
        else setActiveIndex((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActiveIndex(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActiveIndex(options.length - 1)
        }
        break
      case 'Escape':
        setOpen(false)
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={props['aria-label']}
        className={cn(
          'flex w-full items-center justify-between gap-[var(--space-2)] text-left transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'default' && [
            'h-11 rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-[var(--space-4)] text-[var(--font-size-sm)]',
            error ? 'border-[var(--color-danger-500)]' : 'border-[var(--color-border)]',
          ],
          variant === 'filter' && [
            'h-9 rounded-[10px] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] pl-[14px] pr-[10px] text-[13px] font-medium text-[var(--color-neutral-700)]',
            'hover:border-[var(--color-primary-300)] hover:bg-[var(--color-surface)]',
          ],
          variant === 'field' && [
            'h-10 rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-[var(--space-4)] text-[var(--font-size-sm)]',
            error ? 'border-[var(--color-danger-500)]' : 'border-[var(--color-neutral-300)]',
          ]
        )}
      >
        <span className={cn('truncate', !selected && 'text-[var(--color-text-tertiary)] font-normal')}>
          {selected ? selected.label : placeholder}
        </span>
        <IconChevronDown
          size={16}
          className={cn('shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-[var(--duration-normal)]', open && 'rotate-180')}
        />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={props['aria-label']}
          className="custom-scrollbar absolute left-0 right-0 top-[calc(100%+4px)] z-[var(--z-dropdown)] max-h-[240px] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-1)] shadow-[var(--shadow-lg)]"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(e) => {
                e.preventDefault()
                commit(index)
              }}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-sm)]',
                index === activeIndex && 'bg-[var(--color-neutral-100)]',
                option.value === value
                  ? 'font-semibold text-[var(--color-primary-600)]'
                  : 'text-[var(--color-text-primary)]',
                option.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
