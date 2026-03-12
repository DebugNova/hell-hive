import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Pacifico } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

const pacifico = Pacifico({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: 'HellHive - Discover & Host Unforgettable Events',
  description: 'The premium event marketplace for discovering and hosting house parties, meetups, gaming nights, music events, and social gatherings.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${pacifico.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
