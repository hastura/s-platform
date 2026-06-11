import * as React from "react"
import { cn } from "@/lib/utils"

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  danger?: boolean
}

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, icon, label, active = false, danger = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center gap-[var(--space-3)] w-full h-[40px] px-[var(--space-3)] rounded-[var(--radius-md)] text-[var(--font-size-sm)] font-semibold transition-all text-left",
          danger
            ? "text-[var(--color-danger-600)] hover:bg-[var(--color-danger-50)]"
            : active
              ? "text-[var(--color-primary-600)] bg-[var(--color-primary-50)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]",
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0">{icon}</span>
        )}
        <span className="truncate">{label}</span>
      </button>
    )
  }
)
MenuItem.displayName = "MenuItem"

export { MenuItem }
