"use client"

import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import Image from "next/image" // 👈 1. إضافة استيراد مكون Image

export default function HeroSection() {
  const { language, isRTL } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Light mode background with subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-slate-50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-red-300/30 via-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-purple-300/25 via-pink-300/25 to-red-300/25 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300/30 via-blue-300/30 to-purple-300/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* 👈 2. تم إضافة اللوجو هنا */}
        <Image
          src="/sa-jadwa-logo.png" // 👈 اسم ملف الصورة
          alt="SA Jadwa Logo"
          width={500} // 👈 يمكنك تعديل العرض
          height={500} // 👈 يمكنك تعديل الارتفاع
          className="mx-auto mb-6" // 👈 تنسيقات لتوسيط الصورة وإضافة هامش سفلي
        />

        {/* Headline - Arabic words with professional gradient */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-amber-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          {getTranslation(language, "hero.headline")}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {getTranslation(language, "hero.subheadline")}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          {getTranslation(language, "hero.cta")}
        </Button>
      </div>
    </section>
  )
}