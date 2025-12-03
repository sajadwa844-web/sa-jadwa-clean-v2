"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ContactForm />
      <Footer />
    </main>
  )
}
// تم التعديل لإجبار Git على رؤية التغييرات