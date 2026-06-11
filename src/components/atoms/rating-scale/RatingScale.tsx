'use client'

import { cn } from '@/lib/utils'
import type { BehaviorRating } from '@/types/competency'
import { RATING_SCALE_LABELS } from '@/types/competency'

export interface RatingScaleProps {
  value?: BehaviorRating
  onChange?: (rating: BehaviorRating) => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const RATINGS: BehaviorRating[] = [1, 2, 3, 4, 5]

/** 1–5 behavior rating scale (Rarely → Consistently) — accent indigo for competency UI. */
export function RatingScale({
  value,
  onChange,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Behavior rating',
}: RatingScaleProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'flex w-[min(100%,220px)] shrink-0 flex-col items-center gap-2 rounded-lg bg-accent-50 p-3',
        className
      )}
    >
      {/* Figma design: Labels ABOVE buttons, not inline */}
      <div className="flex w-full items-center justify-between text-[10px] font-semibold text-neutral-400">
        <span>{RATING_SCALE_LABELS[1]}</span>
        <span>{RATING_SCALE_LABELS[5]}</span>
      </div>
      <div className="flex items-center justify-center gap-[3px]">
        {RATINGS.map((rating) => {
          const selected = value === rating
          return (
            <button
              key={rating}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${RATING_SCALE_LABELS[rating]} (${rating})`}
              disabled={disabled}
              onClick={() => onChange?.(rating)}
              className={cn(
                'flex size-8 items-center justify-center rounded-full border text-[11.2px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                selected
                  ? 'border-accent-600 bg-accent-600 text-white shadow-sm'
                  : 'border-neutral-200 bg-white text-neutral-500 hover:border-accent-300 hover:bg-accent-50',
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {rating}
            </button>
          )
        })}
      </div>
    </div>
  )
}
