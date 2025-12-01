"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/hooks/use-theme"
import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, isRTL } = useLanguage()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/images/whatsapp-20image-202025-11-30-20at-2013.jpg"
            alt="SA Jadwa Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            title={getTranslation(language, "nav.language")}
            className="flex items-center gap-2 text-sm"
          >
            <span>🌐</span>
            <span className="font-semibold">{language.toUpperCase()}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleTheme} title={getTranslation(language, "nav.themeToggle")}>
            {theme === "dark" ? (
              <span className="text-amber-400 text-lg">☀️</span>
            ) : (
              <span className="text-slate-700 text-lg">🌙</span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
