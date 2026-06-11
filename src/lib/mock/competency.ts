import type {
  CompetencyDepartment,
  EmployeeAssessment,
  HeatmapRow,
  OkrLink,
  OrgHealthMetrics,
  Section,
  TeamMember,
} from '@/types/competency'

export const mockSections: Section[] = [
  {
    id: 'sec-core',
    title: 'Core Competencies',
    description:
      'Foundational skills expected across all product roles, covering strategy, vision, and market understanding.',
    competencies: [
      {
        id: 'comp-product-strategy',
        name: 'Product Strategy',
        description:
          'Ability to define product direction, prioritize opportunities, and align roadmap decisions with business goals.',
        behaviors: [
          {
            id: 'beh-market-seg',
            text: 'Market Segmentation',
            description:
              'Introducing the latest version of Strativy Analytics Dashboard, designed to enhance market segmentation strategies. This update focuses on providing deeper insights into customer demographics and behavior.',
          },
          {
            id: 'beh-vision-setting',
            text: 'Vision Setting',
            description:
              "Announce the launch of the 'Clarity' data visualization platform and articulate a long-term product vision aligned to company OKRs.",
          },
          {
            id: 'beh-competitive',
            text: 'Competitive Analysis',
            description:
              'Conduct structured competitive analysis and translate findings into actionable product differentiation strategies.',
          },
        ],
      },
    ],
  },
  {
    id: 'sec-communication',
    title: 'Communication',
    description:
      'Skills for effective collaboration, influence, and clear communication with internal and external stakeholders.',
    competencies: [
      {
        id: 'comp-stakeholder',
        name: 'Stakeholder Management',
        description:
          'Builds trusted relationships with executives, partners, and cross-functional teams to drive alignment and decisions.',
        behaviors: [
          {
            id: 'beh-exec-comms',
            text: 'Executive Communication',
            description: 'Deliver concise executive updates with clear asks and measurable outcomes.',
          },
        ],
      },
    ],
  },
  {
    id: 'sec-technical',
    title: 'Technical',
    description:
      'Technical knowledge and fluency required to collaborate effectively with engineering and make informed product decisions.',
    competencies: [
      {
        id: 'comp-tech-literacy',
        name: 'Technical Literacy',
        description:
          'Understands system architecture, data models, and technical trade-offs to partner effectively with engineering teams.',
        behaviors: [
          {
            id: 'beh-sql',
            text: 'SQL Proficiency',
            description: 'Write and optimize SQL queries for product analytics and reporting.',
          },
          {
            id: 'beh-api-design',
            text: 'API Design Awareness',
            description: 'Collaborate with engineering on API contracts and integration patterns.',
          },
        ],
      },
    ],
  },
]

export const mockCompetencyDepartments: CompetencyDepartment[] = [
  {
    id: 'dept-product-tech',
    name: 'Product & Tech',
    teams: [
      {
        id: 'team-pm',
        departmentId: 'dept-product-tech',
        name: 'Product Management',
        grades: [
          {
            id: 'grade-junior-pm',
            teamId: 'team-pm',
            level: 'Junior Product Manager',
            band: 'Grade 5',
            assignments: [
              {
                compId: 'comp-product-strategy',
                behaviorIds: ['beh-market-seg', 'beh-vision-setting'],
              },
            ],
          },
          {
            id: 'grade-senior-pm',
            teamId: 'team-pm',
            level: 'Senior Product Manager',
            band: 'Grade 7',
            assignments: [
              {
                compId: 'comp-product-strategy',
                behaviorIds: ['beh-market-seg', 'beh-vision-setting', 'beh-competitive'],
              },
            ],
          },
          {
            id: 'grade-lead-pm',
            teamId: 'team-pm',
            level: 'Lead Product Manager',
            band: 'Grade 9',
            assignments: [
              {
                compId: 'comp-product-strategy',
                behaviorIds: ['beh-market-seg', 'beh-vision-setting', 'beh-competitive'],
              },
              {
                compId: 'comp-stakeholder',
                behaviorIds: ['beh-exec-comms'],
              },
            ],
          },
        ],
      },
      {
        id: 'team-design',
        departmentId: 'dept-product-tech',
        name: 'Product Design',
        grades: [
          {
            id: 'grade-junior-designer',
            teamId: 'team-design',
            level: 'Junior Designer',
            band: 'Grade 5',
            assignments: [],
          },
          {
            id: 'grade-senior-designer',
            teamId: 'team-design',
            level: 'Senior Designer',
            band: 'Grade 7',
            assignments: [],
          },
        ],
      },
    ],
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'emp-current',
    name: 'Me',
    initials: 'ME',
    role: 'Junior Product Manager',
    gradeId: 'grade-junior-pm',
    gradeBand: 'Grade 5',
    teamId: 'team-pm',
  },
  {
    id: 'emp-alex',
    name: 'Alex Rivera',
    initials: 'AR',
    role: 'Senior Product Manager',
    gradeId: 'grade-senior-pm',
    gradeBand: 'Grade 7',
    teamId: 'team-pm',
    managerId: 'mgr-1',
  },
  {
    id: 'emp-sam',
    name: 'Sam Chen',
    initials: 'SC',
    role: 'Junior Product Manager',
    gradeId: 'grade-junior-pm',
    gradeBand: 'Grade 5',
    teamId: 'team-pm',
    managerId: 'mgr-1',
  },
  {
    id: 'emp-jordan',
    name: 'Jordan Lee',
    initials: 'JL',
    role: 'Junior Product Manager',
    gradeId: 'grade-junior-pm',
    gradeBand: 'Grade 5',
    teamId: 'team-pm',
    managerId: 'mgr-1',
  },
]

