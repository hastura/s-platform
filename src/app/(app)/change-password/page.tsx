'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!form.current) e.current = 'Current password is required'
    if (!form.next) e.next = 'New password is required'
    else if (form.next.length < 8) e.next = 'Password must be at least 8 characters'
    if (!form.confirm) e.confirm = 'Please confirm your new password'
    else if (form.next !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSuccess(true)
    setForm({ current: '', next: '', confirm: '' })
  }

  return (
    <div className="max-w-[520px]">
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Card header */}
        <div className="px-[28px] py-[24px] border-b border-[#f1f5f9]">
          <div className="flex items-center gap-[12px]">
            <div
              className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-[#0f172a] font-bold text-[16px] leading-none mb-[4px]">Change Password</p>
              <p className="text-[#64748b] text-[13px] font-normal leading-none">Update your account password</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-[28px] py-[28px] flex flex-col gap-[20px]">
          {success && (
            <div className="flex items-center gap-[10px] bg-[#f0fdf4] border border-[#bbf7d0] rounded-[12px] px-[16px] py-[12px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-[#16a34a] text-[13px] font-medium">Password changed successfully.</p>
            </div>
          )}

          {/* Current Password */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[#334155] text-[13px] font-semibold">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={form.current}
                onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
                placeholder="Enter current password"
                className="w-full h-[42px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] pr-[42px] text-[14px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] transition-colors"
              >
                {showCurrent ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.current && <p className="text-[#ef4444] text-[12px] font-medium">{errors.current}</p>}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[#334155] text-[13px] font-semibold">New Password</label>
            <div className="relative">
              <input
                type={showNext ? 'text' : 'password'}
                value={form.next}
                onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))}
                placeholder="Enter new password"
                className="w-full h-[42px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] pr-[42px] text-[14px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNext((v) => !v)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] transition-colors"
              >
                {showNext ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.next && <p className="text-[#ef4444] text-[12px] font-medium">{errors.next}</p>}
            <p className="text-[#94a3b8] text-[12px]">Must be at least 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[#334155] text-[13px] font-semibold">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                placeholder="Confirm new password"
                className="w-full h-[42px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] pr-[42px] text-[14px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] transition-colors"
              >
                {showConfirm ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirm && <p className="text-[#ef4444] text-[12px] font-medium">{errors.confirm}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[12px] pt-[4px]">
            <button
              type="submit"
              className="h-[42px] px-[24px] rounded-[12px] text-white text-[14px] font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="h-[42px] px-[24px] rounded-[12px] bg-[#f1f5f9] text-[#334155] text-[14px] font-semibold hover:bg-[#e2e8f0] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
