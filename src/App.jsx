import { useState } from "react"
import "./App.css"

// Pages
import RegistrationPage from "./Pages/registrations.jsx"

// Landing sections
import HeroSection from "./components/landing/HeroSection"
import WhyRapidrunSection from "./components/landing/WhyRapidrunSection"
import KeyFeaturesSection from "./components/landing/KeyFeaturesSection"
import ProviderDashboardSection from "./components/landing/ProviderDashboardSection"
import NewsletterSection from "./components/landing/NewsletterSection"
import FooterSection from "./components/landing/FooterSection"

function App() {
  const [showRegistration, setShowRegistration] = useState(false)

  // Show registration page
  if (showRegistration) {
    return <RegistrationPage />
  }

  // Default: Landing page
  return (
    <>
      <HeroSection onRegister={() => setShowRegistration(true)} />
      <WhyRapidrunSection />
      <KeyFeaturesSection />
      <ProviderDashboardSection />
      <NewsletterSection />
      <FooterSection />
    </>
  )
}

export default App
