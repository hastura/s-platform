'use client'

import { useState } from 'react'
import { ChipTabs } from '@/components/molecules'
import { WeightConfigStep } from '@/components/organisms/settings/weight-config-step/WeightConfigStep'
import { RatingScalesStep } from '@/components/organisms/settings/rating-scales-step/RatingScalesStep'
import { RoleAppraisalStep } from '@/components/organisms/settings/role-appraisal-step/RoleAppraisalStep'

const TABS = [
  { value: 'weights', label: 'Weight Configuration' },
  { value: 'ratings', label: 'Rating Scales' },
  { value: 'role-appraisal', label: 'Role Appraisal' },
]

/** Performance Configuration shell — PRD tabs for weight, ratings, and role appraisal. */
export function PerformanceConfigurationStep() {
  const [tab, setTab] = useState('weights')

  return (
    <>
      <ChipTabs aria-label="Performance configuration sections" items={TABS} value={tab} onValueChange={setTab} />
      {tab === 'weights' && <WeightConfigStep />}
      {tab === 'ratings' && <RatingScalesStep />}
      {tab === 'role-appraisal' && <RoleAppraisalStep />}
    </>
  )
}
