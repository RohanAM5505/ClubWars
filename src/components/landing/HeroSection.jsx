import React from "react"
import shipImage from "../../ship.png"

export default function HeroSection() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero" id="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Rapidrun</h2>

        <ul className="nav-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("why")}>Why Rapidrun</li>
          <li onClick={() => scrollToSection("features")}>Platform</li>
          <li onClick={() => scrollToSection("resources")}>Resources</li>
        </ul>

        <button
          className="nav-btn"
          onClick={() => alert("Registration opens soon 🚀")}
        >
          Get Started
        </button>
      </nav>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Hassle free <br />
            Shipping and <br />
            Logistics
          </h1>

          <p>
            Rapidrun helps exporters book unused cargo space instantly. Pay only
            for the space you use and ship smarter worldwide.
          </p>
        </div>

        <div className="hero-image">
<img
  src={shipImage}
  alt="cargo ship"
  className="hero-ship"
/>

        </div>
      </div>

      {/* QUOTE BOX */}
      <div className="hero-box">
        <div className="box-item">
          <label>From</label>
          <input placeholder="Mumbai" />
        </div>

        <div className="box-item">
          <label>To</label>
          <input placeholder="Dubai" />
        </div>

        <div className="box-item">
          <label>Cargo Type</label>
          <select>
            <option>General Goods</option>
            <option>Fragile Items</option>
            <option>Perishable / Cold Chain</option>
            <option>Heavy Machinery</option>
            <option>Documents / Light Cargo</option>
          </select>
        </div>

        <div className="box-item">
          <label>Weight</label>
          <input placeholder="12 kg" />
        </div>

        <button
          className="quote-btn"
          onClick={() => alert("Quote generated successfully 💰")}
        >
          Get Quote
        </button>
      </div>
    </section>
  )
}

