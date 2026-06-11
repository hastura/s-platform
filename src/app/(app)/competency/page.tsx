'use client'

import { useState } from 'react'
import { DepartmentFilter } from '@/components/molecules/department-filter/DepartmentFilter'
import { TeamSelector } from '@/components/molecules/team-selector/TeamSelector'
import { ReviewCycleSubtitle } from '@/components/molecules/review-cycle-subtitle/ReviewCycleSubtitle'
import { ReviewCareerHero } from '@/components/organisms/competency/review-career-hero/ReviewCareerHero'
import { SelfAssessmentForm } from '@/components/organisms/competency/self-assessment-form/SelfAssessmentForm'
import { CompetencyHeatmapTable } from '@/components/organisms/competency/competency-heatmap-table/CompetencyHeatmapTable'
import { EmployeeAssessmentCard } from '@/components/organisms/competency/employee-assessment-card/EmployeeAssessmentCard'
import { CompetencyMetricCard } from '@/components/organisms/competency/competency-metric-card/CompetencyMetricCard'
import { ReviewManagerHeader } from '@/components/organisms/competency/review-manager-header/ReviewManagerHeader'
import { CompetencyReviewHeader } from '@/components/organisms/competency/competency-review-header/CompetencyReviewHeader'
import { IndividualResultView } from '@/components/organisms/competency/individual-result-view/IndividualResultView'
import {
  mockHeatmapRows,
  mockOkrLinks,
  mockOrgHealth,
  mockTeamMembers,
  useCompetencyStore,
} from '@/lib/stores/competency-store'
import { useToastStore } from '@/lib/stores/toast-store'
import { computeEmployeeCoverage } from '@/types/competency'

const CURRENT_EMPLOYEE_ID = 'emp-current'

/** Admin Level 1 — Organization Health Matrix. */
function OrgHealthView({ onDrillTeam }: { onDrillTeam: (teamId: string) => void }) {
  const departments = useCompetencyStore((s) => s.departments)
  const selectedDepartmentId = useCompetencyStore((s) => s.selectedDepartmentId)
  const [deptFilter, setDeptFilter] = useState('all')

  const deptOptions = departments.map((d) => ({ id: d.id, label: d.name }))
  const activeDept =
    deptFilter === 'all'
      ? departments.find((d) => d.id === selectedDepartmentId)
      : departments.find((d) => d.id === deptFilter)
  const teams = activeDept?.teams ?? []

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-black text-neutral-900">Organization Health Matrix</h1>
          <p className="mt-1 text-[13px] text-neutral-500">
            Aggregated competency data across all mapped departments.
          </p>
        </div>
        <DepartmentFilter value={deptFilter} options={deptOptions} onChange={setDeptFilter} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CompetencyMetricCard label="FRAMEWORK COVERAGE" value={`${mockOrgHealth.frameworkCoverage}%`} />
        <CompetencyMetricCard label="CRITICAL SKILL GAPS" value={String(mockOrgHealth.criticalSkillGaps)} />
        <CompetencyMetricCard label="PENDING APPRAISALS" value={String(mockOrgHealth.pendingAppraisals)} />
        <CompetencyMetricCard
          label="QOQ GROWTH VELOCITY"
          value={`+${mockOrgHealth.qoqGrowthVelocity}%`}
        />
      </div>
      <CompetencyHeatmapTable
        title={`Competency Heatmap (${activeDept?.name ?? 'Product & Tech'})`}
        rows={mockHeatmapRows}
        gradeColumns={['Manager Level', 'Senior Level', 'Junior Level']}
        teams={teams.map((t) => ({ id: t.id, name: t.name }))}
        onTeamClick={onDrillTeam}
        onRowClick={(rowIndex) => {
          const team = teams[rowIndex % teams.length]
          if (team) onDrillTeam(team.id)
        }}
      />
    </>
  )
}

