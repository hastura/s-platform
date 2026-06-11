import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // --------------------------------------------------------
      // COLORS
      // --------------------------------------------------------
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // ← Brand primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8e',
          950: '#172554',
          DEFAULT: '#2563eb',
        },
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#22c55e',
        },
        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#f59e0b',
        },
        danger: {
          50:  '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#ef4444',
        },

        // ── OKR Goal Health ────────────────────────────────────
        goal: {
          'on-track': '#22c55e',   // ≥ 70%
          'at-risk':  '#f59e0b',   // 40–69%
          'off-track': '#ef4444',  // < 40%
        },

        // ── Accent (Competency indigo) ─────────────────────────
        accent: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          DEFAULT: '#4f46e5',
        },

        // ── Semantic UI Aliases ────────────────────────────────
        // Figma Colors/Semantic/border/default
        border: '#f1f5f9',
        'border-subtle': '#f1f5f9',
        background: '#f8fafc',
        surface: '#ffffff',
        'surface-subtle': '#f1f5f9',
      },

      // --------------------------------------------------------
      // TYPOGRAPHY
      // --------------------------------------------------------
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Fira Code', 'monospace'],
        // Figma chip text style "Plus Jakarta Sans/XS/B2"
        jakarta: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem' }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem' }],
        '3xl':['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem' }],
      },

      // --------------------------------------------------------
      // BORDER RADIUS
      // --------------------------------------------------------
      borderRadius: {
        none: '0px',
        sm:   '4px',
        DEFAULT: '6px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl':'16px',
        full: '9999px',
      },

      // --------------------------------------------------------
      // SHADOWS
      // --------------------------------------------------------
      boxShadow: {
        xs:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm:  '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
        DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
        md:  '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
        lg:  '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
        xl:  '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',
        none:'none',
        'elevation-01': '0px 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-02': '1px 6px 24px 2px rgba(3, 6, 18, 0.12)',
        'elevation-03': '1.5px 9px 36px 3px rgba(3, 6, 18, 0.12)',
        'glow-primary': '0px 4px 6px 0px rgba(59, 130, 246, 0.3), 0px 10px 15px 0px rgba(59, 130, 246, 0.3)',
        'glow-primary-sm': '0px 4px 3px rgba(59, 130, 246, 0.2), 0px 10px 7.5px rgba(59, 130, 246, 0.2)',
      },

      // --------------------------------------------------------
      // Z-INDEX
      // --------------------------------------------------------
      zIndex: {
        base:    '0',
        raised:  '10',
        dropdown:'100',
        sticky:  '200',
        overlay: '300',
        modal:   '400',
        toast:   '500',
      },

      // --------------------------------------------------------
      // TRANSITIONS
      // --------------------------------------------------------
      transitionDuration: {
        fast:   '100ms',
        normal: '200ms',
        slow:   '300ms',
      },
    },
  },
  plugins: [],
}

export default config
