import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'invited'
  /** sm/md: compact chips · status: Figma employment/invite badges (12px medium, 23px height, 11.5px radius). */
  size?: 'sm' | 'md' | 'status'
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', icon, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]',
      primary: 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]',
      success: 'bg-[var(--color-success-50)] text-[var(--color-success-600)]',
      warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)]',
      danger: 'bg-[var(--color-danger-50)] text-[var(--color-danger-600)]',
      neutral: 'bg-[var(--color-neutral-50)] text-[var(--color-neutral-600)]',
      invited: 'bg-[var(--color-bg-invited)] text-[var(--color-accent-700)]',
    }

    const sizes = {
      sm: 'rounded-full text-[10px] font-bold px-[6px] py-[1px] gap-[3px]',
      md: 'rounded-full text-[11px] font-bold px-[8px] py-[2px] gap-[4px]',
      status: 'h-[23px] rounded-[11.5px] px-[10px] text-[var(--font-size-xs)] font-medium leading-none gap-[4px]',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
