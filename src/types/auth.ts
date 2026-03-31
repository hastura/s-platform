export type UserRole = 'super_admin' | 'company_admin' | 'manager' | 'employee'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  companyId: string
  departmentId?: string
  teamId?: string
  avatarUrl?: string
}
