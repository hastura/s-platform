import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  error?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, error, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[var(--space-1)]">
        <label
          ref={ref}
          className={cn(
            "text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] flex items-center gap-[var(--space-1)]",
            className
          )}
          {...props}
        >
          {children}
          {required && <span className="text-[var(--color-danger-600)]">*</span>}
        </label>
        {error && (
          <span className="text-[var(--font-size-xs)] text-[var(--color-danger-600)] font-medium">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Label.displayName = "Label"

export { Label }
