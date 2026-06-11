'use client'

export interface ReviewManagerHeaderProps {
  onBatchReview?: () => void
}

export function ReviewManagerHeader({ onBatchReview }: ReviewManagerHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[30px] font-black text-neutral-900">Team Review Dashboard</h1>
      <button
        type="button"
        onClick={onBatchReview}
        className="h-11 rounded-full bg-accent-600 px-5 text-[var(--font-size-sm)] font-semibold text-white transition-colors hover:bg-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
      >
        Start Batch Review
      </button>
    </div>
  )
}
