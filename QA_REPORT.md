# QA Report — Phase 2A (Sprint 0 Foundations + Settings Modules)

**Date:** 2026-06-11
**Scope:** Token system rewire, primitive kit, app shell, mock-data/store layer, and the four Settings modules.
**Figma reference:** `Strativy - Platform` (`cdn1hCL4UHZiV9XjPIkRhC`)
**Verification environment:** Next.js 16.2.1 (Turbopack) dev server, Chromium 1440×960 via Playwright.

## Verification Summary

| Gate | Result |
|------|--------|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors (5 pre-existing warnings in legacy files: `Avatar` `<img>`, unused imports in `OKRListItem`/`ProgressCard`/`TreeCard`, RHF `watch` compiler notice in `AddDepartmentModal`) |
| Dev server | ✅ `Ready in 432ms`; all settings routes return 200 |
| Browser console / page errors | ✅ None across all screens and flows |
| Automated functional smoke (Playwright) | ✅ 6/6 PASS (see per-module logs) |

---

## 1. Sprint 0 Foundations

### Checklist
- [x] `src/styles/tokens.css`: semantic aliases (`--color-bg-page`, `--color-surface-subtle`, `--color-border-subtle`, `--color-text-muted`, `--color-nav-active-tint`), indigo accent scale `--color-accent-50…900`, Elevation-01/02/03 shadows, blue glow + primary button shadow, gradient stat-card tokens, layout dims (sidebar 248/72, topbar 64, gutters), extra font sizes/letter-spacing. Dark-mode overrides extended under `[data-theme="dark"]`.
- [x] Tailwind v4 wiring fixed: `@config "../../tailwind.config.ts"` added to `globals.css`; accent palette + semantic colors + elevation shadows added to `tailwind.config.ts`.
- [x] Dark-mode toggle rewired from class toggling to `data-theme` attribute (`sidebar-context.tsx`) to match the token architecture.
- [x] Recharts installed (foundations only; no charts in this stage).
- [x] Mock-data layer `src/lib/mock/` (departments, members, pending invites, schedules, rating scales, weight config) + `delay()` latency simulator — replaces inline page mocks.
- [x] Zustand stores `src/lib/stores/` — `settings-store` (all module state + async actions) and `toast-store` (global toast queue).
- [x] Types: `src/types/settings.ts` (weight config, schedules, members, invites, rating scales + label maps) and `src/types/competency.ts` (1–5 behavior scale, `normalizeBehaviorScore` → % — anticipates the later Competency stage per confirmed decision #3).
- [x] Icons sourced from the Figma payload as `src/components/icons/Icon*.tsx` (22 components — target, ribbon, gear, bell, kebab, chevrons, search, trash, close, info, check, check-circle, calendar, mail, upload, edit, archive, alert-triangle, refresh, plus). No icon library installed.
- [x] Primitive kit (atomic structure, CVA + `cn()`):
  - Atoms: `Input`, `Switch`, `Slider`, `Spinner` (reuses existing `Badge`, `Avatar`, `Typography`, `FormField`).
  - Molecules: `Select` (combobox w/ full keyboard nav), `ChipTabs` (lg + filter variants), `Modal`, `SuccessModal`, `ConfirmModal`, `DatePickerField`, `KebabMenu`.
  - Organisms: `DataTable` (figma + plain variants), `Toaster`.
- [x] App shell: `Sidebar` + `Topbar` rebuilt to the Figma floating-card light UI (white cards on `#f8fafc` page, 12px gutters, settings subnav with active-dot indicator, dark-mode/collapse footer controls). `Toaster` mounted in the app layout.

### Issues found & fixed during QA
- `src/components/index.ts` barrel exported both the legacy `ui/Input` and the new atoms `Input` → TS2308 ambiguity. Fixed by re-exporting the legacy one as `LegacyInput` (atoms `Input` is canonical).
- `FormField.tsx` had 3 pre-existing `no-explicit-any` lint errors → typed `children` as `React.ReactElement<{ className?: string }>` and removed the casts.
- `Select` combobox missing `aria-controls` (jsx-a11y) → added `useId()`-linked listbox id.
- Zod v4 `z.coerce.number()` incompatibility with the RHF resolver → switched to `z.number()` + `valueAsNumber` registration.

### Edge cases checked
- [x] Sidebar collapse: content padding recalculates via layout tokens; labels hide at 72px width.
- [x] Dark-mode toggle flips `data-theme` (full dark token pass deferred by design — light-first decision #1).
- [x] Toasts stack, auto-dismiss, and are dismissible; `aria-live="polite"` region.

---

## 2. Performance Weight Config (Figma `614:4124`)

MCP flow: `get_design_context` + `get_screenshot` on `614:4124` ✅

### Layout fidelity vs Figma
- [x] Card header: title + helper copy, right-aligned Save button (disabled until dirty).
- [x] Slider with pill track; OKR % (blue, left) / Competency % (slate, right) readouts.
- [x] Gradient stat cards — blue OKR + green Competency with icon chips, matching `--gradient-stat-*` tokens (verified in screenshot `f1` / `01-weight-config.png`).
- [x] Formula card: `OKR (X%) + Competency (Y%) = 100%`.
- [x] Active-cycle info banner (blue, info icon) per PRD; lockout banner (amber) when cycle lock is active.

### Functional checks (automated)
- PASS — slider keyboard step (ArrowRight 60→65, 5-point steps)
- PASS — Save → success modal ("Weights updated")

### Edge cases
- [x] Sum-to-100% is structurally guaranteed (single slider drives both values; competency = 100 − OKR).
- [x] Save disabled when not dirty, while saving, and when locked (PRD cycle lockout).
- [x] `aria-valuetext` announces "OKR X%, Competency Y%".
- [x] Min/max bounds clamped by the range input (0–100, step 5).

---

## 3. Schedule & Reminders (Figma `621:645`)

MCP flow: `get_design_context` + `get_screenshot` on `621:645` ✅

### Layout fidelity vs Figma
- [x] Scope chip tabs (OKR / Competency) above the card; level filter chips (Dept / Team / Employee) in the card header.
- [x] Table columns: Cycle Name (+status badge), Assessment Scope, Check-in Frequency, Start Date, End Date, kebab action — `plain` DataTable variant matching the borderless Figma rows.
- [x] Add Schedule modal: Cycle Name, Assessment Scope select, Start/End date pickers, Check-in Frequency select, info note, Cancel/Save footer (verified `06-schedule-modal.png` vs Figma screenshot).
- [x] Custom-day panel (Sun–Sat toggles) appears when frequency = Custom.

### Functional checks (automated + manual)
- PASS — Save disabled while required fields incomplete (onChange zod validation)
- [x] Add schedule → lands in table under matching scope/level tab + success toast.
- [x] Edit pre-fills the modal; Archive goes through ConfirmModal and removes the row from active views.
- [x] Status badge derived from dates (Upcoming / Active / Ended).

### Edge cases
- [x] End date must be after start date (zod refine, inline error).
- [x] Custom frequency requires ≥1 weekday selected.
- [x] Empty filter combinations render the empty state (no schedules for tab combo).
- [x] DatePicker: month navigation, keyboard escape/click-outside dismissal.

---

## 4. Invite Members (Figma `614:3789`)

MCP flow: `get_design_context` + `get_screenshot` on `614:3789` ✅

### Layout fidelity vs Figma
- [x] "Employee Management" card: count chip, Bulk Import (secondary) + Invite Employee (primary) buttons.
- [x] Search input + All Status / All Departments filter selects.
- [x] Roster table: Employee ID, Name + position, Department, Email, status badge (Permanent/Contract/Probation), trash + active-toggle actions (verified `07-invite-members.png`).
- [x] Invite modal: Name, Company Email, Role, Department + Cancel/Save (verified `08-invite-modal.png`).
- [x] Pending Invites view (PRD-first, no mockup): email + name, role, department, invited/expires dates, Pending/Expired badges, resend + revoke actions.

### Functional checks (automated)
- PASS — invite rejects non-company domain (`qa@gmail.com` → inline error + Save disabled)
- PASS — valid invite (`qa.tester@strativy.com`) appears in Pending Invites with correct role/department
- [x] Duplicate email (existing member or pending invite) rejected with inline error.
- [x] Bulk Import: pastes parse on comma/newline/semicolon; per-email chips show valid/invalid-format/wrong-domain/duplicate; only valid ones submit with chosen role+department.
- [x] Remove member → ConfirmModal (destructive) → row removed + toast. Active toggle flips state instantly.

### Edge cases
- [x] Search matches name, employee ID, and position; combines with both filters.
- [x] Inactive member rendered dimmed with toggle off.
- [x] Pending tab count chip counts only `pending` (expired excluded) — tab label shows "(2)" with 3 rows incl. 1 expired, by design.
- [x] Empty results render table empty state.

---

## 5. Performance Config — Rating Scales CRUD (PRD-first, no mockup)

Built in the established design language (card header + DataTable + modals), per confirmed decision #4.

### Layout checks
- [x] Coverage bar visualizes the 0–100% band split by scale color (verified `02-rating-scales.png`).
- [x] Table: color-dotted rating label, score-range chip, description, edit/delete actions.
- [x] Gap warning banner (amber) when ranges don't cover 0–100 contiguously.
- [x] Add/Edit modal: Label, Min/Max Score (%), Description, Color select (verified `03-rating-modal.png`).
- [x] Role Appraisal tab: read-only company-default view with info banner (per-level overrides deferred).

### Functional checks (automated + manual)
- PASS — overlap rejected on submit (85–95 band overlaps existing 80–89/90–100 → inline error, verified `f2-rating-overlap.png`)
- [x] min ≤ max cross-field validation; 0–100 integer bounds.
- [x] Add/Edit/Delete round-trips through the store with toasts; delete uses destructive ConfirmModal.
- [x] Gap detection: deleting a middle band immediately surfaces the gap warning.

### Edge cases
- [x] Whole-numbers-only enforcement on scores.
- [x] Editing a scale excludes itself from the overlap check.
- [x] Empty state when all scales deleted (+ persistent gap warning).
- [x] Long descriptions wrap inside the description column without breaking row layout.

---

## Known limitations / deferred
- Dark theme tokens are wired (`[data-theme="dark"]`) but a full dark visual pass is deferred per decision #1.
- All persistence is mock-store backed (Zustand + simulated latency); no API routes yet.
- Per-job-level weight overrides (Role Appraisal) are read-only by design — flagged in-UI as a later release.
- Recharts installed but unused until the Dashboard stage.
- QA screenshots/scripts live in `.qa-shots/` (gitignored).
