import * as React from 'react'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'

export interface LeaderboardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: number
  name: string
  okrProgress: number
  score: number
  scoreMax?: number
}

const LeaderboardRow = React.forwardRef<HTMLDivElement, LeaderboardRowProps>(
  ({ className, rank, name, okrProgress, score, scoreMax = 5, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--space-3)] border-b border-[var(--color-neutral-100)] py-[var(--space-4)] last:border-b-0',
          className
        )}
        {...props}
      >
        <span className="w-[80px] shrink-0 text-right text-[var(--font-size-xs)] font-bold text-[#0a5adb]">
          {rank}
        </span>

        <span className="w-[140px] shrink-0 truncate text-[var(--font-size-xs)] font-bold text-[var(--color-neutral-800)]">
          {name}
        </span>

        <div className="relative min-w-0 flex-1">
          <span className="absolute -top-[14px] left-0 text-[var(--font-size-2xs)] leading-[normal] text-[var(--color-text-muted)]">
            OKR: {okrProgress}%
          </span>
          <ProgressBar value={okrProgress} max={100} size="sm" variant="default" flatTrack className="mt-[2px]" />
        </div>

        <span className="w-[42px] shrink-0 text-right text-[var(--font-size-xs)] font-bold text-[#15803d]">
          {score.toFixed(1)}/{scoreMax.toFixed(1)}
        </span>
      </div>
    )
  }
)
LeaderboardRow.displayName = 'LeaderboardRow'

export { LeaderboardRow }
