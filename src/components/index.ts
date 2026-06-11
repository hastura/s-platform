// Atomic Design System Exports
export * from './atoms'
export * from './molecules'
export * from './organisms'
export * from './templates'

// Legacy UI components (maintained for backward compatibility)
// Input is re-exported under a legacy alias — the atoms Input is canonical.
export { Button } from './ui/Button'
export type { ButtonProps } from './ui/Button'
export { Input as LegacyInput } from './ui/Input'
export * from './layout'
