import * as React from "react"
import { cn } from "@/lib/utils"

export interface Step {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  onStepClick: (index: number) => void
  orientation?: 'horizontal' | 'vertical'
  /** Figma Menu Container — full-width equal pills with chevron separators. */
  variant?: 'default' | 'wizard'
}

const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ className, steps, currentStep, onStepClick, orientation = 'horizontal', variant = 'default', ...props }, ref) => {
    if (variant === 'wizard') {
      return (
        <div
          ref={ref}
          className={cn('flex w-full items-center gap-[var(--space-2)]', className)}
          {...props}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep
            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className={cn(
                    'flex h-[55px] min-w-0 flex-1 items-center gap-[var(--space-3)] rounded-[var(--radius-xl)] px-[var(--space-4)] transition-all duration-200',
                    isActive
                      ? 'bg-[var(--color-primary-600)] text-white shadow-[var(--shadow-glow-primary-sm)]'
                      : 'bg-[var(--color-neutral-100)] text-[var(--color-text-muted)] hover:bg-[var(--color-neutral-50)]'
                  )}
                >
                  <span className={cn('shrink-0', isActive ? 'text-white' : 'text-[var(--color-neutral-400)]')}>
                    {step.icon}
                  </span>
                  <div className="flex min-w-0 flex-col items-start">
                    <span
                      className={cn(
                        'text-[12px] font-bold uppercase leading-4 tracking-[0.72px]',
                        isActive ? 'text-white' : 'text-[var(--color-text-muted)]'
                      )}
                    >
                      {step.label}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] leading-[15px]',
                        isActive ? 'text-white/80' : 'text-[var(--color-text-muted)] opacity-80'
                      )}
                    >
                      {step.description}
                    </span>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 text-[var(--color-neutral-400)]"
                    aria-hidden="true"
                  >
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )
    }

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col gap-[var(--space-2)]", className)}
          {...props}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            return (
              <button
                key={step.id}
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex items-center gap-[var(--space-3)] p-[var(--space-3)] rounded-[var(--radius-lg)] transition-all text-left",
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white shadow-lg"
                    : isCompleted
                      ? "bg-[var(--color-primary-50)] text-[var(--color-primary-600)]"
                      : "bg-transparent text-[var(--color-text-tertiary)] hover:bg-[var(--color-neutral-50)]"
                )}
              >
                <div className={cn(
                  "w-[32px] h-[32px] rounded-[var(--radius-md)] flex items-center justify-center shrink-0",
                  isActive ? "bg-white/20" : isCompleted ? "bg-[var(--color-primary-100)]" : "bg-[var(--color-neutral-100)]"
                )}>
                  <span className={cn("shrink-0", isActive ? "text-white" : isCompleted ? "text-[var(--color-primary-600)]" : "text-[var(--color-neutral-400)]")}>
                    {step.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-0 min-w-0">
                  <span className={cn("text-[14px] font-semibold leading-[16px] truncate", isActive ? "text-white" : "text-[var(--color-text-primary)]")}>
                    {step.label}
                  </span>
                  <span className={cn("text-[11px] font-normal leading-[15px] truncate", isActive ? "text-white/80" : "text-[var(--color-text-tertiary)]")}>
                    {step.description}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-[var(--space-1)]", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex items-center gap-[var(--space-3)] h-[55px] px-[var(--space-4)] rounded-[var(--radius-lg)] transition-all duration-200",
                  isActive
                    ? "bg-[var(--color-primary-600)] text-white shadow-[0px_10px_15px_0px_rgba(59,130,246,0.2),0px_4px_6px_0px_rgba(59,130,246,0.2)]"
                    : "bg-transparent text-[var(--color-text-tertiary)] hover:bg-[var(--color-neutral-50)]"
                )}
              >
                <span className={cn("shrink-0", isActive ? "text-white" : "text-[var(--color-neutral-400)]")}>
                  {step.icon}
                </span>
                <div className="flex flex-col items-start gap-0">
                  <span className={cn("text-[14px] font-semibold leading-[16px]", isActive ? "text-white" : "text-[var(--color-text-primary)]")}>
                    {step.label}
                  </span>
                  <span className={cn("text-[11px] font-normal leading-[15px]", isActive ? "text-white/80" : "text-[var(--color-text-tertiary)]")}>
                    {step.description}
                  </span>
                </div>
              </button>
              {index < steps.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-[4px] text-[var(--color-neutral-400)] shrink-0">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
StepIndicator.displayName = "StepIndicator"

export { StepIndicator }
