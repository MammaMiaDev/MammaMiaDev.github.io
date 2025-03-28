import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cinghialines',
  description: 'Tracking the shipping status for something very special',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
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
