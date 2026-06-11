import { create } from 'zustand'
import { DEFAULT_COMPANY_NAME, mockOrgTree } from '@/lib/mock/departments'
import type { OrgNode } from '@/types/company-setup'

interface CompanySetupState {
  companyName: string
  orgNodes: OrgNode[]
  setCompanyName: (name: string) => void
  setOrgNodes: (nodes: OrgNode[]) => void
}

export const useCompanySetupStore = create<CompanySetupState>((set) => ({
  companyName: DEFAULT_COMPANY_NAME,
  orgNodes: mockOrgTree,
  setCompanyName: (name) => set({ companyName: name }),
  setOrgNodes: (nodes) => set({ orgNodes: nodes }),
}))
