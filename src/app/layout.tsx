import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research-Roulette',
  description: 'A trivia game for researchers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
