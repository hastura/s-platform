'use client'

import { useEffect, useState } from 'react'
import { AddCompetencyModal } from '@/components/organisms/competency/add-competency-modal/AddCompetencyModal'
import { CompetencyBulkImportModal } from '@/components/organisms/competency/competency-bulk-import-modal/CompetencyBulkImportModal'
import { MapCompetenciesModal } from '@/components/organisms/competency/map-competencies-modal/MapCompetenciesModal'
import { MappingWorkspace } from '@/components/organisms/competency/mapping-workspace/MappingWorkspace'
import { SkillLibraryPanel } from '@/components/organisms/competency/skill-library-panel/SkillLibraryPanel'
import { useCompetencyStore } from '@/lib/stores/competency-store'
import { useToastStore } from '@/lib/stores/toast-store'

export default function CompetencySetupPage() {
  const sections = useCompetencyStore((s) => s.sections)
  const departments = useCompetencyStore((s) => s.departments)
  const selectedDepartmentId = useCompetencyStore((s) => s.selectedDepartmentId)
  const setSelectedDepartment = useCompetencyStore((s) => s.setSelectedDepartment)
  const addSection = useCompetencyStore((s) => s.addSection)
  const addCompetency = useCompetencyStore((s) => s.addCompetency)
  const removeBehavior = useCompetencyStore((s) => s.removeBehavior)
  const bulkImportSections = useCompetencyStore((s) => s.bulkImportSections)
  const assignCompetency = useCompetencyStore((s) => s.assignCompetency)
  const getGradeById = useCompetencyStore((s) => s.getGradeById)
  const syncDepartmentsFromCompanySetup = useCompetencyStore((s) => s.syncDepartmentsFromCompanySetup)
  const addToast = useToastStore((s) => s.addToast)

  useEffect(() => {
    syncDepartmentsFromCompanySetup()
  }, [syncDepartmentsFromCompanySetup])

  const [addCompOpen, setAddCompOpen] = useState(false)
  const [addCompSectionId, setAddCompSectionId] = useState<string | null>(null)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [mapGradeId, setMapGradeId] = useState<string | null>(null)

  const addCompSection = sections.find((s) => s.id === addCompSectionId)
  const mapGrade = mapGradeId ? getGradeById(mapGradeId) : undefined

  function openAddCompetency(sectionId: string) {
    setAddCompSectionId(sectionId)
    setAddCompOpen(true)
  }

  function openMapCompetency(gradeId: string) {
    setMapGradeId(gradeId)
    setMapOpen(true)
  }

  return (
    <div className="flex gap-6">
      <SkillLibraryPanel
        sections={sections}
        onAddSection={() => addSection('New Section')}
        onAddCompetency={openAddCompetency}
        onRemoveBehavior={removeBehavior}
        onBulkImport={() => setBulkOpen(true)}
      />
      <MappingWorkspace
        departments={departments}
        sections={sections}
        selectedDepartmentId={selectedDepartmentId}
        onDepartmentChange={setSelectedDepartment}
        onAddCompetency={openMapCompetency}
        onSave={() => addToast({ variant: 'success', title: 'Competency mapping saved.' })}
      />

      <AddCompetencyModal
        open={addCompOpen}
        onClose={() => setAddCompOpen(false)}
        sectionTitle={addCompSection?.title ?? 'Section'}
        onSubmit={async (data) => {
          if (addCompSectionId) {
            await addCompetency(
              addCompSectionId,
              data.name,
              data.description,
              data.behaviors.map((b) => ({
                text: b.name,
                description: b.description,
              }))
            )
            addToast({ variant: 'success', title: `Added ${data.name} to library.` })
          }
        }}
      />

      <CompetencyBulkImportModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onSubmit={bulkImportSections}
      />

      {mapGrade && (
        <MapCompetenciesModal
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          gradeTitle={mapGrade.level}
          sections={sections}
          existingAssignments={mapGrade.assignments}
          onSubmit={async (assignment) => {
            await assignCompetency(mapGrade.id, assignment)
            addToast({ variant: 'success', title: 'Skills assigned to grade.' })
          }}
        />
      )}
    </div>
  )
}
