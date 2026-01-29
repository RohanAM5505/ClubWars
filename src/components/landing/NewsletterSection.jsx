import React from "react"

export default function NewsletterSection() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-box">
        <h2>Newsletter</h2>
        <p>
          Get the latest updates about smart logistics, unused space booking, and
          Rapidrun features.
        </p>

        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </section>
  )
}

