import React from "react"

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <h2>Rapidrun</h2>

        <div>
          <h4>Company</h4>
          <p>Platform</p>
          <p>Resources</p>
          <p>Why Rapidrun</p>
        </div>

        <div>
          <h4>Support</h4>
          <p>Terms</p>
          <p>Privacy</p>
          <p>Security</p>
        </div>

        <div>
          <h4>Get Started</h4>
          <p>Book unused container space smarter.</p>
        </div>
      </div>

      <p className="footer-bottom">
        © 2026 Rapidrun. Prototype built for Hackathon.
      </p>
    </footer>
  )
}

