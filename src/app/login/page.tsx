'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Clear session on mount to prevent loops
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('strativy_auth')
    }
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('Form submitted:', { email })
    
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    
    setLoading(true)
    
    // Dummy auth — accept any credentials
    setTimeout(() => {
      console.log('Redirecting to dashboard...')
      if (typeof window !== 'undefined') {
        localStorage.setItem('strativy_auth', 'true')
        window.location.href = '/' // Force hard redirect for prototype stability
      }
    }, 800)
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-white">
      {/* Brand panel */}
      <div className="hidden lg:flex w-[38%] min-w-[440px] bg-[#0f172a] relative overflow-hidden flex-col p-16">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-24 z-10">
          <div 
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
          >
            <span className="text-white font-bold text-xl leading-none">S</span>
          </div>
          <div>
            <div className="text-white font-bold text-[20px] leading-none tracking-tight text-white uppercase italic">STRATIVY <span className="text-primary-500">CMS</span></div>
            <div className="text-[#95a5b8] text-[10px] tracking-[1.4px] font-medium uppercase mt-1">CONTENT MANAGEMENT SYSTEM</div>
          </div>
        </div>

        {/* Headline */}
        <div className="z-10 flex-1">
          <h1 className="text-white font-bold text-[40px] leading-[1.15] tracking-tight mb-6">
            When impact is<br />visible, great<br />people stay.
          </h1>
          <p className="text-[#75889d] text-[15px] leading-relaxed mb-10 max-w-[360px]">
            The AI layer that translates qualitative<br />work into quantitative impact.
          </p>

          <div className="w-14 h-[3.5px] bg-primary-600 rounded-full mb-12" />

          {/* Feature list */}
          <div className="flex flex-col gap-9">
            <div className="flex gap-4">
              <div className="w-[38px] h-[38px] rounded-xl bg-[#162a68] border border-primary-500/10 flex items-center justify-center shrink-0">
                <span className="text-[#9cc2fe] text-lg">◎</span>
              </div>
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Make work visible</p>
                <p className="text-[#75889d] text-[13px] leading-relaxed max-w-[280px]">Leaders see 4 layers deep — exactly what drives results today.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[38px] h-[38px] rounded-xl bg-[#162a68] border border-primary-500/10 flex items-center justify-center shrink-0">
                <span className="text-[#9cc2fe] text-lg">⚡</span>
              </div>
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Make execution intelligent</p>
                <p className="text-[#75889d] text-[13px] leading-relaxed max-w-[280px]">AI bridges strategy to tasks, surfacing gaps before failure.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[38px] h-[38px] rounded-xl bg-[#162a68] border border-primary-500/10 flex items-center justify-center shrink-0">
                <span className="text-[#9cc2fe] text-lg">⚖</span>
              </div>
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Make performance fair</p>
                <p className="text-[#75889d] text-[13px] leading-relaxed max-w-[280px]">Reviews grounded in real data. Less politics. Higher trust.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[#75889d] text-[11px] mt-12 z-10 opacity-80">
          {'↑ 40% less review prep  ·  ↓ Turnover drops  ·  ↑ Fairer promotions'}
        </p>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/10 blur-[100px] rounded-full" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-600/5 blur-[80px] rounded-full" />
      </div>

      {/* Auth panel */}
      <div className="flex-1 bg-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[#0f172a] font-bold text-[32px] tracking-tight mb-2">Sign in to Strativy <span className="text-primary-600 font-black italic">CMS</span></h2>
            <p className="text-[#485669] text-[15px]">The unified command center for performance content.</p>
          </div>

          {/* OAuth buttons */}
          <div className="flex flex-col gap-3.5 mb-8">
            <button
              type="button"
              className="w-full h-[54px] border border-[#e2e8ef] border-[1.5px] rounded-xl flex items-center px-5 gap-3.5 text-[#0f172a] text-sm font-semibold hover:bg-neutral-50 transition-all active:scale-[0.98]"
            >
              <span className="text-primary-600 text-xl">✨</span>
              Continue with Magic Link
            </button>
            <button
              type="button"
              className="w-full h-[54px] border border-[#e2e8ef] border-[1.5px] rounded-xl flex items-center px-5 gap-3.5 text-[#0f172a] text-sm font-semibold hover:bg-neutral-50 transition-all active:scale-[0.98]"
            >
              <span className="text-primary-600 text-xl">🏢</span>
              Continue with SSO (Google, Okta, SAML)
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#e2e8ef]" />
            <span className="text-[#95a5b8] text-[12px] font-medium uppercase tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-[#e2e8ef]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[12px] font-semibold text-[#485669] mb-2 uppercase tracking-wide">Email address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@strativy-cms.com"
                className="h-12 bg-[#f8f9fb] border-[#e2e8ef] rounded-xl px-4 text-sm text-[#0f172a] placeholder-[#95a5b8] focus:border-primary-500 focus:ring-primary-500 transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-[12px] font-semibold text-[#485669] mb-2 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-12 bg-[#f8f9fb] border-[#e2e8ef] rounded-xl px-4 pr-12 text-sm text-[#0f172a] placeholder-[#95a5b8] focus:border-primary-500 focus:ring-primary-500 transition-all w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-[#485669] text-[14px] cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[#e2e8ef] text-primary-600 focus:ring-primary-500 transition-all" 
                />
                <span className="group-hover:text-[#0f172a] transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-primary-600 text-[14px] font-semibold hover:text-primary-700 transition-colors">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="text-danger-600 text-[13px] bg-danger-50 border border-danger-100 rounded-lg px-4 py-3 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[54px] bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[16px] rounded-xl shadow-lg shadow-blue-600/20 mt-2 flex items-center justify-center transition-all active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign In →'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#95a5b8] text-[14px]">
              New to Strativy?{' '}
              <button type="button" className="text-primary-600 font-bold hover:text-primary-700 transition-colors ml-1">
                Contact your admin
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
