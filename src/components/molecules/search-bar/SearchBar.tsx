import * as React from "react"
import { cn } from "@/lib/utils"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, placeholder = "Search...", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className={cn(
        "flex items-center gap-[var(--space-2)] bg-[var(--color-neutral-100)] border border-transparent rounded-[10px] h-[40px] px-[var(--space-3)] w-[240px] transition-all hover:border-[var(--color-primary-200)] focus-within:border-[var(--color-primary-300)] focus-within:bg-[var(--color-bg-surface)]",
        className
      )}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-[var(--font-size-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] w-full"
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
