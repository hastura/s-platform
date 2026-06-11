'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { StepIndicator, type Step } from '@/components/molecules/step-indicator/StepIndicator'
import { Button } from '@/components/ui'
import { IconChevronLeft, IconChevronRight } from '@/components/icons'

export interface CompanySetupPageTemplateProps {
  companyName: string
  onCompanyNameChange: (name: string) => void
  steps: Step[]
  currentStep: number
  onStepClick: (index: number) => void
  onBack: () => void
  onNext: () => void
  isLastStep: boolean
  children: React.ReactNode
  className?: string
}

/** Figma 105:344 — Company Setup page shell (title, company name, stepper, content card, footer). */
export function CompanySetupPageTemplate({
  companyName,
  onCompanyNameChange,
  steps,
  currentStep,
  onStepClick,
  onBack,
  onNext,
  isLastStep,
  children,
  className,
}: CompanySetupPageTemplateProps) {
  return (
    <div className={cn('mx-auto flex w-full max-w-[1366px] flex-col gap-[var(--space-8)] py-[var(--space-10)]', className)}>
      <div className="flex flex-col gap-[var(--space-2)]">
        <h1 className="text-[var(--font-size-3xl)] font-black leading-9 tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]">
          Company Setup
        </h1>
        <p className="text-[var(--font-size-base)] text-[var(--color-text-muted)]">
          Configure your organization&apos;s foundation
        </p>
      </div>

      <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-6)] py-[var(--space-6)] shadow-[var(--shadow-sm)]">
        <label
          htmlFor="company-name"
          className="mb-[var(--space-2)] block text-[var(--font-size-sm)] font-bold uppercase tracking-[0.72px] text-[var(--color-neutral-700)]"
        >
          Company Name
        </label>
        <div className="flex h-[50px] items-center rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-neutral-100)] px-[var(--space-4)]">
          <input
            id="company-name"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="w-full bg-transparent text-[var(--font-size-base)] font-semibold text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
            placeholder="Enter your company name"
          />
        </div>
      </div>

      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepClick}
        variant="wizard"
        className="px-0"
      />

      <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)] shadow-[var(--shadow-sm)]">
        {children}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 0}
          className={cn(
            'h-[48px] gap-[var(--space-2)] rounded-[var(--radius-xl)] px-[var(--space-6)] text-[var(--font-size-base)] font-semibold',
            currentStep === 0 && 'invisible'
          )}
        >
          <IconChevronLeft size={18} />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="h-[48px] gap-[var(--space-2)] rounded-[var(--radius-xl)] bg-[var(--color-primary-600)] px-[var(--space-6)] text-[var(--font-size-base)] font-semibold text-white shadow-[var(--shadow-glow-primary-sm)] hover:bg-[var(--color-primary-700)]"
        >
          {isLastStep ? 'Finish' : 'Next'}
          {!isLastStep && <IconChevronRight size={18} />}
        </Button>
      </div>
    </div>
  )
}
