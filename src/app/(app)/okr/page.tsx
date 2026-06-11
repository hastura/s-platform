'use client'

import { useMemo, useState } from 'react'
import { mockObjectives } from '@/lib/mock/okrs'
import { mockSchedules } from '@/lib/mock/schedules'
import { filterObjectiveTree } from '@/lib/okr-utils'
import type { Objective, OkrFilters, OkrPageTab, OkrViewMode } from '@/types/okr'
import { ChipTabs } from '@/components/molecules/chip-tabs/ChipTabs'
import { OKRToolbar } from '@/components/organisms/okr-toolbar/OKRToolbar'
import { OKRCascadingPanel } from '@/components/organisms/okr-cascading-panel/OKRCascadingPanel'
import { OKRDetailDrawer } from '@/components/organisms/okr-detail-drawer/OKRDetailDrawer'
import { OKRAddModal } from '@/components/organisms/okr-add-modal/OKRAddModal'
import { KeyResultAddModal } from '@/components/organisms/key-result-add-modal/KeyResultAddModal'
import { StrativyBrainWidget } from '@/components/organisms/strativy-brain-widget/StrativyBrainWidget'
import { useToastStore } from '@/lib/stores/toast-store'

const PAGE_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'alignment', label: 'Alignment' },
  { value: 'analytics', label: 'Analytics' },
]

const DEFAULT_PERIOD =
  mockSchedules.find((s) => s.id === 'sch-001')?.id ??
  mockSchedules.find((s) => s.scope !== 'competency')?.id ??
  null

function matchesFilters(objective: Objective, filters: OkrFilters): boolean {
  if (filters.periodId && objective.periodId !== filters.periodId) return false
  if (filters.ownerId && objective.ownerId !== filters.ownerId) return false
  if (filters.teamId && objective.teamId !== filters.teamId && objective.departmentId !== filters.teamId) {
    return false
  }
  if (filters.status && objective.status !== filters.status) return false
  if (filters.search) {
    const q = filters.search.toLowerCase()
    const inTitle = objective.title.toLowerCase().includes(q)
    const inKr = objective.keyResults.some((kr) => kr.title.toLowerCase().includes(q))
    if (!inTitle && !inKr) return false
  }
  return true
}

export default function OKRPage() {
  const addToast = useToastStore((s) => s.addToast)

  const [activeTab, setActiveTab] = useState<OkrPageTab>('overview')
  const [viewMode, setViewMode] = useState<OkrViewMode>('list')
  const [filters, setFilters] = useState<OkrFilters>({
    search: '',
    ownerId: null,
    teamId: null,
    status: null,
    periodId: DEFAULT_PERIOD,
  })

  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [krModalOpen, setKrModalOpen] = useState(false)
  const [addParent, setAddParent] = useState<Objective | null>(null)

  const filteredObjectives = useMemo(
    () => filterObjectiveTree(mockObjectives, (obj) => matchesFilters(obj, filters)),
    [filters]
  )

  function handleTabChange(tab: string) {
    const next = tab as OkrPageTab
    setActiveTab(next)
    if (next === 'alignment') setViewMode('tree')
    if (next === 'overview') setViewMode('list')
  }

  function handleViewModeChange(mode: OkrViewMode) {
    setViewMode(mode)
    setActiveTab(mode === 'tree' ? 'alignment' : 'overview')
  }

  function openDrawer(objective: Objective) {
    setSelectedObjective(objective)
    setDrawerOpen(true)
  }

  function handleExport() {
    addToast({ variant: 'info', title: 'Export will download the current OKR view (stub).' })
  }

  function handleAddClick() {
    setAddParent(null)
    setAddModalOpen(true)
  }

  function handleAddChild(objective: Objective) {
    setAddParent(objective)
    setAddModalOpen(true)
  }

  function handleAddKeyResult(objective: Objective) {
    setSelectedObjective(objective)
    setKrModalOpen(true)
  }

  const showBrain = activeTab !== 'analytics'

  return (
    <div className="flex flex-col gap-6">
      <OKRToolbar filters={filters} onFiltersChange={setFilters} onExport={handleExport} />

      <ChipTabs
        items={PAGE_TABS}
        value={activeTab}
        onValueChange={handleTabChange}
        aria-label="OKR view tabs"
        variant="lg"
      />

      <OKRCascadingPanel
        objectives={filteredObjectives}
        activeTab={activeTab}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onObjectiveClick={openDrawer}
        onAddClick={handleAddClick}
        onEdit={(obj) => openDrawer(obj)}
        onAlign={() => {
          setActiveTab('alignment')
          setViewMode('tree')
        }}
        onAddChild={handleAddChild}
      />

      <OKRDetailDrawer
        open={drawerOpen}
        objective={selectedObjective}
        onClose={() => setDrawerOpen(false)}
        onAddKeyResult={handleAddKeyResult}
      />

      <OKRAddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        parentTitle={addParent?.title}
        onSubmit={() => addToast({ variant: 'success', title: 'Objective added (mock).' })}
      />

      <KeyResultAddModal
        open={krModalOpen}
        onClose={() => setKrModalOpen(false)}
        objectiveTitle={selectedObjective?.title}
        onSubmit={() => addToast({ variant: 'success', title: 'Key result added (mock).' })}
      />

      {showBrain && <StrativyBrainWidget />}
    </div>
  )
}
