"use client"

import React, { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/hooks/use-language" 
import { getTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils" 

// تعريف نوع البيانات لحالة النموذج
type FormData = {
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
  
  // 1. إدارة حالة النموذج
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
  
  // 2. إدارة حالة الإرسال (تم إضافتها لأنها كانت مفقودة في الكود المرفق)
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isError, setIsError] = useState(false)

  // دالة لتحديث حالة الحقول
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    // مسح رسالة الحالة عند بدء الكتابة
    if (statusMessage) setStatusMessage("") 
  }

  // 3. دالة معالجة الإرسال (POST Request) - تم تبسيط رسالة التحقق
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage("")
    setIsError(false)

    // التحقق من الحقول المطلوبة (FullName, Email, ProjectName)
    if (!formData.fullName || !formData.email || !formData.projectName) {
      setIsError(true)
      setStatusMessage(getTranslation(language, "form.error") || (isRTL ? "الرجاء ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، اسم المشروع)." : "Please fill in all required fields (Name, Email, Project Name)."))
      setLoading(false)
      // *تم إزالة alert() لأنه يقطع تجربة المستخدم، واستبداله بعرض رسالة الحالة*
      return
    }
    
    // الإرسال الفعلي:
    try {
      // ⚠️ تأكد من أن المسار "/api/send-email" صحيح ويعمل على Vercel
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatusMessage(getTranslation(language, "form.success") || (isRTL ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!"))
        setFormData({ // مسح النموذج بعد النجاح
          fullName: "", email: "", company: "", phone: "",
          projectName: "", location: "", capital: "", description: ""
        })
      } else {
        setIsError(true)
        // عرض رسالة الخطأ التي تأتي من الخادم (دالة route.ts)
        setStatusMessage(data.message || getTranslation(language, "form.error") || (isRTL ? "فشل إرسال النموذج. يرجى مراجعة إعدادات الخادم." : "Form submission failed. Please check server settings."))
      }
    } catch (error) {
      console.error("Submission error:", error)
      setIsError(true)
      setStatusMessage("فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <section id="contact-form" className="py-20 bg-gray-50 dark:bg-gray-900" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {getTranslation(language, "form.title")}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* 1. الاسم الكامل - REQUIRED */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.fullName")}
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder={isRTL ? getTranslation(language, "form.fullNameAr") : getTranslation(language, "form.fullName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            
            {/* 2. البريد الإلكتروني - REQUIRED */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={isRTL ? getTranslation(language, "form.emailAr") : getTranslation(language, "form.email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            
            {/* 3. اسم الشركة */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.company")}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={isRTL ? getTranslation(language, "form.companyAr") : getTranslation(language, "form.company")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            {/* 4. رقم الهاتف */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={isRTL ? getTranslation(language, "form.phoneAr") : getTranslation(language, "form.phone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {/* 5. اسم المشروع - REQUIRED */}
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.projectName")}
              </label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                value={formData.projectName}
                onChange={handleChange}
                required
                placeholder={isRTL ? getTranslation(language, "form.projectNameAr") : getTranslation(language, "form.projectName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            
            {/* 6. موقع المشروع */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.location")}
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={isRTL ? getTranslation(language, "form.locationAr") : getTranslation(language, "form.location")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            {/* 7. رأس المال */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="capital" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {getTranslation(language, "form.capital")}
              </label>
              <input
                type="text"
                name="capital"
                id="capital"
                value={formData.capital}
                onChange={handleChange}
                placeholder={isRTL ? getTranslation(language, "form.capitalAr") : getTranslation(language, "form.capital")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>
          
          {/* 8. وصف إضافي */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {getTranslation(language, "form.description")}
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder={isRTL ? getTranslation(language, "form.descriptionAr") : getTranslation(language, "form.description")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none"
            />
          </div>

          {/* رسالة الحالة */}
          {statusMessage && (
            <div
              className={cn(
                "p-4 mb-4 text-sm rounded-lg",
                isError
                  ? "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-400"
                  : "text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-400"
              )}
              role="alert"
            >
              {statusMessage}
            </div>
          )}

          {/* زر الإرسال */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? (isRTL ? "جاري الإرسال..." : "Sending...") : getTranslation(language, isRTL ? "form.submitAr" : "form.submit")}
          </Button>
          
        </form>
      </div>
    </section>
  )
}