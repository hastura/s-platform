'use client'

import { RatingScale } from '@/components/atoms/rating-scale/RatingScale'
import { OkrContextRow } from '@/components/molecules/okr-context-row/OkrContextRow'
import type { BehaviorRating } from '@/types/competency'

export interface BehaviorAssessmentCardProps {
  title: string
  description?: string
  rating?: BehaviorRating
  onRatingChange?: (rating: BehaviorRating) => void
  notes?: string
  onNotesChange?: (notes: string) => void
  okrTitle?: string
  achievementPercent?: number
  notesLabel?: string
  readOnly?: boolean
}

export function BehaviorAssessmentCard({
  title,
  description,
  rating,
  onRatingChange,
  notes = '',
  onNotesChange,
  okrTitle,
  achievementPercent,
  notesLabel = 'Manager Notes for Product Strategy & Vision',
  readOnly = false,
}: BehaviorAssessmentCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-neutral-200 px-4 py-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-base font-bold text-neutral-800">{title}</h4>
            {description && (
              <p className="mt-1 text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[0.72px] text-neutral-600">
                {description}
              </p>
            )}
          </div>
          <RatingScale
            value={rating}
            onChange={onRatingChange}
            disabled={readOnly}
            aria-label={`Rate ${title}`}
          />
        </div>
        {okrTitle !== undefined && achievementPercent !== undefined && (
          <OkrContextRow okrTitle={okrTitle} achievementPercent={achievementPercent} />
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-neutral-800">{notesLabel}</span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange?.(e.target.value)}
          disabled={readOnly}
          placeholder="Provide specific examples, feedback, or context..."
          rows={3}
          className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[11px] text-neutral-700 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:bg-neutral-50"
        />
      </div>
    </div>
  )
}
