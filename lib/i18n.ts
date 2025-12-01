// Internationalization configuration
export type Language = "en" | "ar"

export const translations = {
  en: {
    nav: {
      themeToggle: "Toggle theme",
      language: "Language",
    },
    hero: {
     
      subheadline:
        "S&A for Feasibility Studies and Corporate Restructuring",
      cta: "Start Your Project Now",
    },
    form: {
      title: "Service Request Form",
      fullName: "Full Name",
      fullNameAr: "الاسم الكامل",
      email: "Email",
      emailAr: "البريد الإلكتروني",
      company: "Company Name",
      companyAr: "اسم الشركة",
      phone: "Phone Number",
      phoneAr: "رقم الهاتف",
      projectName: "Project Name",
      projectNameAr: "اسم المشروع",
      location: "Project Location",
      locationAr: "موقع المشروع",
      capital: "Investment Capital",
      capitalAr: "رأس المال للاستثمار",
      description: "Additional Description",
      descriptionAr: "وصف إضافي للمشروع",
      submit: "Submit",
      submitAr: "إرسال البيانات",
      success: "Form submitted successfully!",
      error: "Please fill in all required fields.",
    },
    footer: {
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      followUs: "Follow Us",
      rights: "All rights reserved.",
    },
  },
  ar: {
    nav: {
      themeToggle: "تبديل المظهر",
      language: "اللغة",
    },
    hero: {
      
      subheadline: "اس اند اية لدراسات الجدوى و اعادة هيكلة الشركات .",
      cta: "ابدأ مشروعك الآن",
    },
    form: {
      title: "نموذج طلب الخدمة ",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      company: "اسم الشركة",
      phone: "رقم الهاتف",
      projectName: "اسم المشروع",
      location: "موقع المشروع",
      capital: "رأس المال للاستثمار",
      description: "وصف إضافي للمشروع",
      submit: "إرسال البيانات",
      success: "تم إرسال النموذج بنجاح!",
      error: "يرجى ملء جميع الحقول المطلوبة.",
    },
    footer: {
      phone: "الهاتف",
      whatsapp: "واتس آب",
      email: "البريد الإلكتروني",
      followUs: "تابعنا",
      rights: "جميع الحقوق محفوظة.",
    },
  },
}

export const getTranslation = (lang: Language, key: string) => {
  const keys = key.split(".")
  let value: any = translations[lang]
  for (const k of keys) {
    value = value[k]
  }
  return value
}