export const mockOkrLinks: OkrLink[] = [
  {
    behaviorId: 'beh-market-seg',
    okrTitle: 'Launch V2 of Strativy Analytics Dashboard',
    achievementPercent: 45,
  },
  {
    behaviorId: 'beh-vision-setting',
    okrTitle: 'Launch V2 of Strativy Analytics Dashboard',
    achievementPercent: 45,
  },
]

export const mockAssessments: EmployeeAssessment[] = [
  {
    employeeId: 'emp-current',
    gradeId: 'grade-junior-pm',
    status: 'not_started',
    behaviors: [
      { behaviorId: 'beh-market-seg', notes: '' },
      { behaviorId: 'beh-vision-setting', notes: '' },
    ],
  },
  {
    employeeId: 'emp-alex',
    gradeId: 'grade-senior-pm',
    status: 'completed',
    submittedAt: '2026-05-15',
    behaviors: [
      { behaviorId: 'beh-market-seg', selfRating: 4, managerRating: 5 },
      { behaviorId: 'beh-vision-setting', selfRating: 4, managerRating: 4 },
      { behaviorId: 'beh-competitive', selfRating: 3, managerRating: 4 },
    ],
  },
  {
    employeeId: 'emp-sam',
    gradeId: 'grade-junior-pm',
    status: 'needs_review',
    submittedAt: '2026-06-01',
    behaviors: [
      { behaviorId: 'beh-market-seg', selfRating: 2 },
      { behaviorId: 'beh-vision-setting', selfRating: 2 },
    ],
  },
  {
    employeeId: 'emp-jordan',
    gradeId: 'grade-junior-pm',
    status: 'self_assessed',
    submittedAt: '2026-06-08',
    behaviors: [
      { behaviorId: 'beh-market-seg', selfRating: 5, notes: 'Led segmentation workshop.' },
      { behaviorId: 'beh-vision-setting', selfRating: 4 },
    ],
  },
]

export const mockOrgHealth: OrgHealthMetrics = {
  frameworkCoverage: 85,
  criticalSkillGaps: 12,
  pendingAppraisals: 34,
  qoqGrowthVelocity: 6.4,
}

export const mockHeatmapRows: HeatmapRow[] = [
  {
    competencyName: 'Technical Literacy',
    cells: [
      { gradeLabel: 'Manager', proficiency: 45, barVariant: 'accent' },
      { gradeLabel: 'Senior', proficiency: 55, barVariant: 'accent' },
      { gradeLabel: 'Junior', proficiency: 30, barVariant: 'warning' },
    ],
    targetGap: -24,
    gapVariant: 'negative',
  },
  {
    competencyName: 'Product Strategy',
    cells: [
      { gradeLabel: 'Manager', proficiency: 45, barVariant: 'accent' },
      { gradeLabel: 'Senior', proficiency: 55, barVariant: 'accent' },
      { gradeLabel: 'Junior', proficiency: 30, barVariant: 'success' },
    ],
    targetGap: -24,
    gapVariant: 'positive',
  },
  {
    competencyName: 'Stakeholder Management',
    cells: [
      { gradeLabel: 'Manager', proficiency: 45, barVariant: 'warning' },
      { gradeLabel: 'Senior', proficiency: 55, barVariant: 'warning' },
      { gradeLabel: 'Junior', proficiency: 30, barVariant: 'danger' },
    ],
    targetGap: -24,
    gapVariant: 'negative',
  },
]
