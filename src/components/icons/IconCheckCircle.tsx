interface IconProps {
  size?: number
  className?: string
}

export function IconCheckCircle({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12.5 3 3 5-6" />
    </svg>
  )
}
