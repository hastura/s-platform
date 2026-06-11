'use client'

import type { OrgLevel, OrgNode } from '@/types/company-setup'
import { OrgNodeListItem } from './OrgNodeListItem'

export interface OrgStructureListViewProps {
  nodes: OrgNode[]
  onAddTopManagement: () => void
  onAddDepartment: () => void
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}

/** Figma Organism/Org List — CEO root row + nested top-management cards. */
export function OrgStructureListView({
  nodes,
  onAddTopManagement,
  onAddDepartment,
  onDeleteNode,
  onAddChild,
}: OrgStructureListViewProps) {
  return (
    <div className="flex flex-col gap-[var(--space-3)]">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-primary-100)] bg-[var(--color-primary-50)] px-[var(--space-4)] py-[var(--space-3)] shadow-[var(--shadow-xs)]">
        <div className="flex items-start gap-[var(--space-3)]">
          <div className="mt-[var(--space-1)] h-[14px] w-[8px] shrink-0 rounded-[2px] bg-[var(--color-primary-600)]" aria-hidden="true" />
          <div>
            <p className="text-[15px] font-bold text-[var(--color-text-primary)]">CEO</p>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">Organization · Root</p>
          </div>
        </div>
      </div>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-3)] shadow-[var(--shadow-md)]"
        >
          <OrgNodeListItem
            node={node}
            depth={0}
            onDelete={() => onDeleteNode(node.id)}
            onAddChild={(name, level) => onAddChild(node.id, name, level)}
            onDeleteDescendant={onDeleteNode}
            onAddDescendantChild={onAddChild}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onAddTopManagement}
        className="flex h-[40px] w-full items-center gap-[var(--space-2)] rounded-[10px] border-[1.5px] border-dashed border-[var(--color-neutral-300)] px-[var(--space-4)] text-[13px] font-medium text-[var(--color-primary-600)] transition-colors hover:border-[var(--color-primary-300)]"
      >
        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-[var(--color-primary-600)] text-[10px]">+</span>
        Add Top Management
      </button>

      <button
        type="button"
        onClick={onAddDepartment}
        className="flex h-[56px] w-full items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-xl)] border-[1.5px] border-dashed border-[var(--color-neutral-300)] text-[14px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary-300)] hover:text-[var(--color-primary-600)]"
      >
        + Add Department
      </button>
    </div>
  )
}
