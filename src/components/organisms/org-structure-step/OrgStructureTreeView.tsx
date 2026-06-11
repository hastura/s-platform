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

const TREE_ADD_LABEL: Partial<Record<OrgLevel, string>> = {
  top_management: '+ Top Mgmt',
  department: '+ Department',
  division: '+ Division',
  team: '+ Squad',
  role: '+ Staff',
}

const TREE_NODE_STYLES: Record<
  OrgLevel,
  { wClass: string; bg: string; nameClass: string; pad: string }
> = {
  top_management: {
    wClass: 'w-[160px]',
    bg: 'rounded-[var(--radius-lg)] border-[1.5px] border-white bg-[#122c47]',
    nameClass: 'text-center text-[13px] font-semibold leading-tight text-white',
    pad: 'px-[var(--space-2)] py-[var(--space-3)]',
  },
  department: {
    wClass: 'w-[110px]',
    bg: 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]',
    nameClass: 'text-center text-[12px] font-semibold leading-tight text-[var(--color-text-primary)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
  },
  division: {
    wClass: 'w-[100px]',
    bg: 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-page)]',
    nameClass: 'whitespace-nowrap text-center text-[12px] text-[var(--color-text-secondary)]',
    pad: 'px-[var(--space-3)] py-[var(--space-2)]',
  },
  team: {
    wClass: 'w-[90px]',
    bg: 'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]',
    nameClass: 'whitespace-nowrap text-center text-[11px] text-[var(--color-text-secondary)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
  },
  role: {
    wClass: 'w-[88px]',
    bg: 'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]',
    nameClass: 'whitespace-nowrap text-center text-[10px] text-[var(--color-text-muted)]',
    pad: 'px-[var(--space-2)] py-[var(--space-2)]',
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

        <OrgTreeChildRow
          nodes={nodes}
          onDeleteNode={onDeleteNode}
          onAddChild={onAddChild}
          onAddTopManagement={onAddTopManagement}
          showRootAdd
        />
      </div>
    </div>
  )
}

function OrgTreeChildRow({
  nodes,
  onDeleteNode,
  onAddChild,
  onAddTopManagement,
  showRootAdd = false,
}: {
  nodes: OrgNode[]
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
  onAddTopManagement?: () => void
  showRootAdd?: boolean
}) {
  return (
    <div className="relative flex items-start gap-[var(--space-4)]">
      {/* Horizontal connector line */}
      {nodes.length > 1 && (
        <div
          className="absolute top-0 h-[1.5px] bg-[var(--color-neutral-300)]"
          style={{
            left: `${100 / ((nodes.length + (showRootAdd ? 1 : 0)) * 2)}%`,
            right: `${100 / ((nodes.length + (showRootAdd ? 1 : 0)) * 2)}%`,
          }}
        />
      )}
      {nodes.map((node) => (
        <OrgTreeNodeBox key={node.id} node={node} onDeleteNode={onDeleteNode} onAddChild={onAddChild} />
      ))}
      {showRootAdd && onAddTopManagement && (
        <button
          type="button"
          onClick={onAddTopManagement}
          className="flex h-[44px] w-[110px] flex-col items-center justify-center rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--color-neutral-400)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary-300)] hover:text-[var(--color-primary-600)]"
        >
          <span className="flex h-[12px] w-[12px] items-center justify-center rounded-full border border-current text-[8px]">+</span>
          <span>Top Mgmt</span>
        </button>
      )}
    </div>
  )
}

function OrgTreeNodeBox({
  node,
  onDeleteNode,
  onAddChild,
}: {
  node: OrgNode
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const s = TREE_NODE_STYLES[node.level]
  const childLevel = nextOrgLevel(node.level)
  const addLabel = childLevel ? TREE_ADD_LABEL[childLevel] : undefined

  const handleAdd = () => {
    if (newName.trim() && childLevel) {
      onAddChild(node.id, newName.trim(), childLevel)
      setNewName('')
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Vertical connector from parent */}
      <div className="h-[14px] w-[1.5px] bg-[var(--color-neutral-300)]" />

      <div className={cn('relative', s.bg, s.wClass)}>
        <div className={cn('flex flex-col items-center', s.pad)}>
          <span className={s.nameClass}>{node.name}</span>
        </div>
        <button
          type="button"
          onClick={() => onDeleteNode(node.id)}
          aria-label={`Delete ${node.name}`}
          className="absolute -right-2 -top-2 z-10 flex h-4 w-4 items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-white bg-[var(--color-neutral-800)] text-[10px] font-bold leading-none text-white opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>

      {node.children.length > 0 && childLevel && (
        <>
          {/* Vertical connector to children */}
          <div className="h-[14px] w-[1.5px] bg-[var(--color-neutral-300)]" />
          <OrgTreeChildRow nodes={node.children} onDeleteNode={onDeleteNode} onAddChild={onAddChild} />
        </>
      )}

      {childLevel && addLabel && (
        <div className="mt-[var(--space-2)] w-full">
          {isAdding ? (
            <div className="flex items-center gap-[var(--space-1)]">
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd()
                  else if (e.key === 'Escape') {
                    setIsAdding(false)
                    setNewName('')
                  }
                }}
                className="h-[26px] min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-primary-300)] bg-[var(--color-surface)] px-[var(--space-2)] text-[10px] outline-none"
                placeholder="Name…"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="h-[26px] whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--color-primary-600)] px-[var(--space-2)] text-[10px] font-medium text-white"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false)
                  setNewName('')
                }}
                className="text-[10px] text-[var(--color-text-tertiary)]"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--color-neutral-400)] px-[var(--space-2)] py-[var(--space-1)] text-[10px] font-medium text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary-300)] hover:text-[var(--color-primary-600)]"
            >
              {addLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
