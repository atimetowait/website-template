import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"


const zalandoSans = {
  className: "zalando-sans",
  variable: "--font-sans",
}
const stixTwoText = {
  className: "stix-two-text",
  variable: "--font-serif",
}

export const metadata: Metadata = {
  title: "atimetowait",
  description: "a time to wait",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=STIX+Two+Text:ital,wght@0,400..700;1,400..700&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${stixTwoText.variable} ${zalandoSans.variable} font-mono antialiased text-base`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
