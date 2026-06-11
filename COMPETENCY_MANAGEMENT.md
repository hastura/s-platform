# Strativy Competency Management System

This document outlines the Product, Design, and Functional requirements for the Competency Management module, integrated as a core sub-system of the Strativy Platform.

---

## 1. Product Requirement Document (PRD)

### 1.1 Project Overview
The Competency Management System (CMS) provides a centralized framework for defining, mapping, and assessing employee skills across the organization. It bridges the gap between organizational job grades and individual career growth.

### 1.2 User Personas
| Persona | Key Objective | Primary Need |
| :--- | :--- | :--- |
| **HR Admin** | Framework Integrity | Define standardized Skill Libraries and Category Sections. |
| **Manager** | Team Performance | Review direct reports against grade-specific competency standards. |
| **Employee** | Career Growth | Understand current expectations and perform self-assessments. |

### 1.3 Key Features
- **Centralized Skill Library:** A master repository for competencies categorized by sections (Core, Technical, Soft Skills).
- **Behavioral Indicators:** Granular "observable behaviors" that define what proficiency looks like.
- **Grade-to-Skill Mapping:** The ability to "pin" specific behaviors from the library to Job Grades (e.g., Junior vs. Lead).
- **RBAC Matrix:** Custom dashboards for Admins (Org Health), Managers (Team Progress), and Employees (Self-Rating).
- **Bulk Migration:** CSV import/export for rapid framework setup.

### 1.4 Success Metrics
- **Framework Coverage:** Percentage of Job Grades with mapped competencies.
- **Assessment Velocity:** Time taken from self-assessment to manager sign-off.
- **Skill Gap Identification:** Real-time reporting on critical organizational skill deficits.

---

## 2. Design Requirement Document (DRD)

### 2.1 Visual Language
- **Theme:** High-fidelity "Soft Professional" aesthetic.
- **Color Palette:**
  - **Primary:** Indigo (`#4f46e5`) for brand actions.
  - **Success:** Emerald (`#10b981`) for completed assessments.
  - **Danger:** Rose (`#f43f5e`) for critical gaps and deletions.
- **Corner Rounding:** Ultra-soft hierarchy (`rounded-[32px]` for cards, `rounded-[40px]` for modals).
- **Shadows:** Subtle `shadow-sm` for list items, `shadow-2xl` for active modal overlays.

### 2.2 Layout Strategy
- **Three-Panel Navigation (Admin Setup):**
  1. **Primary Sidebar:** Main platform navigation.
  2. **Library Panel (Fixed 80px):** Vertical skill navigation and CRUD actions.
  3. **Mapping Workspace (Fluid):** Hierarchical view of Departments > Teams > Grades.
- **Dynamic RBAC Screens:**
  - **Admin:** Macro-stat grid + Heatmap table.
  - **Manager:** Card-based direct report overview.
  - **Employee:** Immersive assessment stepper with 1-5 point rating scale.

### 2.3 Component Architecture (Atomic Design)
- **Atoms:** `Badge`, `RatingButton`, `IconWrapper`, `Typography`.
- **Molecules:** `SkillListItem`, `GradeCard`, `StatBox`, `BehaviorRow`.
- **Organisms:** `SkillLibraryPanel`, `OrgHierarchyView`, `HeatmapTable`, `BulkImportModal`.

---

## 3. Functional Specification (FSD)

### 3.1 Data Model
#### Competency Library
```typescript
interface Behavior {
  id: string;
  text: string;
}

interface Competency {
  id: string;
  name: string;
  behaviors: Behavior[];
}

interface Section {
  id: string;
  title: string;
  competencies: Competency[];
}
```

#### Organizational Mapping
```typescript
interface Assignment {
  compId: string;
  behaviorIds: string[]; // Mapped behavior IDs from the library
}

interface Grade {
  id: string;
  level: string; // e.g., "Senior Product Manager"
  band: string;  // e.g., "Grade 7"
  assignments: Assignment[];
}
```

### 3.2 Core Logic
- **Mapping Synchronization:** Deleting a behavior from the **Master Library** must trigger a cascade delete across all **Grade Assignments** to maintain data integrity.
- **Scoring Algorithm:**
  - `Proficiency % = (Selected Behaviors / Total Required Behaviors) * 100`
- **RBAC Logic:**
  - `View: Setup` -> Accessible to `Admin` only.
  - `View: Team Review` -> Accessible to `Admin` and `Manager`.
  - `View: My Growth` -> Accessible to `Employee`.

### 3.3 System Integrations
- **HRIS Sync:** The module expects `OrgStructure` data (Departments/Teams) to be pre-populated from the Company Setup module.
- **CSV Engine:** Handles browser-side parsing of `.csv` files using `FileReader`, validating column headers: `[Section, Competency, Behavior 1, Behavior 2, ...]`.

---

## 5. Reference Implementation Content (from Prototype)

### 5.1 Baseline Organizational Structure
The system should initialize with the following reference hierarchy:
- **Department:** `Product & Tech`
  - **Team:** `Product Management`
    - **Grade 5:** `Junior Product Manager`
    - **Grade 7:** `Senior Product Manager`
    - **Grade 9:** `Lead Product Manager`
  - **Team:** `Product Design`
    - **Grade 5:** `Junior Designer`
    - **Grade 7:** `Senior Designer`

### 5.2 Initial Skill Library (v1)
- **Section:** `Core Competencies`
  - **Competency:** `Product Strategy`
    - **Behavior 1:** `Market Segmentation`
    - **Behavior 2:** `Vision Setting`
    - **Behavior 3:** `Competitive Analysis`

### 5.3 Prototype Mapping Logic (Reference)
The following mappings were established in the reference implementation:
- `Junior Product Manager` -> Assigned `Product Strategy` (Behaviors: `Market Segmentation`, `Vision Setting`).
- `Senior Product Manager` -> Assigned `Product Strategy` (Behaviors: `Market Segmentation`, `Vision Setting`, `Competitive Analysis`).

### 5.4 Feature Logic Constants
- **Proficiency Levels:** 1 to 5 (Integer scale).
- **CSV Template Headers:** `Section, Competency, Behavior 1, Behavior 2, Behavior 3`.

---

## 6. Implementation Roadmap

### Phase 1: Foundation
- Define TypeScript interfaces in `src/types/competency.ts`.
- Build the `LibraryPanel` atom/molecule set.
- Implement the CSV Import/Export service.

### Phase 2: Mapping Workspace
- Create the hierarchical `HierarchyView` component.
- Build the `AssignModal` for linking library skills to job grades.

### Phase 3: Review & Analytics
- Develop the `HeatmapTable` for Admin macro-views.
- Implement the Employee `SelfAssessment` rating UI.

### Phase 4: Integration
- Add sub-menus to `Sidebar.tsx`.
- Configure Next.js parallel/intercepted routes for modals.
