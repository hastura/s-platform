import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'
}

const Typography = ({ className, variant = 'body', children, ...props }: TypographyProps) => {
  const variants = {
    h1: 'text-[30px] leading-[30px] font-black italic tracking-[-1.5px] uppercase text-[var(--color-text-primary)]',
    h2: 'text-[24px] leading-[28px] font-black tracking-[-1px] text-[var(--color-text-primary)]',
    h3: 'text-[20px] leading-[24px] font-bold text-[var(--color-text-primary)]',
    h4: 'text-[16px] leading-[20px] font-bold text-[var(--color-text-primary)]',
    body: 'text-[14px] leading-[20px] font-normal text-[var(--color-text-secondary)]',
    caption: 'text-[12px] leading-[16px] font-medium text-[var(--color-text-tertiary)]',
    overline: 'text-[10px] leading-[10px] font-semibold uppercase tracking-[0.4px] text-[var(--color-text-tertiary)]',
  }

  switch (variant) {
    case 'h1':
      return <h1 className={cn(variants.h1, className)} {...props}>{children}</h1>
    case 'h2':
      return <h2 className={cn(variants.h2, className)} {...props}>{children}</h2>
    case 'h3':
      return <h3 className={cn(variants.h3, className)} {...props}>{children}</h3>
    case 'h4':
      return <h4 className={cn(variants.h4, className)} {...props}>{children}</h4>
    case 'caption':
      return <p className={cn(variants.caption, className)} {...props}>{children}</p>
    case 'overline':
      return <span className={cn(variants.overline, className)} {...props}>{children}</span>
    default:
      return <p className={cn(variants.body, className)} {...props}>{children}</p>
  }
}
Typography.displayName = "Typography"

export { Typography }
