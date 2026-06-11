import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'inherit' | 'primary' | 'neutral' | 'success' | 'warning' | 'danger'
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size = 'md', color = 'inherit', children, ...props }, ref) => {
    const sizes = {
      xs: 'w-[12px] h-[12px]',
      sm: 'w-[16px] h-[16px]',
      md: 'w-[20px] h-[20px]',
      lg: 'w-[24px] h-[24px]',
      xl: 'w-[28px] h-[28px]',
    }

    const colors = {
      inherit: 'text-inherit',
      primary: 'text-[var(--color-primary-600)]',
      neutral: 'text-[var(--color-neutral-500)]',
      success: 'text-[var(--color-success-600)]',
      warning: 'text-[var(--color-warning-600)]',
      danger: 'text-[var(--color-danger-600)]',
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
