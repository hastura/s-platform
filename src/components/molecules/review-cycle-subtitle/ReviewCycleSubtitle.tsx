'use client'

export interface ReviewCycleSubtitleProps {
  teamName: string
}

export function ReviewCycleSubtitle({ teamName }: ReviewCycleSubtitleProps) {
  return (
    <p className="text-[var(--font-size-sm)] text-neutral-700">
      Managing direct reports for <span className="font-bold text-neutral-900">{teamName}</span>.
    </p>
  )
}
