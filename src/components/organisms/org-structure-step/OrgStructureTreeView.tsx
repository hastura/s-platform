'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { OrgLevel, OrgNode } from '@/types/company-setup'
import { nextOrgLevel } from '@/lib/mock/departments'

export interface OrgStructureTreeViewProps {
  companyName: string
  nodes: OrgNode[]
  onAddTopManagement: () => void
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}

const TREE_SIBLING_LABEL: Partial<Record<OrgLevel, string>> = {
  top_management: 'Top Mgmt',
  department: 'Department',
  division: 'Division',
  team: 'Squad',
}

const TREE_CHILD_LABEL: Partial<Record<OrgLevel, string>> = {
  department: 'Department',
  division: 'Division',
  team: 'Squad',
  role: 'Staff',
}

const TREE_NODE_STYLES: Record<
  OrgLevel,
  { wClass: string; bg: string; nameClass: string; pad: string; plusClass: string }
> = {
  top_management: {
    wClass: 'w-[160px]',
    bg: 'rounded-[var(--radius-lg)] border-[1.5px] border-white bg-[#122c47]',
    nameClass: 'text-center text-[13px] font-semibold leading-tight text-white',
    pad: 'px-[var(--space-2)] py-[var(--space-3)]',
    plusClass: 'text-white/90 hover:bg-white/20',
  },
  department: {
    wClass: 'w-[110px]',
    bg: 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]',
    nameClass: 'text-center text-[12px] font-semibold leading-tight text-[var(--color-text-primary)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
    plusClass: 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
  },
  division: {
    wClass: 'w-[100px]',
    bg: 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-page)]',
    nameClass: 'whitespace-nowrap text-center text-[12px] text-[var(--color-text-secondary)]',
    pad: 'px-[var(--space-3)] py-[var(--space-2)]',
    plusClass: 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
  },
  team: {
    wClass: 'w-[90px]',
    bg: 'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]',
    nameClass: 'whitespace-nowrap text-center text-[11px] text-[var(--color-text-secondary)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
    plusClass: 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
  },
  role: {
    wClass: 'w-[88px]',
    bg: 'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]',
    nameClass: 'whitespace-nowrap text-center text-[10px] text-[var(--color-text-muted)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
    plusClass: 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)]',
  },
}

