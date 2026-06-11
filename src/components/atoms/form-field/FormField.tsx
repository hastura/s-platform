import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  error?: string
  required?: boolean
  children: React.ReactElement<{ className?: string }>
  helpText?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, required = false, children, helpText, ...props }, ref) => {
    // Clone child to inject common input props
    const child = React.isValidElement(children)
      ? React.cloneElement(children, {
          className: cn(
            "flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-neutral-50)] px-[var(--space-4)] py-2 text-[14px] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            error ? "border-[var(--color-danger-500)]" : "border-[var(--color-border)]",
            children.props.className
          ),
        })
      : children

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[var(--space-1)]", className)}
        {...props}
      >
        <label className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)] flex items-center gap-[var(--space-1)]">
          {label}
          {required && <span className="text-[var(--color-danger-600)]">*</span>}
        </label>
        {child}
        {helpText && !error && (
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] font-medium">{helpText}</span>
        )}
        {error && (
          <span className="text-[var(--font-size-xs)] text-[var(--color-danger-600)] font-medium">{error}</span>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
