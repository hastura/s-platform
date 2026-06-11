// ============================================
// STRATIVY PLATFORM - TYPE DEFINITIONS
// Atomic Design System
// ============================================

// ── Atomic Design Component Base Types ─────────────────────

export interface AtomicComponentProps {
  className?: string
  testId?: string
}

// ── Atom Types ─────────────────────────────────────────────

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
export type BadgeSize = 'sm' | 'md'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarVariant = 'solid' | 'gradient'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type IconColor = 'inherit' | 'primary' | 'neutral' | 'success' | 'warning' | 'danger'

export type ProgressBarSize = 'sm' | 'md' | 'lg'
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'
export type TypographyAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

// ── Molecule Types ─────────────────────────────────────────

export interface SearchBarProps {
  onSearch?: (value: string) => void
  placeholder?: string
}

export interface MenuItemProps {
  icon?: React.ReactNode
  label: string
  active?: boolean
  danger?: boolean
}

export interface ProgressCardData {
  title: string
  progress: number
  progressColor?: string
  icon?: React.ReactNode
  iconBg?: string
  ownerInitial?: string
  ownerLabel?: string
  hasLink?: boolean
}

export interface TreeCardData extends ProgressCardData {
  onClick?: () => void
}

export type OKRLevel = 'Company' | 'Department' | 'Team'

export interface OKRListItemData {
  id: string
  level: OKRLevel
  owner: string
  ownerIcon?: React.ReactNode
  title: string
  progress: number
  tags?: { label: string; icon?: React.ReactNode }[]
  indent?: boolean
}

// ── Organism Types ─────────────────────────────────────────

export type ViewMode = 'list' | 'tree'

export interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export interface OKRTreeNode {
  id: string
  title: string
  progress: number
  progressColor?: string
  icon: React.ReactNode
  iconBg?: string
  ownerInitial: string
  ownerLabel: string
  hasLink?: boolean
  children?: OKRTreeNode[]
}

// ── Layout Types ───────────────────────────────────────────

export interface SidebarNavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export interface TopbarPageMeta {
  title: string
  subtitle: string
}

// ── Theme Types ────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
  mode: ThemeMode
  sidebarCollapsed: boolean
}

// ── Design Token Types ─────────────────────────────────────

export type ColorToken = 
  | `--color-primary-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`
  | `--color-neutral-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`
  | `--color-success-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`
  | `--color-warning-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`
  | `--color-danger-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`
  | '--color-border'
  | '--color-background'
  | '--color-surface'
  | '--color-text-primary'
  | '--color-text-secondary'
  | '--color-text-tertiary'
  | '--color-text-inverse'

export type SpacingToken = 
  | `--space-${0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20}`
  | `--space-${'0-5' | '1-5' | '2-5'}`

export type RadiusToken = 
  | `--radius-${'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'}`

export type ShadowToken = 
  | `--shadow-${'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'}`

export type ZIndexToken = 
  | `--z-${'base' | 'raised' | 'dropdown' | 'sticky' | 'overlay' | 'modal' | 'toast'}`

export type DurationToken = 
  | `--duration-${'fast' | 'normal' | 'slow'}`
