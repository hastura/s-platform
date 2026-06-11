'use client'

import { Button } from '@/components/ui'
import { ViewToggle, type ViewMode } from '@/components/organisms/view-toggle/ViewToggle'
import { IconUpload } from '@/components/icons'
import type { OrgLevel, OrgNode } from '@/types/company-setup'
import { OrgStructureListView } from './OrgStructureListView'
import { OrgStructureTreeView } from './OrgStructureTreeView'

export interface OrgStructureStepProps {
  companyName: string
  orgNodes: OrgNode[]
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
  onAddTopManagement: () => void
  onAddDepartment: () => void
  onBulkUpload: () => void
  onDeleteNode: (id: string) => void
  onAddChild: (parentId: string, name: string, level: OrgLevel) => void
}

/** Figma Org Structure section — list + tree chart views with bulk upload. */
export function OrgStructureStep({
  companyName,
  orgNodes,
  viewMode,
  onViewChange,
  onAddTopManagement,
  onAddDepartment,
  onBulkUpload,
  onDeleteNode,
  onAddChild,
}: OrgStructureStepProps) {
  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[var(--font-size-xl)] font-bold text-[var(--color-text-primary)]">Organizational Structure</h2>
        <div className="flex items-center gap-[var(--space-3)]">
          <ViewToggle value={viewMode} onChange={onViewChange} />
          <Button
            variant="outline"
            onClick={onBulkUpload}
            className="h-[35px] w-[130px] gap-[var(--space-1-5)] rounded-[var(--radius-lg)] border-[var(--color-border)] px-[var(--space-3)] text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)]"
          >
            <IconUpload size={14} />
            Bulk Upload
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <OrgStructureListView
          nodes={orgNodes}
          onAddTopManagement={onAddTopManagement}
          onAddDepartment={onAddDepartment}
          onDeleteNode={onDeleteNode}
          onAddChild={onAddChild}
        />
      ) : (
        <OrgStructureTreeView
          companyName={companyName}
          nodes={orgNodes}
          onAddTopManagement={onAddTopManagement}
          onDeleteNode={onDeleteNode}
          onAddChild={onAddChild}
        />
      )}
    </div>
  )
}
