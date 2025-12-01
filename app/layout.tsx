import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
import ClientLayout from "@/components/client-layout"

export const metadata: Metadata = {
  title: "SA Jadwa - Investment Solutions",
  description: "Premium investment opportunities with expert guidance and strategic insights",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
        {/* Analytics component removed as per updates */}
      </body>
    </html>
  )
}
