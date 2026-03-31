import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#2563eb] text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98]',
      secondary: 'bg-white text-[#2563eb] border border-blue-200 hover:bg-blue-50 active:scale-[0.98]',
      outline: 'bg-transparent border border-neutral-200 text-neutral-900 hover:bg-neutral-50 active:scale-[0.98]',
      ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 active:scale-[0.98]',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
    }

    const sizes = {
      default: 'h-11 px-6 text-sm font-bold',
      sm: 'h-8 px-3 text-xs font-bold',
      lg: 'h-14 px-10 text-base font-bold',
      icon: 'h-10 w-10',
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
