import React from "react"

export default function WhyRapidrunSection() {
  const cards = [
    {
      title: "⚡ Fast Booking",
      desc: "Instantly match exporters with unused cargo space in seconds instead of days."
    },
    {
      title: "📦 Max Space Utilization",
      desc: "We reduce wasted container space by connecting small shipments to available capacity."
    },
    {
      title: "💸 Cost Efficient Shipping",
      desc: "Exporters pay only for the space they use, making logistics affordable for everyone."
    }
  ]

  return (
    <section className="why Rapidrun?" id="why">
      <h2 className="why-title">Why Rapidrun?</h2>
      <p className="why-subtitle">
        A smarter way to ship, save money, and maximize unused cargo space.
      </p>

      <div className="why-grid">
        {cards.map((card, i) => (
          <div key={i} className="why-card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

