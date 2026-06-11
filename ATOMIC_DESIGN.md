# Strativy Platform - Atomic Design System

## 📚 Overview

This project follows the **Atomic Design Methodology** for building UI components systematically. The design system is organized into five distinct levels:

```
Atoms → Molecules → Organisms → Templates → Pages
```

## 🏗️ Architecture

### Directory Structure

```
src/components/
├── atoms/              # Basic building blocks
│   ├── badge/
│   ├── avatar/
│   ├── icon/
│   ├── progress-bar/
│   ├── divider/
│   ├── label/
│   └── typography/
├── molecules/          # Simple component combinations
│   ├── search-bar/
│   ├── menu-item/
│   ├── progress-card/
│   ├── tree-card/
│   └── okr-list-item/
├── organisms/          # Complex UI sections
│   ├── sidebar/
│   ├── topbar/
│   ├── view-toggle/
│   ├── okr-list-view/
│   └── okr-tree-view/
├── templates/          # Page-level schemas
│   └── OKRPageTemplate.tsx
├── ui/                 # Legacy UI components
└── layout/             # Legacy layout components
```

## 🎨 Design Tokens

All design tokens are defined in `src/styles/tokens.css` using CSS custom properties:

### Color Palette
- **Primary**: `--color-primary-50` to `--color-primary-950` (Brand blue: #2563eb)
- **Neutral**: `--color-neutral-50` to `--color-neutral-950` (Grays)
- **Success**: `--color-success-600` (#16a34a)
- **Warning**: `--color-warning-600` (#d97706)
- **Danger**: `--color-danger-600` (#dc2626)

### Spacing Scale
`--space-0` to `--space-20` (0px to 80px)

### Typography
- **Font Family**: Inter (sans-serif), JetBrains Mono (mono)
- **Sizes**: `--font-size-xs` (12px) to `--font-size-4xl` (36px)

### Border Radius
`--radius-sm` (4px) to `--radius-full` (9999px)

### Shadows
`--shadow-xs` to `--shadow-2xl` with semantic usage

### Z-Index Scale
`--z-base` (0) to `--z-toast` (500)

## 🧩 Component Library

### Atoms

Basic UI elements that cannot be broken down further.

#### Badge
Inline status labels with variants and sizes.

```tsx
<Badge variant="primary" size="md">New</Badge>
<Badge variant="success" icon={<CheckIcon />}>Approved</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
- `size`: 'sm' | 'md'
- `icon`: React.ReactNode

#### Avatar
User/profile representation.

```tsx
<Avatar initial="JD" size="md" variant="gradient" />
<Avatar src="/photo.jpg" size="lg" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'solid' | 'gradient'
- `initial`: string
- `src`: string

#### Icon
Consistent icon sizing and coloring.

```tsx
<Icon size="lg" color="primary">
  <svg>...</svg>
</Icon>
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'inherit' | 'primary' | 'neutral' | 'success' | 'warning' | 'danger'

#### ProgressBar
Visual progress indicator.

```tsx
<ProgressBar value={75} size="md" variant="default" showLabel />
```

**Props:**
- `value`: number (0-100)
- `max`: number (default: 100)
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'default' | 'success' | 'warning' | 'danger'
- `showLabel`: boolean
- `animated`: boolean

#### Divider
Visual separation element.

```tsx
<Divider orientation="horizontal" variant="solid" />
```

**Props:**
- `orientation`: 'horizontal' | 'vertical'
- `variant`: 'solid' | 'dashed' | 'dotted'

#### Label
Form field labels with validation states.

```tsx
<Label required error="This field is required">Email</Label>
```

**Props:**
- `required`: boolean
- `error`: string

#### Typography
Consistent text styling.

```tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="body">Content text</Typography>
```

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'

### Molecules

Combinations of atoms working together.

#### SearchBar
Input with search icon.

```tsx
<SearchBar 
  placeholder="Search objectives..." 
  onSearch={(value) => console.log(value)} 
/>
```

#### MenuItem
Clickable navigation item.

```tsx
<MenuItem 
  icon={<SettingsIcon />} 
  label="Settings" 
  active={pathname === '/settings'} 
/>
```

#### ProgressCard
Card showing progress with owner info.

```tsx
<ProgressCard
  title="Achieve Market Leadership"
  progress={45}
  icon={<TargetIcon />}
  ownerInitial="C"
  ownerLabel="CEO Office"
/>
```

#### TreeCard
ProgressCard variant for tree visualization.

```tsx
<TreeCard
  title="UX Team Alpha"
  progress={75}
  hasLink
  onClick={() => handleOpen()}
/>
```

#### OKRListItem
List item for OKR objectives.

```tsx
<OKRListItem
  id="1"
  level="Company"
  owner="Management"
  title="Achieve Market Leadership in SEA"
  progress={45}
  tags={[{ label: 'JIRA' }]}
  onClick={(id) => handleSelect(id)}
/>
```

### Organisms

Complex UI sections composed of molecules and/or atoms.

#### ViewToggle
Toggle between list and tree views.

```tsx
<ViewToggle 
  value={viewMode} 
  onChange={(mode) => setViewMode(mode)} 
/>
```

#### OKRListView
List view container for OKR items.

```tsx
<OKRListView 
  items={okrList} 
  onItemClick={(id) => handleSelect(id)} 
/>
```

#### OKRTreeView
Tree visualization for OKR hierarchy.

```tsx
<OKRTreeView 
  data={treeData} 
  onCardClick={(node) => handleSelect(node)} 
/>
```

### Templates

Page-level schemas that define structure without content.

#### OKRPageTemplate
Standard page layout for OKR views.

```tsx
<OKRPageTemplate
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  headerSubtitle="Objective Alignment Engine"
>
  {viewMode === 'tree' ? <OKRTreeView /> : <OKRListView />}
</OKRPageTemplate>
```

## 🚀 Usage Guidelines

### Import Strategy

Use barrel exports for clean imports:

```tsx
// Import multiple components from atomic level
import { Badge, Avatar, ProgressBar } from '@/components/atoms'
import { SearchBar, MenuItem } from '@/components/molecules'
import { ViewToggle, OKRListView } from '@/components/organisms'
```

### Styling

1. **Use design tokens** (CSS variables) instead of hardcoded values:
   ```tsx
   // ✅ Good
   className="bg-[var(--color-primary-600)]"
   
   // ❌ Avoid
   className="bg-blue-600"
   ```

2. **Use `cn()` utility** for conditional classes:
   ```tsx
   className={cn(
     "base-classes",
     isActive && "active-state",
     variant === 'primary' && "primary-variant"
   )}
   ```

3. **Follow the spacing scale**:
   ```tsx
   className="gap-[var(--space-3)] px-[var(--space-4)]"
   ```

### Creating New Components

1. **Determine the atomic level**:
   - Atom: Single, indivisible UI element
   - Molecule: Simple combination of atoms
   - Organism: Complex UI section
   - Template: Page-level structure

2. **Create component folder**:
   ```bash
   mkdir -p src/components/{level}/{component-name}
   ```

3. **Create component file**:
   ```tsx
   import * as React from "react"
   import { cn } from "@/lib/utils"

   export interface ComponentNameProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onClick'> {
     // Custom props
   }

   const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
     ({ className, ...props }, ref) => {
       return (
         <div ref={ref} className={cn("base-classes", className)} {...props} />
       )
     }
   )
   ComponentName.displayName = "ComponentName"

   export { ComponentName }
   ```

4. **Export from barrel file**:
   ```ts
   // src/components/{level}/index.ts
   export * from './{component-name}/ComponentName'
   ```

## 🎯 Best Practices

1. **Single Responsibility**: Each component should do one thing well
2. **Composability**: Build components that work together
3. **Consistency**: Use design tokens, not hardcoded values
4. **Accessibility**: Include ARIA attributes and keyboard support
5. **Type Safety**: Define strict TypeScript interfaces
6. **Forward Ref**: Use `React.forwardRef` for DOM access
7. **Display Name**: Set `Component.displayName` for debugging

## 📝 Type Definitions

All component types are centralized in `src/types/components.ts`:

```tsx
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
export type ViewMode = 'list' | 'tree'
export type OKRLevel = 'Company' | 'Department' | 'Team'
// ... and more
```

## 🌙 Dark Mode

Dark mode is supported via CSS custom properties:

```tsx
// Toggle dark mode
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
```

All components automatically adapt to the current theme using semantic color tokens.

## 🔧 Migration Guide

When refactoring existing components:

1. Identify the atomic level
2. Move to appropriate folder
3. Replace hardcoded values with design tokens
4. Update imports across the codebase
5. Remove old component from legacy locations

## 📖 References

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Design Tokens Community Group](https://www.designtokens.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
