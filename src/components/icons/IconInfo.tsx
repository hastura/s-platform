interface IconProps {
  size?: number
  className?: string
}

export function IconInfo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 10.5C11.4477 10.5 11 10.9477 11 11.5V16.5C11 17.0523 11.4477 17.5 12 17.5C12.5523 17.5 13 17.0523 13 16.5V11.5C13 10.9477 12.5523 10.5 12 10.5ZM12 6.5C11.3096 6.5 10.75 7.05964 10.75 7.75C10.75 8.44036 11.3096 9 12 9C12.6904 9 13.25 8.44036 13.25 7.75C13.25 7.05964 12.6904 6.5 12 6.5Z"
      />
    </svg>
  )
}
