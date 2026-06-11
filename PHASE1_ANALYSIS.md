# Strativy Platform Revamp — Phase 1 Analysis Breakdown

**Date:** June 11, 2026 (rev. 2 — re-audited against the correct Figma file)
**Scope:** PRD requirements mapping · Figma visual audit · Tokenization plan · Codebase gap analysis · Build plan proposal
**Status:** Analysis only — no application code was written or modified. This report gates Phase 2 (build).

> **Revision note:** Rev. 1 of this report audited the wrong Figma file (`Strativy - CMS`, the internal back-office). This revision audits the correct **`Strativy - Platform`** file (fileKey `cdn1hCL4UHZiV9XjPIkRhC`). §2–§5 are fully rewritten; §1 (PRD map) is unchanged.

---

## ⚠️ Key Findings (read first)

1. **Full PRD screen coverage exists.** Unlike the previously-audited CMS file, the Platform file has dedicated pages for every PRD module: Dashboard, Company Setup, OKR, Competency (Setup + Review sub-pages), and Settings (Invite Members + Performance Configuration + Schedule & Reminders sub-pages), plus a complete Login/auth flow and a **192-component atomic library** (Atoms → Molecules → Organisms → Templates) that mirrors the codebase's atomic-design structure.
2. **The design is light-mode, soft-rounded — "dark-mode brutalist" is NOT confirmed.** Every screen frame is explicitly named "Light Mode - …" with a `#f8fafc`/`#f8fafd` page background and white **floating cards** (inset sidebar/topbar/content cards with rounded 8–16px corners and pronounced soft shadows). No dark frames exist; a "Dark Mode" toggle is *planned* (it's named in the Sidebar Footer component description) but not designed. If dark-first is still the revamp directive, it is a net-new design decision with no Figma reference.
3. **The file encodes a structured token vocabulary.** Although no local Figma variables/styles are published, the dev-handoff output references named tokens throughout: `colors/primitives/{primary|success|neutral}/{step}`, `colors/semantic/{text|border|bg|button}/...`, `spacing/1–6`, `border-radius/lg`, and `Elevation-02/03` effect styles. These map almost 1:1 onto the existing `src/styles/tokens.css`.
4. **The Competency module officially uses the indigo accent palette** (`#4f46e5` etc.) from `COMPETENCY_MANAGEMENT.md` — the Figma confirms it. This reverses rev. 1's recommendation to drop that palette; it must instead be tokenized as a module accent.
5. **Several PRD ↔ design deltas need a ruling** before building OKR and Competency Review (see §5.2).

---

## 1. PRD Requirements Map

Eight PRDs across five top-level modules. Common platform assumptions: RBAC (`Admin` / `HR Manager` / `Manager` / `Employee`), org structure (Company → Department → Team → Role), review cycles, and the global sidebar `Dashboard · Company Setup · OKR · Competencies · Settings (Invite Members / Performance Configuration / Schedule & Reminders) · Collapse`.

### 1.1 Dashboard (Executive Dashboard)

**Personas:** System Admin, Executive/C-Level, Department Head.

| Area | Requirements |
|---|---|
| Navigation | Collapsible sidebar (Dashboard active); header with module title, greeting ("Good morning, Admin"), notification bell, avatar |
| Metric cards | 3 cards: **OKR Progress %**, **Competency Progress %**, **Overall Progress %** — each with ± trend indicator (e.g. +12%) |
| OKR Performance | Line chart over months; toggles Dept / Team / Employee; **"Strativy Brain – OKR Performance"** AI side panel (overall summary + chronological monthly insights) |
| Competency Growth | Line chart over quarters (Q1–Q4) with **target baseline**; same toggles; "Strativy Brain – Competency Growth" panel |
| Leaderboard | Ranked departments, combined score **out of 5.0**, progress bar |
| Quick Access | Shortcut cards (Company Setup, OKR Cascading, Competency Hub) with live status metadata ("0 steps", "4 OKRs active") |

**Business logic:** Overall Progress = blend of OKR and Competency progress — the blend ratio comes from the **Performance Weight Config** (cross-reference §1.6). Leaderboard score is on the rating scale defined in **Performance Config** (§1.5).
**Out of scope V1:** in-dashboard drill-downs (redirect to modules), per-user widget layout.

### 1.2 OKR Menu

**Personas:** Executive, Manager, Employee.

| Area | Requirements |
|---|---|
| View controls | **Period selector** (defaults to active cycle); tabs **Overview / Alignment / Analytics**; free-text search (Objective + KR titles); filters: Owner, Team/Dept, Status |
| Overview tab | Hierarchical table — Objective parent rows expand to Key Result children. Columns: Name, Owner (avatar + name), Status, Progress (0–100%), Due Date, Actions (`...` → Edit/Delete/View) |
| Alignment tab | Cascade tree chart visualization |
| Analytics tab | High-level charts/metrics |
| Export | Download current OKR view (Admin) |

**Business logic (formula):**

```text
Objective_Progress = Σ (KR_Progress × KR_Weight)
```

Status values: On Track / At Risk / Off Track (system-calculated, manual override allowed). Status thresholds align with the platform goal-health rule already in tokens/AGENTS.md: ≥70% on-track, 40–69% at-risk, <40% off-track.
**Out of scope MVP:** inline cell editing (use detail drawer), custom columns.
**Cross-refs:** periods come from **Schedule & Reminders** cycles; owners come from **Invite Member** / org structure; OKR progress feeds **Dashboard** and **Competency Review** context injection.

### 1.3 Competency Setup

**Persona:** System Admin / HR Framework Designer.

| Area | Requirements |
|---|---|
| Org tree (left pane) | Navigable Company → Department → Role hierarchy; selection drives main-area context |
| Competency mapping | "Add Competency" button when a **Role** node is selected → "Map Competencies" modal pulling from the global **Competency Library**; mapped frameworks are role-specific |
| Library | CRUD of core Competency Libraries (e.g. Leadership, Technical) |
| Matrix builder | Grid: Y-axis behavioral categories × X-axis Job Levels (L1, L2, …); CRUD of text behavioral indicators per cell ("Meets Expectations" definition per level); quick link to global Rating Configurations |

**Out of scope MVP:** AI-suggested competencies, HRIS import.
**Cross-refs:** org tree from **Company Setup**; rating scales from **Performance Config**; output consumed by **Competency Review** (expected scores per grade) and the existing `COMPETENCY_MANAGEMENT.md` doc (data model: Behavior, Competency, Section, Assignment, Grade).

### 1.4 Competency Review (RBAC-managed views)

One route, three personas, three default views:

| Role | Default view | Requirements |
|---|---|---|
| **Admin** (macro) | **Organization Health Matrix** — heat matrix of competency scores aggregated/averaged by Department/Team × competency dimension; filters: Review Cycle, Department, Job Level |
| **Manager** (meso) | **Team Roster & Radar** — radar/spider chart overlaying `Expected Score` (baseline per job grade from Performance Configuration) vs `Actual Score`; pending vs completed assessment states per direct report |
| **Employee** (micro) | **Self-Assessment Form** — behavior checklists dynamically generated per the employee's Job Level; **OKR context injection**: live progress % of the employee's active OKRs displayed inline within relevant competency sections (reduces recency bias, guides the Notes field) |

**Business logic (formula):**

```text
Competency_Score = (Σ Selected_Behaviors / Σ Total_Behaviors) × 100
```

**Out of scope MVP:** 360° peer reviews (strictly Employee → Manager), calibration workflows.
**Cross-refs:** checklists from **Competency Setup** matrix; expected baselines from **Performance Config (Role Appraisal tab)**; OKR data from **OKR module**; cycle filter from **Schedule & Reminders**.

### 1.5 Settings — Performance Configuration (Rating & Appraisal)

**Persona:** System Admin / HR Manager.

| Area | Requirements |
|---|---|
| Rating CRUD | Rating Name, Score Range (min/max, 2 decimal places), Status toggle (Active/Inactive), Description |
| Validation (critical) | **No range overlaps** (e.g. 2.50–3.49 blocks a new rating starting at 3.00); warn on **gaps** in the scale (e.g. nothing covers 3.49–4.00) |
| Delete | **Soft-delete only** if rating was used in a past cycle (historical integrity) |
| Role Appraisal tab | Architecture placeholder: per-Job-Level review templates / weighting / scales |

### 1.6 Settings — Performance Weight Configuration

The most detailed PRD (includes full UI spec, schema, API contract).

| Area | Requirements |
|---|---|
| UI | Card titled "Performance Weight Configuration"; horizontal slider; real-time `% OKR` / `% Competency` labels; **OKR weight card** (blue, target icon) + **Competency weight card** (green, ribbon icon); formula summary card `OKR (X%) + Competency (Y%) = 100%`; Save button top-right, disabled until dirty |
| Slider | Range 0–100%, snaps to **10% increments** (5% optional); left = more OKR |
| States | Initial (loaded from API) → Dirty (slider moved; Save enabled; warn on navigate-away) → Saving (spinner, `PUT`) → Success (modal: blue check circle, "Successfully!", Done button; Save re-disabled) |
| Validation | Server: weights sum to exactly 100 (`400 INVALID_WEIGHT_SUM`); roles: only `ADMIN`/`HR_MANAGER` may write, others read-only; **cycle lockout**: weight changes locked while an appraisal cycle is active (`423 ACTIVE_CYCLE_LOCKED`) — recommended behavior is hard-lock |
| API | `GET/PUT /api/v1/settings/performance-weight` → `{ okr_weight, competency_weight, is_locked, updated_at }` |
| Schema | `performance_configuration`: id, company_id, okr_weight (int), competency_weight (int), is_locked (bool), updated_at, updated_by |
| NFRs | <200ms; audit log every change (who, old, new); slider keyboard-navigable with `aria-slider` labels |

**Formula:** `OKR Weight + Competency Weight = 100%`. This ratio drives the **Dashboard Overall Progress** blend and the final appraisal score.
**Out of scope MVP:** per-department weights, >2 appraisal categories.

### 1.7 Settings — Invite Member

| Area | Requirements |
|---|---|
| Input | Single + bulk email entry (comma/space-separated textarea); format validation; duplicate-active-user check; optional domain restriction (`@strativy.com`) |
| Mapping | Role dropdown from RBAC engine (default **Employee**); cascading Department → Team dropdowns from Org Structure |
| Backend | "Send Invite" → transactional email with time-sensitive magic link/token; invitee enters User Directory as `Pending` → `Active` on registration |
| Management | **Pending Invites list** with resend / revoke |

**Out of scope MVP:** SSO/SAML provisioning, per-user email customization.

### 1.8 Settings — Schedule & Reminders

| Area | Requirements |
|---|---|
| CRUD | Cycle Name, Date Range (start/end), **Assessment Scope** (OKRs only / Competencies only / Both), **Reminder Frequency** (Weekly / Bi-Weekly / Monthly) |
| Read view | All schedules grouped by status **Active / Upcoming / Completed**, with countdowns to the next milestone |
| Update guard | Structural changes (e.g. scope) on an **Active** cycle restricted or confirmation-gated |
| Delete | Archive completed/draft schedules |
| Backend | Cron-based email + in-app reminders; company-default or user-local timezone |

**Out of scope MVP:** per-cycle custom templates, per-employee micro-scheduling.
**Cross-refs:** cycles feed the OKR **Period selector**, the Competency Review **cycle filter**, and the Weight Config **lockout flag** (`is_locked` = a cycle is active).

### 1.9 Cross-module dependency graph

```text
Company Setup (org tree, roles, levels)
   ├──> Invite Member (dept/team assignment)
   ├──> Competency Setup (org tree navigation, role mapping)
   └──> OKR (owner/team hierarchy)

Schedule & Reminders (cycles)
   ├──> OKR period selector
   ├──> Competency Review cycle filter
   └──> Performance Weight Config lockout (is_locked)

Performance Config (rating scale, role appraisal baselines)
   ├──> Competency Review (Expected Score on radar)
   └──> Dashboard leaderboard (score out of 5.0)

Performance Weight Config (OKR% / Competency%)
   ├──> Dashboard Overall Progress blend
   └──> Final appraisal score

OKR (progress data)
   ├──> Dashboard OKR chart + metric card
   └──> Competency Review OKR-context injection

Competency Setup (libraries, matrix, indicators)
   └──> Competency Review (dynamic checklists per job level)
```

**RBAC summary:** Admin/HR Manager = full config write (Settings, Setup, Review macro view). Manager = team views (Review radar, OKR team filter). Employee = self views (self-assessment, own OKRs), read-only on weights/ratings.

---

## 2. Figma Visual Audit — `Strativy - Platform`

**File:** fileKey `cdn1hCL4UHZiV9XjPIkRhC` · audited via Figma MCP (`get_metadata` page map → read scripts → `get_design_context` on each module screen → `get_screenshot` of key screens).

### 2.1 Page & screen inventory (with node IDs)

| Page (node) | Key frames | PRD module |
|---|---|---|
| `➥ Login ☢️` (`105:3`) | `116:133` Auth Flow Map · `105:6374` Login · `115:2` Manual Login · `114:122` SSO Provider Selection · Magic Link section (`114:2` Enter Email, `114:40` Check Email, `114:90` Verified) · Forgot Password section (`115:48`, `115:82`, `115:129`, `116:2` Success) · Email templates: Magic Link `158:2`, Account Activated `165:17`, Account Invitation `165:110`, Forgot Password `165:48`, Password Changed `165:79` | Auth (pre-req; ties to Invite Member's magic-link onboarding) |
| `➥ Dashboard` (`105:11`) | `105:12` Dashboard mockup (1725×2386, full scroll) · `722:240/246` Insight Container components | **Dashboard PRD — 1:1 coverage**: greeting header, 3 metric cards w/ trend chips (60% OKR / 40% Competency / 83% Overall), OKR Performance line chart + Dept/Team/Employee toggle, **Strativ Brain** dark-indigo panels (Overall Summary + monthly/quarterly insight rows), Competency Growth Analytics chart with target baseline + insight footnote, Leaderboard (4.8/5.0 etc. + bars), Quick Access cards w/ status metadata |
| `➥ Company Setup` (`105:8`) | Employee Management section: `105:341`, `587:1482`, `587:1707` + Single Add (`454:3604`) + Bulk Add (`454:3603`) · Org Structure section: `214:2`, `579:4361`, `579:4592`, `276:478` Tree Chart View, `278:478`, `294:1212` Add Sub-dept interaction, Bulk Add `454:3629`, AI section `579:4335` | Company Setup (existing P0): 2-step wizard (Org Structure / Employees), list + tree chart views, CSV bulk upload w/ validation, AI assist concept |
| `➥ OKR` (`105:9`) | `105:1752` OKR Cascading **List View** · `105:2004` **Tree Chart** view · `632:8242`/`632:8504`/`632:8766`/`632:9028` interaction states · `588:5576` "detail right" drawer section · `636:2838` Add Modal | **OKR PRD — partial coverage** (see §2.4 deltas): org-cascading rows (Company→Dept→Team) w/ level chips, owner tags, progress bars + %, edit/align/add row actions, List/Tree toggle, search, floating **Strativy Brain** widget ("OKR Setup — auto-generate OKRs by uploading data" + chat input) |
| `❯❯ Setup` (`359:274`) — Competency | `352:824` Competency/Setup · Map modal `474:1945` · small modals `543:3890`, `543:3694` · BulkAdd section `459:1897` | **Competency Setup PRD — strong coverage**: SKILL LIBRARY left panel (sections → competencies → behaviors w/ add/remove), "Org IA & Competency Mapping" workspace, dept chip (PRODUCT & TECH), **Grade Mapping Cards** per role/grade w/ assigned-skill chips + "+ ADD COMPETENCY", Save |
| `❯❯ Review` (`359:275`) — Competency | `744:3383` Employee Self-Assessment · `352:938` Manager Team Review · `352:995` Admin Org Health Matrix (sections also include per-persona variants `352:881`, `744:3550`, `744:3267`) | **Competency Review PRD — all 3 RBAC views designed**: Self-assessment ("My Career Path" header w/ grade + mapped role, behavior rows w/ **1–5 rating scale** (Rarely→Consistently), **LINKED OKR CONTEXT** rows w/ achievement %, Manager Notes textareas, SUBMIT SELF-ASSESSMENT); Manager "Team Review Dashboard" (Employee Assessment Cards: status badge COMPLETED/NEEDS REVIEW/SELF-ASSESSED, grade, mapped-skills coverage bar, Open Assessment, Start Batch Review); Admin "Organization Health Matrix" (4 stat cards: Framework Coverage 85%, Critical Skill Gaps 12, Pending Appraisals 34, QoQ Growth +6.4%; **Competency Heatmap table** — rows per competency × proficiency bars per level + ORG TARGET GAP chips; department filter) |
| `❯❯ Invite Members` (`614:3786`) | `614:3789` Settings/Invite Members · Invite modal `636:4513` (650×345) · Bulk Add section `641:11052` · Card `641:10287` | **Invite Member PRD — partial**: "Employee Management" roster table (Employee ID / Name / Department / employment badge Permanent·Contract·Probation), search, invite modal + bulk add flow. Sidebar shows Settings → "Invite Employee" active |
| `❯❯ Performance Configuration` (`614:3787`) | `614:4124` Settings/Performance Configuration · Card `641:11528` | **Performance *Weight* Config PRD — 1:1 coverage**: slider w/ circular handle, 60%/40% labels, gradient **OKR stat card** (blue, primary-400→600) + **COMPETENCY stat card** (green, success-400→600) w/ 30px Inter Black %, formula card `OKR (60%) + Competency (40%) = 100%`, Save button. ⚠️ The rating-scale CRUD half of the Performance Config PRD (§1.5) is **not designed** |
| `❯❯ Schedule & Reminders` (`614:3788`) | `621:645` main · Add Schedule modal `641:11569` (650×601) · `1255:890` Organism/Custom Day Settings Panel · datepicker frame `699:6018` | **Schedule PRD — strong coverage**: OKR/Competency pill tabs, Dept/Team/Employee filter chips, table (Cycle Name / Assessment Scope / Check-in Frequency / Start / End + row hover w/ kebab), "+ Add Schedule", custom-day panel, datepicker |
| `Components` (`105:5`) | Sections: Atoms / Molecules / Organisms / Templates / Legacy — **192 components** | Component library (see §2.3) |

### 2.2 Extracted token system

> No local Figma variables or paint/text/effect styles are published in this file, **but** the dev-handoff output references a structured token vocabulary on nearly every node — `colors/primitives/*`, `colors/semantic/*`, `spacing/*`, `border-radius/*` — plus named effect styles `Elevation-02/03` and named text styles (`Label/XS`, `Body/SM`, `Heading/2XL`, …). Values below were extracted from full-tree scans of the Dashboard, Performance Configuration, and Self-Assessment frames plus the design-context token annotations.

#### Colors

**Core palette (named tokens observed in dev handoff):**

| Figma token name | Hex | Tailwind equivalent |
|---|---|---|
| `colors/semantic/bg/page` | `#f8fafc` (also `#f8fafd` drift) | slate-50 |
| `colors/semantic/bg/subtle` | `#f1f5f9` | slate-100 |
| `colors/white` (surface) | `#ffffff` | white |
| `colors/semantic/border/default` | `#f1f5f9` (cards) / `#e2e8f0` (sidebar, inputs) | slate-100 / slate-200 |
| `colors/semantic/text/primary` | `#0f172a` (sometimes `#000`) | slate-900 |
| `colors/semantic/text/secondary` | `#475569` / `#334155` | slate-600/700 |
| `colors/semantic/text/tertiary` | `#94a3b8` | slate-400 |
| `colors/primitives/primary/400–600` | `#60a5fa` / `#3b82f6` / `#2563eb` | blue-400/500/600 |
| `colors/semantic/button/primary/default` | `#2563eb` | blue-600 |
| primary tints | `#eff6ff`, `#dbeafe`, `#bfdbfe`, `#edf0ff` (subnav active) | blue-50/100/200 |
| `colors/primitives/success/400–600` | `#4ade80` / `#22c55e` / `#16a34a` (+`#15803d`, `#dcfce7`, `#f0fdf4`) | green family |
| warning | `#f59e0b`, `#d97706`, `#fffbeb`, `#b45309` | amber family |
| danger | `#dc2626`, `#ef4444` | red family |

**Competency module accent (indigo — confirms `COMPETENCY_MANAGEMENT.md` DRD):** `#4f46e5` (primary accent: bars, stat numbers, coverage), `#5b53e7`, `#7d73f0` (avatar text), `#edecfe` (avatar bg), `#edf0ff`. Supporting status hues in Review screens: emerald `#10b981`, badge green `#057d56` on `#def7ec`/`#e0f8ed`, rose `#f43f5e`, gap-chip crimson `#b40a39` on `#ffe7ea`.

**Off-system strays to normalize during build (designer drift, not intentional):** `#0a5adb`, `#2663eb`, `#94a2b8`, `#667587`, `#334156`, `#e0e3ea`, `#eaedf2`, `#edeef2`, `#f0f6fe`, `#f1f2f5`, `#228b43`. Map each to its nearest token (e.g. `#2663eb`→primary-600, `#94a2b8`→slate-400, `#eaedf2`→slate-200).

#### Typography

Families: **Inter** (dominant) + **Plus Jakarta Sans** (chips/filter pills only: `Plus Jakarta Sans/XS/B2` 12px Regular, `XS/SH2` 14px SemiBold).

| Named style | Spec | Usage |
|---|---|---|
| `Label/2XS` | Inter Medium 8 / 12 / +0.72px | micro labels |
| `Label/XS` | Inter Medium 12 / 18 / **+0.72px tracking** | THE workhorse label — nav items, table cells, column headers, sublabels (uppercase) |
| `Body/SM` | Inter Regular 14 / 21 | body text, buttons |
| `Body/Base` | Inter Regular 16 / 24 | body, topbar title |
| `Heading/LG` | Inter Medium→Bold 18 / 19.8 | card titles |
| `Heading/2XL` | Inter Semi Bold 24 / 26.4 | section figures (60%/40%) |
| Display (unnamed) | **Inter Black** 28 / 30 (and Black 16/22/24) | page titles ("Organization Health Matrix"), stat numbers, weight % |
| Brand | Inter **Black Italic** 14 uppercase −0.35px | STRATIVY wordmark |
| micro-bold | Inter Bold 9–13 (+ tracked uppercase 10–11px) | badges, chips, table sublabels |

Hierarchy signature: **heavy weights (Bold/Black) at small sizes + tracked uppercase 10–12px labels** — this is where the "high-contrast" character lives, not in color. Fractional sizes in scans (11.2, 12.32, 9.6) are scaled instances — normalize to the integer scale: 8 / 9 / 10 / 11 / 12 / 13 / 14 / 16 / 18 / 24 / 28 / 30.

#### Spacing & layout (the "floating card" shell)

- 4px base grid; named `spacing/1–6` = 4/8/12/16/20/24px observed in handoff.
- **App shell:** page bg `#f8fafc`; **floating sidebar card** 248×1016 at 12px inset (white, 1px `#e2e8f0` border, radius 8, `drop-shadow 0 8px 16px rgba(0,0,0,0.12)`); **floating topbar card** 64px tall, radius 16, shadow-xs; content cards radius 16 with 24px padding, starting x≈288.
- Sidebar anatomy: header 69px (36px logo w/ blue glow + wordmark) · nav items 40px h, radius 8, 12px pad, 18px icons · SubNav rows 32px with 6px dot + 3px active indicator bar + `#edf0ff` active bg · footer 38px Collapse row.
- Topbar anatomy: PageTitle (16px Regular + 12px tracked Label) left; right cluster = 33px notification bell (`#f1f5f9` bg, radius 10, red dot) + 36px avatar (primary-500, radius 12, blue glow).

#### Radius

| Value | Usage |
|---|---|
| 8px (`border-radius/lg`) | **dominant** — sidebar card, nav items, buttons (7–8px), inputs, table header bg |
| 12px | logo/avatar/icon containers, formula card |
| 16px | topbar, content cards, metric cards, weight stat cards, chips container |
| 20–24px | assessment cards (20), large modals |
| pill (96/100/9999) | chips, filter pills, badges, progress bars, CTA "Start Batch Review" (22px on 44px h) |

#### Strokes & shadows

- Borders: **1px hairlines** everywhere (`#f1f5f9` on cards, `#e2e8f0` on sidebar/inputs); icon strokes ~1.67px. No heavy borders.
- Named elevations: **Elevation-02** `1px 6px 24px 2px #030612 @12%` (cards) · **Elevation-03** `1.5px 9px 36px 3px #030612 @12%` (main containers) · sidebar `0 8px 16px rgba(0,0,0,.12)` · topbar `0 1px 2px rgba(0,0,0,.06)` · **blue glow** `0 4px 6px / 0 10px 15px rgba(59,130,246,.25–.3)` on logo, avatar, active nav, primary buttons.
- Gradients: weight stat cards (`primary/400→600` at ~170°, success `400→600`), Strativ Brain panels (dark indigo/navy), login brand panel. Otherwise flat fills.

### 2.3 Component library (Components page `105:5`, 192 components)

Organized into labeled sections **Atoms / Molecules / Organisms / Templates / Legacy** — directly mirrors the codebase's atomic structure, and many components carry usage descriptions (a11y roles, token annotations):

- **Atoms:** Logo Mark, Notification Bell (HasNotification variants), Step Badge, sidebar/icon set (10 variants: state × type for all 5 nav items), Loading Bar, Datepicker, Competency/Score, Competency/Point.
- **Molecules:** Nav Item (Active/Default), SubNav (active/default), Footer Item, View Toggle (+Tab variants), Setup Step Tab (6 variants), Org Add Row / Org Tree Add Row (per org level), Bulk Upload / Add Department / Add Employee / Bulk Import buttons, Employee Count Badge, Employee Search Filter Row, Instruction Step, Drop Zone, Behavior Row, Target Gap Chip, Department Filter, Heatmap Row, Review Cycle Subtitle, Frequency Dropdown Menu, Schedule Table Header/Row/Row-Hover, Status Badge, **Performance Weight Stat Card**, SSO Provider Row, Auth Instruction Row, tab/filter (Dept/Team/Employee chips).
- **Organisms:** Sidebar (4 active-state variants, documented), Topbar (page variants, documented), Brand Panel, Email Card, **Auth Panel × 10 states**, Org Structure Header, Org List Rows/Cards, **Org Tree Chart**, Org Tree Node (9 level/label variants), Setup Step Nav, Employee Management Header, Employee Step (± data), **Data Table**, CSV Upload Flow, Upload Validation, Grade Mapping Card, Employee Assessment Card, Metric Stat Card, Competency Heatmap Table, Custom Day Settings Panel.

This is effectively a ready-made spec for the React component inventory — most Phase 2 organisms have a named Figma counterpart with variants.

### 2.4 PRD ↔ design deltas (need rulings — see §5.2)

| # | Module | PRD says | Figma shows |
|---|---|---|---|
| D1 | OKR | Tabs Overview/Alignment/Analytics; hierarchical **table** w/ columns Owner/Status/Progress/Due/Actions; period selector; Owner/Team/Status filters; Export | "OKR Cascading" with **List View / Tree Chart** toggle; cascading rows by org level w/ progress + edit/align/add icons; search; detail drawer; Add modal; Strativy Brain widget. No period selector, no status/due-date columns, no Analytics tab, no Export |
| D2 | Competency Review (Employee) | Behavior **checklist**; score = selected/total × 100 | Behavior rows w/ **1–5 rating scale** (Rarely→Consistently) + linked OKR context + manager-notes fields → implies score = avg(rating)/5 or sum/max |
| D3 | Competency Review (Manager) | **Radar chart** expected vs actual | **Assessment cards** w/ status + coverage bars; no radar designed |
| D4 | Performance Config | Rating-scale CRUD (name, range, status, description) + Role Appraisal tab | Only the **Weight Configuration** screen is designed; rating CRUD has no mockup |
| D5 | Invite Member | Email-first invite (bulk emails, role+dept/team mapping, pending list w/ resend/revoke) | "Employee Management" table (ID/Name/Dept/employment badge) + invite modal + bulk add; no pending-invites view; sidebar item named "Invite Employee" |
| D6 | Weight Config | Success modal after save; 10% slider snap; lockout warning | Static screen only — modal/snap/lock states not drawn (PRD §3.3/4 fills the gap) |
| D7 | Schedule | Status grouping Active/Upcoming/Completed + countdowns | Flat table w/ scope+frequency columns + OKR/Competency tabs + Dept/Team/Employee chips; no status grouping/countdown |

### 2.5 Verdict on the "dark-mode, brutalist" directive

**Not supported by this file.** Evidence: every mockup frame is named "Light Mode - …"; page backgrounds are `#f8fafc`; zero dark screens exist; corners are 8–16px + pills (no sharp edges); borders are 1px hairlines; soft multi-layer shadows and gradients are core to the language. What the file *does* express: high-contrast type (Black/Bold weights, tracked uppercase micro-labels), crisp hairline-separated whites, and saturated blue/indigo accents with glows. Dark mode is *anticipated* (the Sidebar Footer component is documented as housing a "Dark Mode" toggle, and frame naming implies a Dark Mode counterpart was planned) but **not designed**. Building dark-first would require inventing a dark palette without reference — see decision §5.2-1.

---

## 3. Component Tokenization Plan

### 3.1 Current state (codebase) — unchanged facts

- `src/styles/tokens.css`: full 50–950 scales for primary/neutral/success/warning/danger + semantic aliases (`--color-background/surface/border/text-*`) + goal-health + spacing/radius/shadow/z-index scales, plus a `[data-theme="dark"]` block.
- Tailwind **v4** CSS-first entry but a **legacy v3 `tailwind.config.ts`** with no `@theme`/`@config` — theme utilities may not generate reliably.
- Dark-mode wiring broken (`dark` class toggled vs `data-theme` tokens); broken ref `--color-bg-surface` in SearchBar/Sidebar/Topbar; three styling dialects (CSS vars / raw hex / Tailwind classes).

### 3.2 Reconciliation: Platform-Figma ↔ tokens.css

**Strong alignment.** The Figma's own token vocabulary (`colors/primitives/primary/600` = `#2563eb`, `colors/semantic/text/tertiary` = `#94a3b8`, `spacing/2` = 8px, `border-radius/lg` = 8px…) maps almost verbatim onto the existing scales — same Tailwind blue/slate/green/amber/red families, same 4px spacing grid, same Inter stack. The plan is **alias + extend**, not replace:

| Figma token (observed) | CSS variable | Action |
|---|---|---|
| `colors/semantic/bg/page` `#f8fafc` | `--color-background` | exists (light value) ✓ |
| surface white | `--color-surface` | exists ✓ |
| `colors/semantic/bg/subtle` `#f1f5f9` | **new** `--color-surface-subtle` | **add** (table headers, bell bg, chip containers) |
| `colors/semantic/border/default` `#f1f5f9` | `--color-border` is `#e2e8f0` | **add** `--color-border-subtle: #f1f5f9` (cards) and keep `--color-border: #e2e8f0` (sidebar/inputs) |
| `text/primary·secondary·tertiary` | `--color-text-primary/secondary/tertiary` | exists ✓ (note Figma's tertiary `#94a3b8` = current `--color-text-disabled`; remap tertiary→`#94a3b8`, secondary→`#475569`) |
| `primitives/primary/*`, `success/*`, warning, danger | `--color-primary-*` etc. | exists ✓ |
| Subnav active bg `#edf0ff` | `--color-primary-50` (`#eff6ff`) | normalize to primary-50 |
| **Competency accent** `#4f46e5` family | **new** `--color-accent-{50..600}` (indigo: `#edecfe`/`#edf0ff` bg, `#7d73f0`, `#5b53e7`, `#4f46e5`) | **add** — module accent confirmed by Figma + COMPETENCY_MANAGEMENT.md |
| Review status hues (`#057d56`/`#def7ec`, `#b40a39`/`#ffe7ea`, `#10b981`, `#f43f5e`) | map to success/danger scales or add `--color-emerald/--color-rose` aliases | decide at Review build; prefer nearest-token mapping |
| Goal health | `--color-goal-*` | exists ✓ (matches OKR bars: green ≥70, amber, red) |
| `spacing/1–6` 4–24px | `--space-1..6` | exists ✓ |
| `border-radius/lg` 8px | `--radius-lg: 8px` | exists ✓ — **rev. 1's `--radius-card: 10px` recommendation is dropped**; this file uses 8/12/16 which map to existing `--radius-lg/xl/2xl` |
| Pills | `--radius-full` | exists ✓ |
| `Elevation-02` (1,6,24,2 @ `#030612` 12%) | **new** `--shadow-elevation-2` | **add** |
| `Elevation-03` (1.5,9,36,3) | **new** `--shadow-elevation-3` | **add** |
| Blue glow (logo/avatar/active-nav/buttons) | **new** `--shadow-glow-primary: 0 4px 6px rgb(59 130 246/.3), 0 10px 15px rgb(59 130 246/.3)` | **add** |
| Sidebar/topbar dims | **new** `--layout-sidebar-width: 248px`, `--layout-topbar-height: 64px`, `--layout-shell-inset: 12px` | **add** |
| Weight-card gradients | **new** `--gradient-primary` (`170deg, primary-400→600`), `--gradient-success` | **add** |
| Type ramp incl. Black weights + 8–11px labels | `--font-size-*` (12–36 exists) | **extend** with `--font-size-3xs: 8px` (sparingly), `10px/11px` label sizes, and ensure Inter weights 800/900 load via `next/font` |
| Plus Jakarta Sans (chips only) | — | **recommend dropping** — normalize chips to Inter to avoid a second font for one molecule (flag to design) |

### 3.3 Required changes (Phase 2 Sprint 0)

1. **Tailwind v4 alignment (highest priority, unchanged):** add `@theme inline` in `globals.css` referencing the tokens.css variables (or `@config "./tailwind.config.ts"` as stopgap) so semantic utilities (`bg-surface`, `text-text-tertiary`, `border-border-subtle`, `shadow-elevation-2`) generate reliably.
2. **Stay light-first** (matches the file). Keep the `[data-theme="dark"]` block and semantic-alias discipline so the planned Dark Mode toggle (already in the Figma sidebar footer spec) can ship later without rework; fix the `dark`-class vs `data-theme` toggle mismatch in `sidebar-context.tsx` now.
3. **Add the new tokens** from §3.2 (surface-subtle, border-subtle, accent/indigo scale, elevation + glow shadows, gradients, layout dims, label font sizes); define or remove the broken `--color-bg-surface` references.
4. **Adopt Figma's semantic naming** as the canonical layer (`bg/page`, `bg/subtle`, `border/default`, `text/primary|secondary|tertiary`, `button/primary/default`) — it converges with what tokens.css already does, so this is mostly a naming audit.
5. **Normalize drift during build:** off-system hexes (§2.2) map to nearest token; fractional font sizes round to scale; `#2663eb`/`#0a5adb` → primary-600.
6. **CVA variants bound to semantic utilities** for Badge/Button/chip variant maps (CVA installed, unused); kill hardcoded hex in dashboard/competency/login pages as their modules are rebuilt.
7. **Goal-health tokens unchanged** (on-track/at-risk/off-track ≥70/40–69/<40) — consistent with AGENTS.md, OKR PRD, and the Figma progress bars.

---

## 4. Codebase Gap Analysis (updated for real Figma coverage)

**Stack facts unchanged:** Next.js 16.2.1 · React 19.2.4 · Tailwind v4 · RHF+Zod used in modals · CVA/Zustand/React Query installed-unused · no chart lib · no API routes · localStorage auth stub · 27 components in atomic folders.

### 4.1 Reusable as-is or with token-level rework

| Asset | Notes (now with a Figma counterpart) |
|---|---|
| Atomic structure + barrels | Keep — now **mirrors the Figma library's Atoms/Molecules/Organisms/Templates sections 1:1**; adopt Figma component names where sensible (Nav Item, SubNav, Status Badge, Metric Stat Card…) |
| `Avatar`, `Icon`, `Divider`, `Label`, `Typography`, `FormField`, `ProgressBar` | Reusable; ProgressBar's goal-health logic matches OKR bars; restyle to 6px-high pill bars per Figma |
| `StepIndicator` | Maps to Figma `Molecule/Setup Step Tab` + `Organism/Setup Step Nav` — restyle |
| `SearchBar`, `MenuItem` | Reusable; fix `--color-bg-surface`; MenuItem → Figma Nav Item spec (40px, radius 8, blue glow active) |
| `AddEmployeeModal`/`AddDepartmentModal` (RHF+Zod) | Pattern matches Figma's Add/Form + Add/Bulk modal sections — template for Invite, Schedule, Rating modals |
| `Sidebar`/`Topbar` | **Significant restyle, same skeleton**: becomes floating-card shell (248px inset card, SubNav sub-items with dot + active indicator for Competencies & Settings, Collapse footer); Topbar becomes floating rounded-16 card w/ PageTitle + bell + avatar. Figma provides exact specs incl. a11y notes |
| `ViewToggle` | Direct counterpart `Molecule/View Toggle` (List/Tree) used by both Company Setup and OKR |
| `OKRTreeView`/`TreeCard` | Now has a real reference (`105:2004` Tree Chart + Org Tree Chart organism) — rework connectors/cards to Figma spec instead of the invented `rounded-[32px]` style |
| `cn()`, `src/types/` domain types | Keep; extend (add `weight`, `dueDate`, `periodId` to OKR types; add competency/settings/schedule types) |

### 4.2 Rebuild / heavy rework

| Asset | Why |
|---|---|
| `Badge` | → Figma `Molecule/Status Badge` + chip variants (pill, 10px Bold tracked uppercase, tinted bg); CVA + semantic tokens |
| `ui/Button`, `ui/Input` | Rebuild per Figma: primary button radius 7–8px h-35 w/ optional glow; pill CTA variant (radius 22, h-44); inputs radius 8 border `#e2e8f0` |
| Dashboard page | Rebuild against `105:12` — now a 1:1 blueprint (metric cards, charts + toggles, Strativ Brain panels, leaderboard, quick access) |
| Competency page | Rebuild as Setup + Review routes per `352:824` and the three Review screens; adopt indigo accent tokens |
| `OKRListItem`/`OKRListView` | Rework into the Figma cascading row organism (level chip + owner tag + progress + row actions) — **pending D1 ruling** on table-vs-cascade |
| Login/change-password | Restyle to the Auth Panel organism set (10 states + email templates exist) |

### 4.3 Net-new (now with Figma references for almost everything)

| Gap | Figma reference |
|---|---|
| Chart library (line charts, Dashboard; competency growth) | charts drawn in `105:12` — **Recharts** still recommended; radar (D3) only if PRD ruling demands it |
| DataTable organism | `Organism/Data Table` (1062:3840) + Schedule table molecules |
| Select/Dropdown, Tabs/chips, Slider, Toggle, Datepicker, Tooltip, Toast, ConfirmDialog, SuccessModal | Datepicker `712:3187`, tab/filter `699:5661`, slider in `614:4124`, modals in each module's sections (Weight success modal: PRD spec, no mockup — D6) |
| Settings routes (`(app)/settings/*`) | All three sub-pages designed; sidebar SubNav pattern defined |
| OKR detail drawer, Add modal | `588:5576` "detail right" section, `636:2838` Add Modal |
| Skill Library panel + Grade Mapping cards + Map modal | `352:824`, `474:1945` |
| Heatmap table, Assessment cards, Self-assessment form w/ OKR context | Review screens + named organisms |
| Strativy Brain panel + floating chat widget | Dashboard panels + OKR widget (`722:240/246` Insight Containers) |
| Schedule table + Add Schedule modal + Custom Day panel | `621:645`, `641:11569`, `1255:890` |
| Bulk add (CSV) flow | `Organism/CSV Upload Flow` + Upload Validation variants (shared by Company Setup, Competency, Invite) |
| `src/types/{competency,settings,schedule}.ts`, Zustand stores, mock-data layer, RBAC role switcher | no design needed |

### 4.4 Per-module coverage scorecard (Figma × PRD × code)

| Module | Figma coverage | Existing code reuse | Net-new build |
|---|---|---|---|
| Dashboard | ★★★ 1:1 | shell only | charts, Brain panels, metric cards, leaderboard |
| OKR | ★★☆ (cascade views, drawer, add modal; missing period/status/analytics — D1) | types, ViewToggle, tree concept | cascade rows/table, drawer, filters, Brain widget |
| Competency Setup | ★★★ | org-tree fragments, modal pattern | library panel, mapping modal, grade cards |
| Competency Review | ★★★ (3 RBAC views; radar absent — D2/D3) | Avatar/Badge/ProgressBar | matrix, cards, self-assessment form |
| Invite Member | ★★☆ (D5 naming/scope delta) | modal pattern, table | bulk email input, pending invites (PRD-only) |
| Performance Weight Config | ★★★ 1:1 | — | slider, gradient stat cards, formula card, success modal (PRD) |
| Performance Config (ratings) | ☆☆☆ **not designed** (D4) | modal pattern | rating CRUD UI from PRD + design language |
| Schedule & Reminders | ★★★ | modal pattern | table molecules, tabs/chips, datepicker, custom-day panel |
| Login/Auth | ★★★ (10 states + 5 emails) | login page skeleton | Auth Panel organism set |

---

## 5. Proposed Build Plan (Phase 2)

### 5.0 Foundations first (Sprint 0 — blocking everything)

1. **Token & Tailwind v4 fix:** `@theme` wiring; add §3.2 tokens (surface-subtle, border-subtle, indigo accent scale, Elevation-02/03 + glow shadows, gradients, layout dims, label sizes); fix `data-theme` toggle; load Inter 800/900 weights.
2. **Floating-card app shell:** rebuild Sidebar (248px floating card, SubNav with dot/indicator for Competencies + Settings, Collapse footer) and Topbar (floating card, PageTitle + bell + avatar) to the documented Figma organism specs.
3. **Primitive kit (CVA):** Button (primary/glow/pill/secondary), Input, Select, Status Badge, chips/tab-filter, Switch, Slider, Datepicker, Tooltip, Toast, Modal/ConfirmDialog/SuccessModal, DataTable, ProgressBar restyle, EmptyState — all 1:1 with the Figma component library.
4. **Infrastructure:** install **Recharts**; `src/lib/mock/` seeded per module; Zustand `useUIStore` (sidebar, theme, toasts, modals) + `useAuthStore` (mock user + **RBAC role switcher**); `src/types/{competency,settings,schedule}.ts`; Zod schemas in `src/lib/schemas/`.

**State management approach (all modules):** Zustand for global UI + mock session only; server-shaped data through a mock data layer with React-Query-compatible signatures (swap to real APIs later = transport change); RHF+Zod for forms; local state for ephemeral UI (slider drag, expanded rows).

### 5.1 Module order (dependency-driven; Figma-ready first)

| # | Module | Rationale |
|---|---|---|
| 1 | **Settings: Performance Weight Config** | Fully spec'd by PRD **and** 1:1 Figma (`614:4124`). Slider + gradient stat cards + formula card + dirty/save/success + lockout. Shakes down the primitive kit; outputs the blend ratio for Dashboard. |
| 2 | **Settings: Schedule & Reminders** | Strong Figma coverage (table, tabs, modal, datepicker, custom-day panel). Unblocks cycles for OKR periods, Review filters, and Weight lockout. (D7 status-grouping ruling needed.) |
| 3 | **Settings: Invite Member** | Figma table + invite modal + bulk flow; add PRD-only pending-invites list. Exercises DataTable + CSV flow shared with Company Setup. (D5 ruling.) |
| 4 | **Settings: Performance Config (ratings)** | No mockup (D4) — build from PRD using the now-established design language; overlap/gap validation as pure unit-testable functions; Role Appraisal tab stub. |
| 5 | **OKR revamp** | Cascade list/tree views, detail drawer, Add modal, search per Figma; reconcile with PRD table columns/period selector/Analytics per D1 ruling; weighted-progress calc + status thresholds; Strativy Brain widget (mock). |
| 6 | **Competency Setup** | Skill Library panel, Grade Mapping cards, Map Competencies modal, bulk add; indigo accent tokens land here. |
| 7 | **Competency Review** | Three RBAC views (heat matrix, team cards, self-assessment w/ OKR injection from module 5); scoring formula per D2 ruling; radar only if D3 ruled in. |
| 8 | **Dashboard** | Aggregates everything: metric cards (Overall = weight blend), 2 line charts w/ toggles + target baseline, Strativ Brain panels, leaderboard, quick access w/ live metadata. |

Cross-cutting: Login/auth restyle to the Auth Panel organisms rides alongside Sprint 0/1; `/competency/team`·`/competency/setup` 404s fixed when modules 6–7 land; hex purge per module.

### 5.2 Open decisions for confirmation before Phase 2 (revised)

1. **Light-first vs dark-first (REVISED).** The correct file is unambiguously **light-mode** ("Light Mode" frames, `#f8fafc` bg, no dark screens; dark toggle planned but undesigned). Recommendation: **build light-first to match Figma**, keep the semantic-alias + `[data-theme="dark"]` architecture so dark ships later as a token pass. If the "dark-mode brutalist" directive stands, design must first produce dark references — confirm which.
2. ~~Brutalist styling~~ (dropped — moot). The system to adopt is the **floating-card light UI**: hairline borders, Elevation-02/03 shadows, blue glows, Black/Bold tracked typography, 8/12/16 radii.
3. **OKR scope ruling (D1).** Build Figma's cascade view as the Overview, then layer PRD requirements (period selector, status/due columns or drawer fields, Analytics tab, Export) — or treat PRD as canonical and redesign? Recommendation: Figma view first + period selector & status from PRD; defer Analytics/Export to a later pass.
4. **Competency scoring model (D2).** PRD checkbox formula vs Figma 1–5 scale. Recommendation: follow Figma (1–5 per behavior, normalized to %), update the formula doc.
5. **Manager radar (D3).** Figma has assessment cards, no radar. Recommendation: ship cards (Figma); add radar later only if PRD insists — affects chart-lib scope.
6. **Performance Config ratings UI (D4).** No mockup exists — confirm building it PRD-first in the established design language, or wait for design.
7. **Chart library.** Recharts recommended (line charts confirmed in Dashboard design); radar need depends on #5.
8. **Plus Jakarta Sans.** Used only in chip molecules — recommend normalizing to Inter (one font family); confirm with design.
9. **Competency indigo accent (REVERSED from rev. 1).** Figma confirms the `COMPETENCY_MANAGEMENT.md` indigo `#4f46e5` palette for the Competency module — adopt as `--color-accent-*` tokens. Confirm.

---

*End of Phase 1 analysis (rev. 2). No application code was modified. Sources: 8 PRD files under `requirement docs/PERFORMANCE PLATFORM/`; Figma file `Strativy - Platform` (`cdn1hCL4UHZiV9XjPIkRhC`) audited via MCP — page map, read scripts (variables/styles/color/radius/shadow scans), design context on Dashboard `105:12`, OKR `105:1752`, Competency Setup `352:824`, Self-Assessment `744:3383`, Manager Review `352:938`, Org Health Matrix `352:995`, Invite Members `614:3789`, Performance Config `614:4124`, Schedule `621:645`, and screenshots of all of the above plus OKR Tree `105:2004`; full codebase survey of `strativy-platform`.*
