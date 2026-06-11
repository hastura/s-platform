import * as React from "react"
import { cn } from "@/lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', ...props }, ref) => {
    const variants = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "border-[var(--color-neutral-100)]",
          variants[variant],
          orientation === 'horizontal' ? 'border-t' : 'border-l',
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export { Divider }
