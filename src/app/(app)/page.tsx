'use client'

const imgZap = 'https://www.figma.com/api/mcp/asset/1ee3e8b4-8967-4462-b129-9ca0f6ba85e6'
const imgClock = 'https://www.figma.com/api/mcp/asset/96b67cba-7865-4443-840a-8494fbcefd51'
const imgCircleDot = 'https://www.figma.com/api/mcp/asset/4242d9a8-6e96-43b2-b752-ce451b22b9bb'
const imgCircleDotEmpty = 'https://www.figma.com/api/mcp/asset/31d02d96-c9fa-4182-8d3d-343620ce3722'
const imgArrowUpRight = 'https://www.figma.com/api/mcp/asset/c1dddfb2-8cca-4146-ae4d-4fbeeb672fe1'

// Stat card icons
const imgTarget = 'https://www.figma.com/api/mcp/asset/5c22459b-03cf-42bb-add7-ba1c537fa3ca'
const imgBuilding2 = 'https://www.figma.com/api/mcp/asset/8d54a332-491f-46e7-9719-073046af4cef'
const imgTarget1 = 'https://www.figma.com/api/mcp/asset/81fe37ff-743f-48a3-a2f5-a777ac4f831c'
const imgAward = 'https://www.figma.com/api/mcp/asset/0e67b258-e7c5-46ca-9bb1-bcd2fc5ac927'
const imgAward1 = 'https://www.figma.com/api/mcp/asset/95f9f1f4-3514-4ba1-98af-9c350e48435a'

