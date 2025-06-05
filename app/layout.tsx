import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SportsHub MVP',
  description: 'A sports video platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-gray-900">
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
} 