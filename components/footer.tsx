"use client"

import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

export default function Footer() {
  const { language, isRTL } = useLanguage()

  return (
    <footer className="bg-slate-800 text-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-700">
          {/* Contact Details */}
          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <h3 className="text-xl font-bold mb-4">S&A for Feasibility Studies and Corporate Restructuring</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1">
                  {getTranslation(language, "footer.location")}
                </p>
                <p className="hover:text-blue-300 transition-colors">
                  {language === "ar"
                    ? "حى المشرفة - جدة - المملكة العربية السعودية"
                    : "Al-Mushrifa District - Jeddah - Saudi Arabia"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1">{getTranslation(language, "footer.phone")}</p>
                <a href="tel:+966555594051" className="hover:text-blue-300 transition-colors">
                  +966 55 5594051
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1">
                  {getTranslation(language, "footer.whatsapp")}
                </p>
                <a
                  href="https://wa.me/966583936145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors"
                >
                  +966 58 3936145
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1">{getTranslation(language, "footer.email")}</p>
                <a href="mailto:info@SA-Jadwa.com" className="hover:text-blue-300 transition-colors">
                  info@SA-Jadwa.com
                </a>
              </div>
            </div>
          </div>

          <div className={`${isRTL ? "text-left" : "text-right"}`}>
            <h3 className="text-xl font-bold mb-4">{getTranslation(language, "footer.followUs")}</h3>
            <div className="flex gap-4 justify-start md:justify-end flex-wrap">
              <a
                href="https://www.facebook.com/SnAJadwa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-lg hover:bg-blue-600 transition-all text-lg"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/snajadwa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-lg hover:bg-pink-600 transition-all text-lg"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://x.com/SnAJadwa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-lg hover:bg-blue-500 transition-all text-lg"
                title="Twitter (X)"
              >
                𝕏
              </a>
              <a
                href="https://www.linkedin.com/company/13996382/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-lg hover:bg-blue-500 transition-all text-lg"
                title="linkedin"
              >
                🔗
              </a>
              <a
                href="https://www.tiktok.com/@snajadwa?_r=1&_t=ZS-91r3iIhWNRn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-lg hover:bg-black transition-all text-lg"
                title="TikTok"
              >
                🎵
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2025 SA Jadwa. {getTranslation(language, "footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
