// src/components/contact-form.tsx - الكود المُعدل بالكامل
"use client"

import type React from "react"
import { useState, FormEvent } from "react" // تم إضافة FormEvent
import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
// إضافة المكونات التي تستخدمها (من ملفاتك المرفوعة)
import { Input } from "@/components/ui/input" 
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils" // إضافة cn لدمج التنسيقات

interface FormData {
  fullName: string
  email: string
  company: string
  phone: string
  projectName: string
  location: string
  capital: string
  description: string
}

export default function ContactForm() {
  const { language, isRTL } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    projectName: "",
    location: "",
    capital: "",
    description: "",
  })
  
  // حالات جديدة لإدارة الإرسال
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // مسح الرسائل عند بدء الكتابة
    if (statusMessage) setStatusMessage("")
    if (isError) setIsError(false)
  }

  // دالة الإرسال التي تتواصل مع الـ API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage("")
    setIsError(false)

    // التحقق من الحقول المطلوبة (الاسم، البريد، اسم المشروع)
    if (!formData.fullName || !formData.email || !formData.projectName) {
      setIsError(true)
      setStatusMessage(isRTL ? "الرجاء ملء الاسم، البريد الإلكتروني واسم المشروع." : "Please fill in all required fields.")
      setLoading(false)
      return
    }
    
    // الإرسال الفعلي إلى دالة الخادم
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatusMessage(getTranslation(language, "form.success"))
        setFormData({ 
          fullName: "", email: "", company: "", phone: "",
          projectName: "", location: "", capital: "", description: ""
        })
      } else {
        setIsError(true)
        // عرض رسالة الخطأ التي تأتي من الخادم
        setStatusMessage(data.message || getTranslation(language, "form.error"))
      }
    } catch (error) {
      console.error("Submission error:", error)
      setIsError(true)
      setStatusMessage(isRTL ? "فشل الاتصال بالخادم. يرجى المحاولة لاحقاً." : "Failed to connect to the server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // كود العرض (Render) يبقى كما هو تقريباً مع إضافة رسالة الحالة (Status Message)
  return (
    <section id="contact-form" className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-3xl mx-auto">
        <Card className="border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          {/* Form Title */}
          <h2 className="text-4xl font-bold mb-2 text-center text-primary">{getTranslation(language, "form.title")}</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mb-8" />

          {/* رسالة الحالة (الجديدة) */}
          {statusMessage && (
            <div
              className={cn(
                "mb-6 p-4 border rounded-lg",
                isError
                  ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-green-500/20 border-green-500/50 text-green-400"
              )}
            >
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.fullName")} <span className="text-red-500">*</span></label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.fullName")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.email")} <span className="text-red-500">*</span></label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.email")}
                className="w-full"
                dir="ltr"
                required
              />
            </div>
            
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.company")}</label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.company")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.phone")}</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.phone")}
                className="w-full"
                dir="ltr"
              />
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.projectName")} <span className="text-red-500">*</span></label>
              <Input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.projectName")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
                required
              />
            </div>

            {/* Project Location */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.location")}</label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.location")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Investment Capital (تم تعديله إلى 'text' ليتوافق مع النموذج) */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.capital")}</label>
              <Input
                type="text" 
                name="capital"
                value={formData.capital}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.capital")}
                className="w-full"
                dir="ltr"
              />
            </div>

            {/* Additional Description */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.description")}</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.description")}
                className="w-full min-h-32"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>


            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading} // تعطيل الزر أثناء الإرسال
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-6 transition-colors disabled:opacity-50"
            >
              {loading ? (isRTL ? "جاري الإرسال..." : "Sending...") : getTranslation(language, "form.submit")}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}