/** Manager / Admin Level 2 — Team Review Dashboard. */
function TeamReviewView({
  showTeamSelector,
  onDrillIndividual,
}: {
  showTeamSelector: boolean
  onDrillIndividual: (employeeId: string) => void
}) {
  const sections = useCompetencyStore((s) => s.sections)
  const departments = useCompetencyStore((s) => s.departments)
  const selectedTeamId = useCompetencyStore((s) => s.selectedTeamId)
  const setSelectedTeam = useCompetencyStore((s) => s.setSelectedTeam)
  const assessments = useCompetencyStore((s) => s.assessments)
  const getGradeById = useCompetencyStore((s) => s.getGradeById)

  const allTeams = departments.flatMap((d) => d.teams)
  const team = allTeams.find((t) => t.id === selectedTeamId)
  const teamOptions = allTeams.map((t) => ({ id: t.id, label: t.name }))
  const directReports = mockTeamMembers.filter(
    (m) => m.id !== CURRENT_EMPLOYEE_ID && m.teamId === selectedTeamId
  )

  return (
    <>
      <ReviewManagerHeader />
      {showTeamSelector ? (
        <p className="flex flex-wrap items-center gap-2 text-[var(--font-size-sm)] text-neutral-700">
          <span>Managing direct reports for</span>
          <TeamSelector
            value={selectedTeamId}
            options={teamOptions}
            onChange={setSelectedTeam}
            className="min-w-[220px]"
          />
        </p>
      ) : (
        <ReviewCycleSubtitle teamName={team?.name ?? 'Product Management'} />
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {directReports.map((member) => {
          const grade = getGradeById(member.gradeId)
          const assessment = assessments.find((a) => a.employeeId === member.id)
          const coverage = grade ? computeEmployeeCoverage(grade, sections, assessment) : 0
          const hasResult =
            assessment?.status === 'completed' ||
            assessment?.status === 'self_assessed' ||
            assessment?.status === 'needs_review'

          return (
            <EmployeeAssessmentCard
              key={member.id}
              initials={member.initials}
              name={member.name}
              role={member.role}
              gradeBand={member.gradeBand}
              status={assessment?.status ?? 'not_started'}
              coveragePercent={coverage}
              actionLabel={hasResult ? 'View Individual Result' : 'Open Assessment'}
              onOpen={() => onDrillIndividual(member.id)}
            />
          )
        })}
      </div>
    </>
  )
}

/** Employee Level 1 — My Career Path self-assessment. */
function MyAssessmentView() {
  const sections = useCompetencyStore((s) => s.sections)
  const getGradeById = useCompetencyStore((s) => s.getGradeById)
  const getAssessment = useCompetencyStore((s) => s.getAssessment)
  const updateSelfRating = useCompetencyStore((s) => s.updateSelfRating)
  const updateBehaviorNotes = useCompetencyStore((s) => s.updateBehaviorNotes)
  const submitSelfAssessment = useCompetencyStore((s) => s.submitSelfAssessment)
  const addToast = useToastStore((s) => s.addToast)

  const [submitting, setSubmitting] = useState(false)

  const employee = mockTeamMembers.find((m) => m.id === CURRENT_EMPLOYEE_ID)
  const grade = employee ? getGradeById(employee.gradeId) : undefined
  const assessment = getAssessment(CURRENT_EMPLOYEE_ID)

  if (!employee || !grade || !assessment) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-500">
        No assessment data available for your profile.
      </div>
    )
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      await submitSelfAssessment(CURRENT_EMPLOYEE_ID)
      addToast({ variant: 'success', title: 'Self-assessment submitted successfully.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ReviewCareerHero
        initials={employee.initials}
        gradeBand={employee.gradeBand}
        roleTitle={employee.role}
      />
      <SelfAssessmentForm
        grade={grade}
        sections={sections}
        assessment={assessment}
        okrLinks={mockOkrLinks}
        onRatingChange={(behaviorId, rating) => updateSelfRating(CURRENT_EMPLOYEE_ID, behaviorId, rating)}
        onNotesChange={(behaviorId, notes) => updateBehaviorNotes(CURRENT_EMPLOYEE_ID, behaviorId, notes)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </>
  )
}

export default function CompetencyReviewPage() {
  const simulatedRole = useCompetencyStore((s) => s.simulatedRole)
  const reviewViewLevel = useCompetencyStore((s) => s.reviewViewLevel)
  const selectedEmployeeId = useCompetencyStore((s) => s.selectedEmployeeId)
  const setSimulatedRole = useCompetencyStore((s) => s.setSimulatedRole)
  const drillToTeam = useCompetencyStore((s) => s.drillToTeam)
  const drillToIndividual = useCompetencyStore((s) => s.drillToIndividual)
  const navigateReviewBack = useCompetencyStore((s) => s.navigateReviewBack)

  const breadcrumb =
    reviewViewLevel === 'individual'
      ? { label: 'Back to Team', onBack: navigateReviewBack }
      : reviewViewLevel === 'team' && simulatedRole === 'admin'
        ? { label: 'Back to Organization', onBack: navigateReviewBack }
        : undefined

  function renderView() {
    if (simulatedRole === 'employee') {
      return <MyAssessmentView />
    }

    if (reviewViewLevel === 'individual' && selectedEmployeeId) {
      return <IndividualResultView employeeId={selectedEmployeeId} />
    }

    if (simulatedRole === 'admin' && reviewViewLevel === 'org') {
      return <OrgHealthView onDrillTeam={drillToTeam} />
    }

    if (reviewViewLevel === 'team') {
      return (
        <TeamReviewView
          showTeamSelector={simulatedRole === 'manager'}
          onDrillIndividual={drillToIndividual}
        />
      )
    }

    return <OrgHealthView onDrillTeam={drillToTeam} />
  }

  return (
    <div className="flex flex-col gap-7">
      <CompetencyReviewHeader
        role={simulatedRole}
        onRoleChange={setSimulatedRole}
        breadcrumb={breadcrumb}
      />
      {renderView()}
    </div>
  )
}
