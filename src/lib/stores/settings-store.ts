import { create } from 'zustand'
import type {
  Member,
  MemberRole,
  PendingInvite,
  PerformanceWeightConfig,
  RatingScale,
  ReviewCycleSchedule,
} from '@/types/settings'
import {
  delay,
  mockMembers,
  mockPendingInvites,
  mockRatingScales,
  mockSchedules,
  mockWeightConfig,
} from '@/lib/mock'

const INVITE_VALIDITY_DAYS = 7

function isoToday(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

let idCounter = 100

function nextId(prefix: string): string {
  return `${prefix}-${++idCounter}`
}

interface SettingsState {
  // Performance weight configuration
  weightConfig: PerformanceWeightConfig
  saveWeightConfig: (okrWeight: number) => Promise<void>

  // Schedules
  schedules: ReviewCycleSchedule[]
  addSchedule: (input: Omit<ReviewCycleSchedule, 'id' | 'archived'>) => Promise<void>
  updateSchedule: (id: string, input: Partial<ReviewCycleSchedule>) => Promise<void>
  archiveSchedule: (id: string) => Promise<void>

  // Members & invites
  members: Member[]
  invites: PendingInvite[]
  inviteMember: (input: { name: string; email: string; role: MemberRole; department: string }) => Promise<void>
  bulkInvite: (inputs: { email: string; role: MemberRole; department: string }[]) => Promise<void>
  removeMember: (id: string) => Promise<void>
  toggleMemberActive: (id: string) => Promise<void>
  resendInvite: (id: string) => Promise<void>
  revokeInvite: (id: string) => Promise<void>

  // Rating scales
  ratingScales: RatingScale[]
  addRatingScale: (input: Omit<RatingScale, 'id'>) => Promise<void>
  updateRatingScale: (id: string, input: Omit<RatingScale, 'id'>) => Promise<void>
  deleteRatingScale: (id: string) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  weightConfig: mockWeightConfig,
  saveWeightConfig: async (okrWeight) => {
    await delay()
    set((state) => ({
      weightConfig: {
        ...state.weightConfig,
        okrWeight,
        competencyWeight: 100 - okrWeight,
        updatedAt: isoToday(),
      },
    }))
  },

  schedules: mockSchedules,
  addSchedule: async (input) => {
    await delay()
    set((state) => ({
      schedules: [...state.schedules, { ...input, id: nextId('sch'), archived: false }],
    }))
  },
  updateSchedule: async (id, input) => {
    await delay()
    set((state) => ({
      schedules: state.schedules.map((s) => (s.id === id ? { ...s, ...input } : s)),
    }))
  },
  archiveSchedule: async (id) => {
    await delay()
    set((state) => ({
      schedules: state.schedules.map((s) => (s.id === id ? { ...s, archived: true } : s)),
    }))
  },

  members: mockMembers,
  invites: mockPendingInvites,
  inviteMember: async (input) => {
    await delay()
    set((state) => ({
      invites: [
        {
          id: nextId('inv'),
          email: input.email,
          name: input.name,
          role: input.role,
          department: input.department,
          invitedAt: isoToday(),
          expiresAt: isoToday(INVITE_VALIDITY_DAYS),
          status: 'pending' as const,
        },
        ...state.invites,
      ],
    }))
  },
  bulkInvite: async (inputs) => {
    await delay(700)
    set((state) => ({
      invites: [
        ...inputs.map((input) => ({
          id: nextId('inv'),
          email: input.email,
          name: input.email.split('@')[0].replace(/[._]/g, ' '),
          role: input.role,
          department: input.department,
          invitedAt: isoToday(),
          expiresAt: isoToday(INVITE_VALIDITY_DAYS),
          status: 'pending' as const,
        })),
        ...state.invites,
      ],
    }))
  },
  removeMember: async (id) => {
    await delay()
    set((state) => ({ members: state.members.filter((m) => m.id !== id) }))
  },
  toggleMemberActive: async (id) => {
    await delay(250)
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, active: !m.active } : m)),
    }))
  },
  resendInvite: async (id) => {
    await delay()
    set((state) => ({
      invites: state.invites.map((inv) =>
        inv.id === id
          ? { ...inv, invitedAt: isoToday(), expiresAt: isoToday(INVITE_VALIDITY_DAYS), status: 'pending' as const }
          : inv
      ),
    }))
  },
  revokeInvite: async (id) => {
    await delay()
    set((state) => ({
      invites: state.invites.map((inv) =>
        inv.id === id ? { ...inv, status: 'revoked' as const } : inv
      ),
    }))
  },

  ratingScales: mockRatingScales,
  addRatingScale: async (input) => {
    await delay()
    set((state) => ({
      ratingScales: [...state.ratingScales, { ...input, id: nextId('rate') }].sort(
        (a, b) => b.minScore - a.minScore
      ),
    }))
  },
  updateRatingScale: async (id, input) => {
    await delay()
    set((state) => ({
      ratingScales: state.ratingScales
        .map((r) => (r.id === id ? { ...input, id } : r))
        .sort((a, b) => b.minScore - a.minScore),
    }))
  },
  deleteRatingScale: async (id) => {
    await delay()
    set((state) => ({ ratingScales: state.ratingScales.filter((r) => r.id !== id) }))
  },
}))
