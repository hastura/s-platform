'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import type { OrgLevel, OrgNode } from '@/types/company-setup'
import { nextOrgLevel } from '@/lib/mock/departments'

const CHILD_COUNT_LABEL: Record<OrgLevel, (n: number) => string> = {
  top_management: (n) => `${n} depts`,
  department: (n) => `${n} divs`,
  division: (n) => `${n} teams`,
  team: (n) => `${n} staff`,
  role: () => '',
}

const ADD_CHILD_LABEL: Partial<Record<OrgLevel, string>> = {
  top_management: '+ Add Dept (C-Level)',
  department: '+ Add Division / Sub-dept',
  division: '+ Add Squad / Team',
  team: '+ Add Individual Contributor',
}

const LIST_ROW_STYLES: Record<
  OrgLevel,
  { header: string; indicator: string; label: string; childIndent: string; trashTone: string }
> = {
  top_management: {
    header:
      'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4)] py-[var(--space-3)] shadow-[var(--shadow-sm)]',
    indicator: 'h-[14px] w-[8px] rounded-[2px] bg-[var(--color-primary-600)]',
    label: 'text-[15px] font-bold text-[var(--color-text-primary)]',
    childIndent: 'pl-[var(--space-8)] pt-[var(--space-2)]',
    trashTone: 'text-[var(--color-danger-500)] hover:text-[var(--color-danger-600)]',
  },
  department: {
    header:
      'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-3)]',
    indicator: 'h-[44px] w-[3px] rounded-[2px] bg-[var(--color-primary-600)]',
    label: 'text-[13px] font-semibold text-[var(--color-text-primary)]',
    childIndent: 'pl-[var(--space-10)] pt-[var(--space-1)]',
    trashTone: 'text-[var(--color-text-tertiary)] hover:text-[var(--color-danger-600)]',
  },
  division: {
    header:
      'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-page)] px-[var(--space-3)] py-[var(--space-2)]',
    indicator: 'h-[7px] w-[7px] rounded-full bg-[var(--color-primary-500)]',
    label: 'text-[13px] font-semibold text-[var(--color-text-secondary)]',
    childIndent: 'pl-[var(--space-12)] pt-[var(--space-1)]',
    trashTone: 'text-[var(--color-text-tertiary)] hover:text-[var(--color-danger-600)]',
  },
  team: {
    header:
      'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-[var(--space-3)] py-[var(--space-2)]',
    indicator: 'h-[6px] w-[6px] rounded-full bg-[var(--color-primary-400)]',
    label: 'text-[13px] text-[var(--color-text-secondary)]',
    childIndent: 'pl-[var(--space-14)] pt-[var(--space-1)]',
    trashTone: 'text-[var(--color-text-tertiary)] hover:text-[var(--color-danger-600)]',
  },
  role: {
    header:
      'rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-[var(--space-3)] py-[var(--space-2)]',
    indicator: 'h-[5px] w-[5px] rounded-full bg-[var(--color-neutral-400)]',
    label: 'text-[12px] text-[var(--color-text-tertiary)]',
    childIndent: 'pl-[var(--space-16)]',
    trashTone: 'text-[var(--color-text-tertiary)] hover:text-[var(--color-danger-600)]',
  },
}

export interface OrgNodeListItemProps {
  node: OrgNode
  depth: number
  onDelete: () => void
  onAddChild: (name: string, level: OrgLevel) => void
  onDeleteDescendant: (id: string) => void
  onAddDescendantChild: (parentId: string, name: string, level: OrgLevel) => void
}

export function OrgNodeListItem({
  node,
  depth,
  onDelete,
  onAddChild,
  onDeleteDescendant,
  onAddDescendantChild,
}: OrgNodeListItemProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  const s = LIST_ROW_STYLES[node.level]
  const childLevel = nextOrgLevel(node.level)
  const addLabel = ADD_CHILD_LABEL[node.level]
  const countLabel = CHILD_COUNT_LABEL[node.level](node.children.length)

  const handleAdd = () => {
    if (newName.trim() && childLevel) {
      onAddChild(newName.trim(), childLevel)
      setNewName('')
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className={cn(s.header, 'group flex items-center justify-between')}>
        <div className="flex items-center gap-[var(--space-3)]">
          <div className={cn(s.indicator, 'shrink-0')} aria-hidden="true" />
          <span className={s.label}>{node.name}</span>
        </div>
        <div className="flex items-center gap-[var(--space-2)]">
          {countLabel && (
            <span className="rounded-[var(--radius-md)] bg-[var(--color-neutral-100)] px-[var(--space-3)] py-[var(--space-1)] text-[11px] text-[var(--color-text-secondary)]">
              {countLabel}
            </span>
          )}
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${node.name}`}
            className={cn('opacity-0 transition-opacity group-hover:opacity-100', s.trashTone)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {childLevel && (
        <div className={cn('flex flex-col gap-[var(--space-1)]', s.childIndent)}>
          {node.children.map((child) => (
            <OrgNodeListItem
              key={child.id}
              node={child}
              depth={depth + 1}
              onDelete={() => onDeleteDescendant(child.id)}
              onAddChild={(name, level) => onAddDescendantChild(child.id, name, level)}
              onDeleteDescendant={onDeleteDescendant}
              onAddDescendantChild={onAddDescendantChild}
            />
          ))}

          {addLabel &&
            (isAdding ? (
              <div className="flex items-center gap-[var(--space-2)]">
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
                  className="h-[36px] flex-1 rounded-[var(--radius-md)] border border-[var(--color-primary-300)] bg-[var(--color-surface)] px-[var(--space-3)] text-[13px] outline-none"
                  placeholder="Name…"
                />
                <Button onClick={handleAdd} className="h-[36px] bg-[var(--color-primary-600)] px-[var(--space-3)] text-[11px]">
                  Add
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false)
                    setNewName('')
                  }}
                  className="text-[11px] text-[var(--color-text-tertiary)] hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex w-full items-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] px-[var(--space-3)] py-[var(--space-2)] text-[13px] font-medium text-[var(--color-primary-600)] transition-colors hover:border-[var(--color-primary-300)]"
              >
                {addLabel}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
