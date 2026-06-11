import type { OrgLevel, OrgNode } from '@/types/company-setup'

export interface MockDepartment {
  id: string
  name: string
  teams: string[]
}

export const DEFAULT_COMPANY_NAME = 'Strativy Inc.'
export const COMPANY_EMAIL_DOMAIN = 'strativy.com'

/** Flat department list for filters, invite modals, and competency dept chips. */
export const mockDepartments: MockDepartment[] = [
  { id: 'dept-engineering', name: 'Engineering', teams: ['Platform', 'Mobile', 'QA & Release'] },
  { id: 'dept-product-tech', name: 'Product & Tech', teams: ['Product Management', 'Product Design'] },
  { id: 'dept-product', name: 'Product', teams: ['Product Management', 'Design'] },
  { id: 'dept-marketing', name: 'Marketing', teams: ['Growth', 'Brand & Content', 'Marketing Ops'] },
  { id: 'dept-sales', name: 'Sales', teams: ['Enterprise', 'SMB'] },
  { id: 'dept-hr', name: 'Human Resources', teams: ['Talent Acquisition', 'People Operations'] },
  { id: 'dept-finance', name: 'Finance', teams: ['Accounting', 'FP&A'] },
]

/**
 * Rich org tree for Company Setup, OKR cascading, and Competency grade mapping.
 * Mirrors Figma 105:8 hierarchy (CIO/CMO → Engineering → Tribe → Team → Role).
 */
export const mockOrgTree: OrgNode[] = [
  {
    id: 'tm-cio',
    name: 'CIO',
    level: 'top_management',
    children: [
      {
        id: 'dept-eng',
        name: 'Engineering',
        level: 'department',
        children: [
          {
            id: 'div-tribe-a',
            name: 'Tribe A',
            level: 'division',
            children: [
              {
                id: 'team-frontend',
                name: 'Frontend Team',
                level: 'team',
                children: [
                  { id: 'role-senior-staff', name: 'Senior Staff', level: 'role', children: [] },
                  { id: 'role-junior-staff', name: 'Junior Staff', level: 'role', children: [] },
                  { id: 'role-intern', name: 'Internship', level: 'role', children: [] },
                ],
              },
              {
                id: 'team-backend',
                name: 'Backend Team',
                level: 'team',
                children: [],
              },
              {
                id: 'team-mobile',
                name: 'Mobile Team',
                level: 'team',
                children: [],
              },
            ],
          },
          {
            id: 'div-product-design',
            name: 'Product Design',
            level: 'division',
            children: [],
          },
        ],
      },
      {
        id: 'dept-product-tech',
        name: 'Product & Tech',
        level: 'department',
        children: [
          {
            id: 'team-pm',
            name: 'Product Management',
            level: 'team',
            children: [
              { id: 'grade-jpm', name: 'Junior Product Manager (G5)', level: 'role', children: [] },
              { id: 'grade-spm', name: 'Senior Product Manager (G7)', level: 'role', children: [] },
              { id: 'grade-lpm', name: 'Lead Product Manager (G9)', level: 'role', children: [] },
            ],
          },
          {
            id: 'team-design',
            name: 'Product Design',
            level: 'team',
            children: [
              { id: 'grade-jd', name: 'Junior Designer (G5)', level: 'role', children: [] },
              { id: 'grade-sd', name: 'Senior Designer (G7)', level: 'role', children: [] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tm-cmo',
    name: 'CMO',
    level: 'top_management',
    children: [
      {
        id: 'dept-marketing',
        name: 'Marketing',
        level: 'department',
        children: [
          {
            id: 'div-marketing-ops',
            name: 'Marketing Ops',
            level: 'division',
            children: [],
          },
          {
            id: 'div-growth',
            name: 'Growth',
            level: 'division',
            children: [],
          },
        ],
      },
    ],
  },
]

export function flattenOrgNodes(nodes: OrgNode[]): OrgNode[] {
  return nodes.flatMap((node) => [node, ...flattenOrgNodes(node.children)])
}

export function addChildNode(nodes: OrgNode[], parentId: string, newNode: OrgNode): OrgNode[] {
  return nodes.map((node) => {
    if (node.id === parentId) return { ...node, children: [...node.children, newNode] }
    return { ...node, children: addChildNode(node.children, parentId, newNode) }
  })
}

export function deleteNodeById(nodes: OrgNode[], id: string): OrgNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: deleteNodeById(node.children, id) }))
}

/** Child level for a given org level (undefined at leaf). */
export function nextOrgLevel(level: OrgLevel): OrgLevel | undefined {
  const order: OrgLevel[] = ['top_management', 'department', 'division', 'team', 'role']
  const idx = order.indexOf(level)
  return idx < order.length - 1 ? order[idx + 1] : undefined
}

export function collectOrgNodesByLevel(nodes: OrgNode[], level: OrgLevel): OrgNode[] {
  return flattenOrgNodes(nodes).filter((n) => n.level === level)
}

export function getDepartmentNames(): string[] {
  return mockDepartments.map((d) => d.name)
}

export function getTeamsForDepartment(departmentName: string): string[] {
  return mockDepartments.find((d) => d.name === departmentName)?.teams ?? []
}
