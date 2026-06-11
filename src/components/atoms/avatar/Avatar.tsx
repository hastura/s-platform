import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'gradient'
  initial?: string
  src?: string
  alt?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', variant = 'solid', initial, src, alt = 'Avatar', ...props }, ref) => {
    const sizes = {
      sm: 'w-[32px] h-[32px] text-[var(--font-size-sm)]',
      md: 'w-[40px] h-[40px] text-[var(--font-size-base)]',
      lg: 'w-[48px] h-[48px] text-[var(--font-size-lg)]',
    }

    const shadows = {
      sm: 'shadow-[0_2px_4px_rgba(37,99,235,0.2)]',
      md: 'shadow-[0_4px_12px_rgba(37,99,235,0.25)]',
      lg: 'shadow-[0_8px_16px_rgba(37,99,235,0.3)]',
    }

    const backgrounds = {
      solid: 'bg-[var(--color-primary-600)]',
      gradient: 'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)]',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 overflow-hidden",
          backgrounds[variant],
          sizes[size],
          shadows[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-black">{initial || 'U'}</span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
