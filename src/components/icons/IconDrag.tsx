interface IconProps {
  size?: number
  className?: string
}

export function IconDrag({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="4" r="1.2" fill="currentColor" />
      <circle cx="10" cy="4" r="1.2" fill="currentColor" />
      <circle cx="6" cy="8" r="1.2" fill="currentColor" />
      <circle cx="10" cy="8" r="1.2" fill="currentColor" />
      <circle cx="6" cy="12" r="1.2" fill="currentColor" />
      <circle cx="10" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}
