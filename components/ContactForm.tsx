// src/components/ContactForm.tsx
"use client"

import type React from "react"
import { useState, FormEvent } from "react"
import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
  
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (statusMessage) setStatusMessage("")
    if (isError) setIsError(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage("")
    setIsError(false)

    // 🛑 التحقق من الحقول الإلزامية الجديدة: الاسم، الهاتف، اسم المشروع
    if (!formData.fullName || !formData.phone || !formData.projectName) {
      setIsError(true)
      setStatusMessage(getTranslation(language, "form.error") || (isRTL ? "الرجاء ملء الاسم الكامل، رقم الهاتف واسم المشروع أولاً." : "Please fill in Name, Phone Number, and Project Name first."))
      setLoading(false)
      return 
    }
    
    // 🚀 الإرسال الفعلي
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
        setStatusMessage(getTranslation(language, "form.success") || (isRTL ? "تم إرسال النموذج بنجاح!" : "Form submitted successfully!"))
        setFormData({ 
          fullName: "", email: "", company: "", phone: "",
          projectName: "", location: "", capital: "", description: ""
        })
      } else {
        setIsError(true)
        setStatusMessage(data.message || getTranslation(language, "form.error") || (isRTL ? "فشل الإرسال. تحقق من السجلات." : "Submission failed. Check logs."))
      }
    } catch (error) {
      console.error("Submission error:", error)
      setIsError(true)
      setStatusMessage(isRTL ? "فشل الاتصال بالخادم. يرجى المحاولة لاحقاً." : "Failed to connect to the server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-3xl mx-auto">
        <Card className="border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          {/* Form Title */}
          <h2 className="text-4xl font-bold mb-2 text-center text-primary">{getTranslation(language, "form.title")}</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mb-8" />

          {/* رسالة الحالة */}
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
            
            {/* 1. Full Name - مطلوب */}
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

            {/* 2. Email - اختياري */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.email")}</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.email")}
                className="w-full"
                dir="ltr"
                // تم إزالة required
              />
            </div>

            {/* 3. Company Name - اختياري */}
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
                // تم إزالة required
              />
            </div>

            {/* 4. Phone Number - مطلوب */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.phone")} <span className="text-red-500">*</span></label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.phone")}
                className="w-full"
                dir="ltr"
                required
              />
            </div>

            {/* 5. Project Name - مطلوب */}
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

            {/* 6. Project Location - اختياري */}
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
                // تم إزالة required
              />
            </div>

            {/* 7. Investment Capital - اختياري */}
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
                // تم إزالة required
              />
            </div>

            {/* 8. Additional Description - اختياري */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.description")}</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.description")}
                className="w-full min-h-32"
                dir={isRTL ? "rtl" : "ltr"}
                // تم إزالة required
              />
            </div>


            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
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