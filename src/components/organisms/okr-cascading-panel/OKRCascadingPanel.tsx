'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Objective, OkrPageTab, OkrViewMode } from '@/types/okr'
import { ViewToggle } from '@/components/organisms/view-toggle/ViewToggle'
import { OKRCascadeListView } from '@/components/organisms/okr-cascade-list-view/OKRCascadeListView'
import { OKRTreeChartView } from '@/components/organisms/okr-tree-chart-view/OKRTreeChartView'
import { Button } from '@/components/ui/Button'
import { IconPlus } from '@/components/icons'

export interface OKRCascadingPanelProps {
  objectives: Objective[]
  activeTab: OkrPageTab
  viewMode: OkrViewMode
  onViewModeChange: (mode: OkrViewMode) => void
  onObjectiveClick?: (objective: Objective) => void
  onAddClick?: () => void
  onEdit?: (objective: Objective) => void
  onAlign?: (objective: Objective) => void
  onAddChild?: (objective: Objective) => void
  className?: string
}

export function OKRCascadingPanel({
  objectives,
  activeTab,
  viewMode,
  onViewModeChange,
  onObjectiveClick,
  onAddClick,
  onEdit,
  onAlign,
  onAddChild,
  className,
}: OKRCascadingPanelProps) {
  const showListTreeToggle = activeTab === 'overview' || activeTab === 'alignment'

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[var(--shadow-elevation-03)]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold leading-7 text-neutral-900">Organizational Structure</h2>

        <div className="flex items-center gap-3">
          {showListTreeToggle && (
            <ViewToggle value={viewMode} onChange={onViewModeChange} />
          )}
          <Button
            type="button"
            size="sm"
            onClick={onAddClick}
            className="gap-1 rounded-lg px-4 shadow-glow-primary"
            aria-label="Add objective"
          >
            <IconPlus size={16} />
            Add
          </Button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 py-20">
          <p className="text-base font-semibold text-neutral-700">Analytics coming soon</p>
          <p className="mt-1 text-sm text-neutral-400">
            High-level charts and OKR metrics will appear here.
          </p>
        </div>
      ) : activeTab === 'alignment' || viewMode === 'tree' ? (
        <OKRTreeChartView
          objectives={objectives}
          onCardClick={onObjectiveClick}
          onEdit={onEdit}
          onAlign={onAlign}
          onAddChild={onAddChild}
        />
      ) : (
        <OKRCascadeListView
          objectives={objectives}
          onObjectiveClick={onObjectiveClick}
          onEdit={onEdit}
          onAlign={onAlign}
          onAddChild={onAddChild}
        />
      )}
    </div>
  )
}