const STATS = [
  {
    label: 'OKR Progress',
    value: '68%',
    change: '+12%',
    changeColor: 'text-[#16a34a]',
    changeBg: 'bg-[#f0fdf4]',
    iconBg: 'bg-[#eff6ff]',
    barColor: 'bg-[#3b82f6]',
    barWidth: '68%',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: 'Goals On Track',
    value: '24',
    change: '+3 this week',
    changeColor: 'text-[#16a34a]',
    changeBg: 'bg-[#f0fdf4]',
    iconBg: 'bg-[#f0fdf4]',
    barColor: 'bg-[#22c55e]',
    barWidth: '75%',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: 'Active Employees',
    value: '142',
    change: '+8',
    changeColor: 'text-[#16a34a]',
    changeBg: 'bg-[#f0fdf4]',
    iconBg: 'bg-[#fffbeb]',
    barColor: 'bg-[#f59e0b]',
    barWidth: '85%',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Avg Performance',
    value: '7.8',
    change: '+0.4',
    changeColor: 'text-[#16a34a]',
    changeBg: 'bg-[#f0fdf4]',
    iconBg: 'bg-[#fef2f2]',
    barColor: 'bg-[#ef4444]',
    barWidth: '78%',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
]

const ACTIVITIES = [
  {
    id: 1,
    text: 'Q1 Company OKR updated to 68%',
    time: '2 min ago',
    iconBg: 'bg-[#eff6ff]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 2,
    text: '3 new employees added to Engineering',
    time: '1 hr ago',
    iconBg: 'bg-[#f0fdf4]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 3,
    text: 'Competency review cycle started',
    time: '3 hr ago',
    iconBg: 'bg-[#fffbeb]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 4,
    text: 'OKR alignment score improved to 82%',
    time: 'Yesterday',
    iconBg: 'bg-[#eff6ff]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    id: 5,
    text: 'UX Team missed weekly check-in',
    time: 'Yesterday',
    iconBg: 'bg-[#fef2f2]',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

const MILESTONES = [
  { id: 1, text: 'Q1 OKR Review', date: 'Mar 31', dotColor: 'bg-[#3b82f6]', done: true },
  { id: 2, text: 'Performance Cycle', date: 'Apr 15', dotColor: 'bg-[#22c55e]', done: true },
  { id: 3, text: 'Company All-Hands', date: 'Apr 22', dotColor: 'bg-[#f59e0b]', done: true },
  { id: 4, text: 'Mid-Year Review', date: 'Jun 30', dotColor: 'bg-[#93c5fd]', done: false },
]

const QUICK_ACCESS = [
  {
    title: 'Company Setup',
    desc: 'Configure org structure, levels & weights',
    badge: '6 steps',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    ),
  },
  {
    title: 'OKR Cascading',
    desc: 'Align objectives from company to individual',
    badge: '4 OKRs active',
    gradient: 'linear-gradient(135deg, #22c55e 0%, rgba(34,197,94,0) 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Competency Hub',
    desc: 'Manage frameworks and assessments',
    badge: '3 competencies',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, rgba(245,158,11,0) 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between h-[54px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[#0f172a] font-black text-[24px] leading-[32px] tracking-[-0.6px]">
            Good morning, Admin 👋
          </h1>
          <p className="text-[#64748b] text-[14px] font-normal leading-[20px]">
            Here&apos;s what&apos;s happening across your organization.
          </p>
        </div>
        <button
          className="flex items-center gap-[8px] bg-[#2563eb] text-white text-[14px] font-semibold h-[40px] px-[16px] rounded-[12px] shadow-[0px_10px_15px_0px_rgba(59,130,246,0.25),0px_4px_6px_0px_rgba(59,130,246,0.25)] transition-colors hover:bg-blue-700"
        >
          <img src={imgZap} alt="" className="w-[15px] h-[15px]" />
          New Check-in
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] relative overflow-hidden"
            style={{ height: '158px' }}
          >
            {/* Top row: icon + change badge */}
            <div className="absolute left-[20px] top-[20px] right-[20px] flex items-start justify-between">
              <div className={`${stat.iconBg} rounded-[12px] w-[38px] h-[38px] flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <span className={`${stat.changeBg} ${stat.changeColor} text-[10px] font-bold px-[8px] py-[4px] rounded-[8px] leading-[15px]`}>
                {stat.change}
              </span>
            </div>
            {/* Value */}
            <div className="absolute left-[20px] top-[74px]">
              <p className="text-[#0f172a] font-black text-[24px] leading-[24px]">{stat.value}</p>
            </div>
            {/* Label */}
            <div className="absolute left-[20px] top-[102px]">
              <p className="text-[#64748b] font-semibold text-[12px] leading-[16px]">{stat.label}</p>
            </div>
            {/* Progress bar */}
            <div className="absolute left-[20px] right-[20px] top-[130px] h-[6px] bg-[#f1f5f9] rounded-full overflow-hidden">
              <div className={`${stat.barColor} h-full rounded-full`} style={{ width: stat.barWidth }} />
            </div>
          </div>
        ))}
      </div>

      {/* Activity & Milestones */}
      <div className="flex gap-4" style={{ height: '406.75px' }}>
        {/* Recent Activity */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] flex flex-col gap-4 p-[21px] flex-[2]">
          <div className="flex items-center justify-between h-[24px]">
            <p className="text-[#0f172a] font-bold text-[16px] leading-[24px]">Recent Activity</p>
            <button className="flex items-center gap-[2px] text-[#2563eb] text-[12px] font-semibold leading-[16px]">
              View all
              <img src={imgArrowUpRight} alt="" className="w-[12px] h-[12px] ml-1" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pt-[12px] px-[12px] rounded-[12px] hover:bg-slate-50 transition-colors cursor-pointer" style={{ height: '61.75px' }}>
                <div className={`${activity.iconBg} rounded-[12px] w-[30px] h-[30px] flex items-center justify-center shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[#0f172a] font-medium text-[14px] leading-[19.25px]">{activity.text}</p>
                  <div className="flex items-center gap-[4px]">
                    <img src={imgClock} alt="" className="w-[10px] h-[10px]" />
                    <p className="text-[#64748b] font-normal text-[11px] leading-[16.5px]">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] flex flex-col gap-4 p-[21px] w-[416px] shrink-0">
          <div className="flex items-center justify-between h-[24px]">
            <p className="text-[#0f172a] font-bold text-[16px] leading-[24px]">Milestones</p>
            <span className="bg-[#eff6ff] text-[#2563eb] text-[10px] font-bold px-[8px] py-[2px] rounded-full leading-[15px]">
              4 upcoming
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {MILESTONES.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-[12px] rounded-[12px] cursor-pointer hover:bg-slate-50 transition-colors" style={{ height: '60.5px' }}>
                <div className={`${m.dotColor} rounded-full w-[8px] h-[8px] shrink-0`} />
                <div className="flex-1 flex flex-col">
                  <p className="text-[#0f172a] font-semibold text-[14px] leading-[20px]">{m.text}</p>
                  <p className="text-[#64748b] font-normal text-[11px] leading-[16.5px]">{m.date}</p>
                </div>
                <img src={m.done ? imgCircleDot : imgCircleDotEmpty} alt="" className="w-[14px] h-[14px] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="flex flex-col gap-3">
        <p className="text-[#0f172a] font-bold text-[16px] leading-[24px]">Quick Access</p>
        <div className="grid grid-cols-3 gap-4">
          {QUICK_ACCESS.map((item) => (
            <button
              key={item.title}
              className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-left hover:shadow-md transition-all relative"
              style={{ height: '187.5px' }}
            >
              {/* Icon */}
              <div
                className="absolute left-[20px] top-[20px] w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]"
                style={{ background: item.gradient }}
              >
                {item.icon}
              </div>
              {/* Arrow */}
              <img src={imgArrowUpRight} alt="" className="absolute right-[20px] top-[22px] w-[16px] h-[16px]" />
              {/* Title */}
              <p className="absolute left-[20px] top-[80px] text-[#0f172a] font-bold text-[16px] leading-[24px]">
                {item.title}
              </p>
              {/* Description */}
              <p className="absolute left-[20px] top-[110px] text-[#64748b] font-normal text-[12px] leading-[19.5px]">
                {item.desc}
              </p>
              {/* Badge */}
              <div className="absolute left-[20px] top-[144.5px] bg-[#f1f5f9] text-[#64748b] text-[11px] font-bold px-[10px] py-[4px] rounded-full">
                {item.badge}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
