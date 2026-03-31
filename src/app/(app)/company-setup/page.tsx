'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    id: 'employees',
    label: 'Employees',
    description: 'Add your team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'org',
    label: 'Org Structure',
    description: 'Build departments',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="2" /><rect x="14" y="2" width="8" height="8" rx="2" />
        <rect x="8" y="14" width="8" height="8" rx="2" /><path d="M6 10v4" /><path d="M18 10v4" /><path d="M12 18v-4" />
      </svg>
    ),
  },
  {
    id: 'competencies',
    label: 'Competencies',
    description: 'Assessment template',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'levels',
    label: 'Level Assignment',
    description: 'Map employees',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    id: 'weights',
    label: 'Weight Setup',
    description: 'OKR vs Competency',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 9H8" /><path d="M16 9h-4" /><path d="M16 5l-4 4-4-4" />
        <path d="M16 8c0-2.2-1.8-4-4-4S8 5.8 8 8s1.8 4 4 4" />
        <line x1="12" y1="3" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'schedule',
    label: 'Schedule',
    description: 'Set reminders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
]

export default function CompanySetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [companyName, setCompanyName] = useState('My Awesome Company')

  return (
    <div className="flex flex-col gap-5 max-w-[1024px]">
      {/* Header */}
      <div className="flex flex-col gap-[8px]" style={{ height: '68px' }}>
        <h1 className="text-[#0f172a] font-black text-[30px] leading-[36px] tracking-tight">Company Setup</h1>
        <p className="text-[#64748b] text-[16px] font-normal leading-[24px]">Configure your organization&apos;s foundation</p>
      </div>

      {/* Company Name Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]" style={{ height: '128px' }}>
        <div className="p-[25px] flex flex-col gap-[8px]">
          <label className="block text-[#334155] font-semibold text-[14px] leading-[20px]">Company Name</label>
          <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[12px] h-[50px] px-[16px] flex items-center">
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-transparent w-full text-[#0f172a] font-normal text-[16px] leading-[24px] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center" style={{ height: '71px' }}>
        <div className="flex items-center">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    'flex items-center gap-[12px] h-[55px] px-[16px] rounded-[12px] transition-all duration-200',
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-[0px_10px_15px_0px_rgba(59,130,246,0.2),0px_4px_6px_0px_rgba(59,130,246,0.2)]'
                      : 'bg-transparent text-[#64748b] hover:bg-slate-50'
                  )}
                >
                  <span className={cn("shrink-0", isActive ? 'text-white' : 'text-[#64748b]')}>
                    {step.icon}
                  </span>
                  <div className="flex flex-col items-start gap-0">
                    <span className={cn("text-[14px] font-semibold leading-[16px]", isActive ? 'text-white' : 'text-[#334155]')}>
                      {step.label}
                    </span>
                    <span className={cn("text-[11px] font-normal leading-[15px]", isActive ? 'text-white/80' : 'text-[#64748b]')}>
                      {step.description}
                    </span>
                  </div>
                </button>
                {index < STEPS.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-[4px] text-[#94a3b8] shrink-0">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] flex flex-col min-h-[520px]">
        <div className="flex-1 p-0">
          {currentStep === 0 && <EmployeeManagement />}
          {currentStep === 1 && <OrgStructure />}
          {currentStep > 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                {STEPS[currentStep].icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{STEPS[currentStep].label}</h3>
              <p className="text-neutral-500 max-w-sm">
                This module is coming soon.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-[25px] pt-0 flex items-center justify-between border-t border-[#e2e8f0] mt-auto">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 h-[42px] px-[24px] rounded-[12px] text-[14px] font-semibold text-[#64748b] border border-[#e2e8f0] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
            className="flex items-center gap-2 h-[42px] px-[24px] rounded-[12px] text-[14px] font-semibold text-white bg-[#2563eb] hover:bg-blue-700 shadow-[0px_10px_15px_0px_rgba(59,130,246,0.2)] transition-all"
          >
            {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
            {currentStep < STEPS.length - 1 && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function EmployeeManagement() {
  const employees = [
    { id: '00021090084', name: 'Budi Santoso', position: 'Cust. Svc Supervisor', status: 'Permanent' },
    { id: '00021090085', name: 'Sari Wijaya', position: 'Senior Supervisor', status: 'Permanent' },
  ]

  return (
    <div className="flex flex-col">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-[25px] py-[20px] border-b border-[#e2e8f0]">
        <h2 className="text-[#0f172a] font-bold text-[20px] leading-[28px]">Employee Management</h2>
        <div className="flex gap-[8px]">
          <button className="h-[42px] px-[20px] rounded-[12px] text-[14px] font-semibold text-[#334155] border border-[#e2e8f0] bg-white hover:bg-slate-50 transition-all">
            Bulk Add
          </button>
          <button className="flex items-center gap-[8px] h-[42px] px-[20px] rounded-[12px] text-[14px] font-semibold text-white bg-[#2563eb] hover:bg-blue-700 shadow-[0px_4px_6px_0px_rgba(59,130,246,0.2)] transition-all">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add Employee
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="px-[24px] py-[14px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Employee ID</th>
              <th className="px-[24px] py-[14px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Name</th>
              <th className="px-[24px] py-[14px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Job Position</th>
              <th className="px-[24px] py-[14px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Status</th>
              <th className="px-[24px] py-[14px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors">
                <td className="px-[24px] py-[16px] text-[#94a3b8] text-[14px] font-medium">{emp.id}</td>
                <td className="px-[24px] py-[16px] text-[#0f172a] text-[14px] font-semibold">{emp.name}</td>
                <td className="px-[24px] py-[16px] text-[#64748b] text-[14px] font-normal">{emp.position}</td>
                <td className="px-[24px] py-[16px]">
                  <span className="inline-flex items-center px-[10px] py-[3px] rounded-full text-[12px] font-semibold bg-[#f0fdf4] text-[#16a34a]">
                    {emp.status}
                  </span>
                </td>
                <td className="px-[24px] py-[16px]">
                  <button className="text-[#ef4444] hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrgStructure() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-[25px] py-[20px] border-b border-[#e2e8f0]">
        <h2 className="text-[#0f172a] font-bold text-[20px] leading-[28px]">Org Structure</h2>
        <button className="flex items-center gap-[8px] h-[42px] px-[20px] rounded-[12px] text-[14px] font-semibold text-white bg-[#2563eb] hover:bg-blue-700 shadow-[0px_4px_6px_0px_rgba(59,130,246,0.2)] transition-all">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add Department
        </button>
      </div>
      <div className="p-[25px] grid grid-cols-2 gap-4">
        {['Product', 'Engineering', 'Marketing', 'Sales'].map((dept) => (
          <div key={dept} className="p-5 border border-[#e2e8f0] rounded-[12px] bg-white hover:border-[#2563eb] hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#0f172a] text-[16px]">{dept}</h3>
              <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Dept</span>
            </div>
            <p className="text-sm text-[#64748b]">8 Members · 2 Teams</p>
          </div>
        ))}
      </div>
    </div>
  )
}