/** Figma 276:478 — org structure tree chart view. */
export function OrgStructureTreeView({
  companyName,
  nodes,
  onAddTopManagement,
  onDeleteNode,
  onAddChild,
}: OrgStructureTreeViewProps) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-[var(--space-10)]">
      <div className="flex min-w-max flex-col items-center">
        <div className="flex h-[52px] w-[200px] flex-col items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary-600)] shadow-[var(--shadow-md)]">
          <span className="text-[14px] font-bold text-white">CEO</span>
          <p className="text-center text-[10px] text-white/80">{companyName}</p>
        </div>

        <div className="h-[14px] w-[1.5px] bg-[var(--color-neutral-300)]" />

        <div className="flex items-start gap-[var(--space-4)]">
          {nodes.length === 0 ? (
            <TreeDashedAddButton label="Top Mgmt" onClick={onAddTopManagement} />
          ) : (
            nodes.map((node) => (
              <OrgTreeNodeBranch
                key={node.id}
                node={node}
                parentId="ceo"
                onDeleteNode={onDeleteNode}
                onAddChild={onAddChild}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

/** Node column + optional sibling add slot to the right (Figma tree row). */
function OrgTreeNodeBranch({
  node,
  parentId,
  onDeleteNode,
  onAddChild,
}: {
  node: OrgNode
  parentId: string
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}) {
  const siblingLabel = TREE_SIBLING_LABEL[node.level]

  return (
    <div className="flex items-start gap-[var(--space-4)]">
      <OrgTreeNodeColumn node={node} onDeleteNode={onDeleteNode} onAddChild={onAddChild} />

      {siblingLabel && (
        <TreeSiblingAddSlot
          label={siblingLabel}
          level={node.level}
          parentId={parentId}
          onAddChild={onAddChild}
        />
      )}
    </div>
  )
}

/** Vertical spine: node card → connector → child branches. */
function OrgTreeNodeColumn({
  node,
  onDeleteNode,
  onAddChild,
}: {
  node: OrgNode
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}) {
  const [isAddingChild, setIsAddingChild] = useState(false)
  const childLevel = nextOrgLevel(node.level)
  const childLabel = childLevel ? TREE_CHILD_LABEL[childLevel] : undefined
  const s = TREE_NODE_STYLES[node.level]

  const showChildrenSection = node.children.length > 0 || isAddingChild

  function handleAddChild(name: string) {
    if (!childLevel) return
    onAddChild(node.id, name, childLevel)
    setIsAddingChild(false)
  }

  return (
    <div className="flex flex-col items-center">
      <TreeNodeCard
        node={node}
        styles={s}
        canAddChild={Boolean(childLevel)}
        onDelete={() => onDeleteNode(node.id)}
        onAddChildClick={() => setIsAddingChild(true)}
      />

      {showChildrenSection && childLevel && (
        <>
          <div className="h-[14px] w-[1.5px] bg-[var(--color-neutral-300)]" />

          {isAddingChild && (
            <div className="mb-[var(--space-2)]">
              <TreeInlineAddForm
                placeholder={childLabel ? `New ${childLabel}…` : 'Name…'}
                onSubmit={handleAddChild}
                onCancel={() => setIsAddingChild(false)}
              />
            </div>
          )}

          {node.children.length > 0 && (
            <div className="relative flex items-start gap-[var(--space-4)]">
              {node.children.length > 1 && (
                <div
                  className="absolute top-0 h-[1.5px] bg-[var(--color-neutral-300)]"
                  style={{
                    left: `${100 / (node.children.length * 2)}%`,
                    right: `${100 / (node.children.length * 2)}%`,
                  }}
                />
              )}
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="h-[14px] w-[1.5px] bg-[var(--color-neutral-300)]" />
                  <OrgTreeNodeBranch
                    node={child}
                    parentId={node.id}
                    onDeleteNode={onDeleteNode}
                    onAddChild={onAddChild}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function TreeNodeCard({
  node,
  styles,
  canAddChild,
  onDelete,
  onAddChildClick,
}: {
  node: OrgNode
  styles: (typeof TREE_NODE_STYLES)[OrgLevel]
  canAddChild: boolean
  onDelete: () => void
  onAddChildClick: () => void
}) {
  return (
    <div className={cn('relative', styles.bg, styles.wClass)}>
      <div className={cn('flex flex-col items-center', styles.pad)}>
        <span className={styles.nameClass}>{node.name}</span>
      </div>

      <button
        type="button"
        onClick={onDelete}
        aria-label={`Delete ${node.name}`}
        className="absolute -right-2 -top-2 z-10 flex h-4 w-4 items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-white bg-[var(--color-neutral-800)] text-[10px] font-bold leading-none text-white"
      >
        ×
      </button>

      {canAddChild && (
        <button
          type="button"
          onClick={onAddChildClick}
          aria-label={`Add child under ${node.name}`}
          className={cn(
            'absolute -bottom-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] font-bold leading-none shadow-[var(--shadow-xs)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
            styles.plusClass
          )}
        >
          +
        </button>
      )}
    </div>
  )
}

function TreeSiblingAddSlot({
  label,
  level,
  parentId,
  onAddChild,
}: {
  label: string
  level: OrgLevel
  parentId: string
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}) {
  const [isAdding, setIsAdding] = useState(false)

  if (isAdding) {
    return (
      <TreeInlineAddForm
        placeholder={`New ${label}…`}
        onSubmit={(name) => {
          onAddChild(parentId, name, level)
          setIsAdding(false)
        }}
        onCancel={() => setIsAdding(false)}
      />
    )
  }

  return <TreeDashedAddButton label={label} onClick={() => setIsAdding(true)} />
}

function TreeDashedAddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[44px] min-w-[100px] flex-col items-center justify-center rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--color-neutral-400)] px-[var(--space-2)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary-300)] hover:text-[var(--color-primary-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
    >
      <span className="mb-[2px] flex h-[12px] w-[12px] items-center justify-center rounded-full border border-current text-[8px]">
        +
      </span>
      <span>{label}</span>
    </button>
  )
}

function TreeInlineAddForm({
  placeholder,
  onSubmit,
  onCancel,
}: {
  placeholder: string
  onSubmit: (name: string) => void
  onCancel: () => void
}) {
  const [name, setName] = useState('')

  function handleSubmit() {
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setName('')
  }

  return (
    <div className="flex min-w-[120px] flex-col gap-[var(--space-1)] rounded-[var(--radius-lg)] border border-[var(--color-primary-200)] bg-[var(--color-surface)] p-[var(--space-2)] shadow-[var(--shadow-sm)]">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
          else if (e.key === 'Escape') onCancel()
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-[28px] w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-page)] px-[var(--space-2)] text-[11px] outline-none focus:border-[var(--color-primary-400)]"
      />
      <div className="flex gap-[var(--space-1)]">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 rounded-[var(--radius-sm)] bg-[var(--color-primary-600)] px-[var(--space-2)] py-[3px] text-[10px] font-medium text-white"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[var(--radius-sm)] px-[var(--space-2)] py-[3px] text-[10px] text-[var(--color-text-tertiary)]"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
