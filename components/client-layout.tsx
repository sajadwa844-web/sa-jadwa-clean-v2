"use client"

import type React from "react"

import { ThemeProvider } from "@/lib/hooks/use-theme"
import { LanguageProvider } from "@/lib/hooks/use-language"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
