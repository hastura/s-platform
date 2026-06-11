'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Slider, Spinner } from '@/components/atoms'
import { SuccessModal } from '@/components/molecules'
import { IconTarget, IconRibbon, IconAlertTriangle, IconInfo } from '@/components/icons'
import { useSettingsStore } from '@/lib/stores'
import { getScheduleStatus } from '@/lib/mock'
import { WEIGHT_STEP, WEIGHT_TOTAL } from '@/types/settings'

/** Performance Weight Configuration — Figma node 614:4124 (WeightStep). */
export function WeightConfigStep() {
  const weightConfig = useSettingsStore((s) => s.weightConfig)
  const saveWeightConfig = useSettingsStore((s) => s.saveWeightConfig)
  const schedules = useSettingsStore((s) => s.schedules)

  const [okrWeight, setOkrWeight] = useState(weightConfig.okrWeight)
  const [saving, setSaving] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const competencyWeight = WEIGHT_TOTAL - okrWeight
  const isDirty = okrWeight !== weightConfig.okrWeight
  const isLocked = weightConfig.isLocked
  const hasActiveCycle = schedules.some((s) => !s.archived && getScheduleStatus(s) === 'active')

  async function handleSave() {
    if (!isDirty || isLocked || saving) return
    setSaving(true)
    try {
      await saveWeightConfig(okrWeight)
      setSuccessOpen(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section
      aria-label="Performance Weight Configuration"
      className="flex w-full flex-col gap-[var(--space-6)] rounded-[var(--radius-2xl)] border border-[var(--color-neutral-200)] bg-[var(--color-surface)] p-[var(--space-6)]"
    >
      <div className="flex items-center justify-between gap-[var(--space-4)]">
        <div className="flex max-w-[415px] flex-col">
          <h2 className="text-[18px] font-bold leading-[19.8px] text-[var(--color-text-primary)]">
            Performance Weight Configuration
          </h2>
          <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-secondary)]">
            Define the relative importance of objectives and competencies in performance reviews.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isLocked || saving}
          className="flex h-[35px] min-w-[65px] items-center justify-center gap-[var(--space-2)] rounded-[7px] bg-[var(--color-primary-600)] px-[16px] py-[6px] text-[14px] font-normal text-[var(--color-text-inverse)] transition-all hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
        >
          {saving ? <Spinner size={14} /> : 'Save'}
        </button>
      </div>

      {isLocked && (
        <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-[var(--space-4)]">
          <IconAlertTriangle size={18} className="mt-[1px] shrink-0 text-[var(--color-warning-600)]" />
          <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-warning-800)]">
            Weights are locked while an appraisal cycle is in progress. They can be changed again once the cycle
            closes.
          </p>
        </div>
      )}
      {!isLocked && hasActiveCycle && (
        <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] p-[var(--space-4)]">
          <IconInfo size={18} className="mt-[1px] shrink-0 text-[var(--color-primary-600)]" />
          <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-primary-800)]">
            A review cycle is currently active. Weight changes apply to assessments submitted after saving — past
            scores are not recalculated.
          </p>
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-[var(--space-5)] py-[var(--space-2)]">
        <Slider
          value={okrWeight}
          onValueChange={setOkrWeight}
          min={0}
          max={WEIGHT_TOTAL}
          step={WEIGHT_STEP}
          disabled={isLocked}
          aria-label="OKR weight percentage"
          formatValueText={(v) => `OKR ${v}%, Competency ${WEIGHT_TOTAL - v}%`}
        />
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[80px] flex-col gap-[2px]">
            <p className="text-[24px] font-semibold leading-[26.4px] text-[var(--color-primary-600)]" aria-live="polite">
              {okrWeight}%
            </p>
            <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)]">
              OKR
            </p>
          </div>
          <div className="flex w-[100px] flex-col items-end gap-[2px] text-right">
            <p className="w-full text-[24px] font-semibold leading-[26.4px] text-[var(--color-text-tertiary)]">
              {competencyWeight}%
            </p>
            <p className="w-full text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)]">
              Competency
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-start gap-[var(--space-6)]">
        <div
          className="flex h-[88px] w-[524.5px] flex-col items-start justify-center rounded-[var(--radius-2xl)] px-[var(--space-6)]"
          style={{ backgroundImage: 'var(--gradient-stat-primary)' }}
        >
          <div className="flex w-full items-center gap-[var(--space-3)]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[rgba(255,255,255,0.2)] text-white">
              <IconTarget size={27} />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] font-bold uppercase leading-[20px] tracking-[0.7px] text-white/80">
                OKR
              </p>
              <p className="text-[30px] font-black leading-[36px] text-white">{okrWeight}%</p>
            </div>
          </div>
        </div>
        <div
          className="flex h-[88px] w-[524.5px] flex-col items-start justify-center rounded-[var(--radius-2xl)] px-[var(--space-6)]"
          style={{ backgroundImage: 'var(--gradient-stat-success)' }}
        >
          <div className="flex w-full items-center gap-[var(--space-3)]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[rgba(255,255,255,0.2)] text-white">
              <IconRibbon size={27} />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] font-bold uppercase leading-[20px] tracking-[0.7px] text-white/80">
                Competency
              </p>
              <p className="text-[30px] font-black leading-[36px] text-white">{competencyWeight}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px] rounded-[12px] border border-[var(--color-neutral-100)] bg-[var(--color-bg-page)] pb-px pt-[25px] px-[25px]">
        <p className="text-[16px] font-normal leading-[24px] text-[var(--color-text-tertiary)]">
          Total Performance Score
        </p>
        <p
          className={cn(
            'text-[24px] font-semibold leading-[26.4px] text-black',
            okrWeight + competencyWeight !== WEIGHT_TOTAL && 'text-[var(--color-danger-600)]'
          )}
        >
          OKR ({okrWeight}%) + Competency ({competencyWeight}%) = {okrWeight + competencyWeight}%
        </p>
      </div>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </section>
  )
}
