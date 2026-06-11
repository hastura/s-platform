import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  /** Flat neutral-200 track without inset shadow — matches Dashboard/Card bars. */
  flatTrack?: boolean
  /** Override fill color class (e.g. level-based OKR progress). */
  fillClassName?: string
  showLabel?: boolean
  animated?: boolean
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, max = 100, size = 'md', variant = 'default', flatTrack = false, fillClassName, showLabel = false, animated = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes = {
      sm: 'h-[6px]',
      md: 'h-[8px]',
      lg: 'h-[12px]',
    }

    const variants = {
      default: flatTrack ? 'bg-[var(--color-primary-500)]' : 'bg-[var(--color-primary-600)]',
      success: flatTrack ? 'bg-[var(--color-success-500)]' : 'bg-[var(--color-success-600)]',
      warning: flatTrack ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--color-warning-600)]',
      danger: 'bg-[var(--color-danger-600)]',
    }

    const getProgressColor = () => {
      if (fillClassName) return fillClassName
      if (variant !== 'default') return variants[variant]
      if (flatTrack) return 'bg-[var(--color-primary-500)]'
      if (percentage >= 70) return 'bg-[var(--color-success-600)]'
      if (percentage >= 40) return 'bg-[var(--color-warning-600)]'
      return 'bg-[var(--color-danger-600)]'
    }

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn(
            'w-full overflow-hidden rounded-full',
            flatTrack
              ? 'bg-[var(--color-neutral-200)]'
              : 'bg-[var(--color-neutral-50)] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]',
            sizes[size],
            className
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              getProgressColor(),
              animated && "animate-pulse"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1 text-right">
            <span className="text-[var(--color-text-primary)] font-black text-[14px]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
