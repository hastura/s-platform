import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Figma chips (Chip-Data, tab/filter) use Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Strativy',
  description: 'OKR and performance management platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-neutral-900">
        {children}
      </body>
    </html>
  )
}
