"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

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
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isComplete = Object.values(formData).every((value) => value.trim() !== "")

    if (isComplete) {
      // Here you would typically send the data to a server
      console.log("Form submitted:", formData)
      setSubmitted(true)
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        projectName: "",
        location: "",
        capital: "",
        description: "",
      })
      setTimeout(() => setSubmitted(false), 4000)
    } else {
      alert(getTranslation(language, "form.error"))
    }
  }

  return (
    <section id="contact-form" className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-3xl mx-auto">
        <Card className="border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          {/* Form Title */}
          <h2 className="text-4xl font-bold mb-2 text-center text-primary">{getTranslation(language, "form.title")}</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mb-8" />

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
              {getTranslation(language, "form.success")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.fullName")}</label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.fullName")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Email */}
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
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.projectName")}</label>
              <Input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder={getTranslation(language, "form.projectName")}
                className="w-full"
                dir={isRTL ? "rtl" : "ltr"}
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

            {/* Investment Capital */}
            <div>
              <label className="block text-sm font-medium mb-2">{getTranslation(language, "form.capital")}</label>
              <Input
                type="number"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-6"
            >
              {getTranslation(language, "form.submit")}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
