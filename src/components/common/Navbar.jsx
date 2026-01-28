import React from "react"

export default function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="logo">Rapidrun</h2>

      {/* Links */}
      <div className="nav-links">
        <button onClick={() => scrollToSection("home")}>Home</button>
        <button onClick={() => scrollToSection("why")}>Why Rapidrun</button>
        <button onClick={() => scrollToSection("platform")}>Platform</button>
        <button onClick={() => scrollToSection("resources")}>Resources</button>

        {/* Placeholder page */}
        <button onClick={() => scrollToSection("subscription")}>
          Subscription
        </button>
      </div>

      {/* CTA */}
      <button className="nav-btn">Get Started</button>
    </nav>
  )
}

