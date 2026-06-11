'use client'

import { useState } from 'react'
import { type Step } from '@/components/molecules/step-indicator/StepIndicator'
import { AddEmployeeModal, type EmployeeFormData } from '@/components/organisms/add-employee-modal/AddEmployeeModal'
import { AddDepartmentModal, type DepartmentFormData } from '@/components/organisms/add-department-modal/AddDepartmentModal'
import { CompanySetupEmployeeStep } from '@/components/organisms/company-setup-employee-step/CompanySetupEmployeeStep'
import { OrgStructureStep } from '@/components/organisms/org-structure-step/OrgStructureStep'
import {
  BulkOrgUploadModal,
  BulkOrgUploadSuccessModal,
  type BulkOrgUploadResult,
} from '@/components/organisms/bulk-org-upload-modal/BulkOrgUploadModal'
import { CompanySetupPageTemplate } from '@/components/templates/CompanySetupPageTemplate'
import { type ViewMode } from '@/components/organisms/view-toggle/ViewToggle'
import {
  DEFAULT_COMPANY_NAME,
  mockOrgTree,
  addChildNode,
  deleteNodeById,
} from '@/lib/mock/departments'
import { mockCompanySetupEmployees } from '@/lib/mock/members'
import type { CompanySetupEmployee, OrgLevel, OrgNode } from '@/types/company-setup'

const STEPS: Step[] = [
  {
    id: 'org',
    label: 'Org Structure',
    description: 'Build your org hierarchy',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="2" /><rect x="14" y="2" width="8" height="8" rx="2" />
        <rect x="8" y="14" width="8" height="8" rx="2" /><path d="M6 10v4" /><path d="M18 10v4" /><path d="M12 18v-4" />
      </svg>
    ),
  },
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
]

export default function CompanySetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [companyName, setCompanyName] = useState(DEFAULT_COMPANY_NAME)
  const [employees, setEmployees] = useState<CompanySetupEmployee[]>(mockCompanySetupEmployees)
  const [orgNodes, setOrgNodes] = useState<OrgNode[]>(mockOrgTree)
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isAddTopManagementOpen, setIsAddTopManagementOpen] = useState(false)
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<CompanySetupEmployee | undefined>()
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false)
  const [bulkUploadSuccess, setBulkUploadSuccess] = useState<BulkOrgUploadResult | null>(null)

  const handleAddEmployee = (data: EmployeeFormData) => {
    const newEmployee: CompanySetupEmployee = {
      id: data.id,
      name: data.name,
      email: data.email || '',
      position: data.position,
      department: data.department || '',
      status: data.status,
      active: true,
    }

    if (editingEmployee) {
      setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...newEmployee, active: emp.active } : emp)))
      setEditingEmployee(undefined)
    } else {
      setEmployees((prev) => [...prev, newEmployee])
    }
  }

  const handleDeleteEmployee = (employee: CompanySetupEmployee) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
  }

  const handleToggleActive = (employee: CompanySetupEmployee, active: boolean) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === employee.id ? { ...emp, active } : emp)))
  }

  const handleAddTopManagement = (data: DepartmentFormData) => {
    const newNode: OrgNode = {
      id: `tm-${Date.now()}`,
      name: data.name,
      level: 'top_management',
      children: [],
    }
    setOrgNodes((prev) => [...prev, newNode])
  }

  const handleDeleteNode = (id: string) => {
    setOrgNodes((prev) => deleteNodeById(prev, id))
  }

  const handleAddChild = (parentId: string, name: string, level: OrgLevel) => {
    const newNode: OrgNode = { id: `node-${Date.now()}`, name, level, children: [] }
    setOrgNodes((prev) => addChildNode(prev, parentId, newNode))
  }

  return (
    <>
      <CompanySetupPageTemplate
        companyName={companyName}
        onCompanyNameChange={setCompanyName}
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        onBack={() => setCurrentStep(Math.max(0, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
        isLastStep={currentStep === STEPS.length - 1}
      >
        {currentStep === 0 ? (
          <OrgStructureStep
            companyName={companyName}
            orgNodes={orgNodes}
            viewMode={viewMode}
            onViewChange={setViewMode}
            onAddTopManagement={() => setIsAddTopManagementOpen(true)}
            onAddDepartment={() => setIsAddDepartmentOpen(true)}
            onBulkUpload={() => setIsBulkUploadOpen(true)}
            onDeleteNode={handleDeleteNode}
            onAddChild={handleAddChild}
          />
        ) : (
          <CompanySetupEmployeeStep
            employees={employees}
            onAdd={() => {
              setEditingEmployee(undefined)
              setIsAddEmployeeOpen(true)
            }}
            onBulkImport={() => setIsAddEmployeeOpen(true)}
            onDelete={handleDeleteEmployee}
            onToggleActive={handleToggleActive}
          />
        )}
      </CompanySetupPageTemplate>

      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={() => {
          setIsAddEmployeeOpen(false)
          setEditingEmployee(undefined)
        }}
        onSubmit={handleAddEmployee}
        initialData={editingEmployee}
      />

      <AddDepartmentModal
        isOpen={isAddTopManagementOpen}
        onClose={() => setIsAddTopManagementOpen(false)}
        onSubmit={handleAddTopManagement}
      />

      <AddDepartmentModal
        isOpen={isAddDepartmentOpen}
        onClose={() => setIsAddDepartmentOpen(false)}
        onSubmit={(data) => {
          const newNode: OrgNode = {
            id: `dept-${Date.now()}`,
            name: data.name,
            level: 'department',
            children: [],
          }
          setOrgNodes((prev) => [...prev, newNode])
        }}
      />

      <BulkOrgUploadModal
        open={isBulkUploadOpen && !bulkUploadSuccess}
        onClose={() => setIsBulkUploadOpen(false)}
        onSuccess={(result) => {
          setIsBulkUploadOpen(false)
          setBulkUploadSuccess(result)
        }}
      />

      {bulkUploadSuccess && (
        <BulkOrgUploadSuccessModal
          open
          result={bulkUploadSuccess}
          onClose={() => setBulkUploadSuccess(null)}
        />
      )}
    </>
  )
}
