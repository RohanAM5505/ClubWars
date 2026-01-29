import React from "react"

import HeroSection from "./components/landing/HeroSection"
import WhyRapidrunSection from "./components/landing/WhyRapidrunSection"
import KeyFeaturesSection from "./components/landing/KeyFeaturesSection"
import ProviderDashboardSection from "./components/landing/ProviderDashboardSection"
import NewsletterSection from "./components/landing/NewsletterSection"
import FooterSection from "./components/landing/FooterSection"

export default function App() {
  return (
    <>
      <HeroSection />
      <WhyRapidrunSection />
      <KeyFeaturesSection />
      <ProviderDashboardSection />
      <NewsletterSection />
      <FooterSection />
    </>
  )
}

