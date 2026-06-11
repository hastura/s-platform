'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  'aria-label': string
  /** Formats the value announced to assistive technology. */
  formatValueText?: (value: number) => string
  className?: string
}

/**
 * Single-value slider styled after the Figma Performance Weight slider:
 * 12px neutral-200 track with a 24px white ring handle.
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 5,
      disabled = false,
      formatValueText,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative flex w-full items-center py-[6px]', disabled && 'opacity-60', className)}>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[12px] -translate-y-1/2 rounded-[var(--radius-full)] bg-[var(--color-neutral-200)]" />
        <input
          ref={ref}
          type="range"
          className="strativy-slider relative z-10 h-[24px] w-full"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onValueChange(Number(e.target.value))}
          aria-valuetext={formatValueText ? formatValueText(value) : undefined}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
