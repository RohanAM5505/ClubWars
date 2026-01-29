import React from "react"

export default function KeyFeaturesSection() {
  const features = [
    {
      title: "📦 Unused Space Detection",
      desc: "Rapidrun identifies underutilized containers by calculating available capacity and filtering only feasible options."
    },
    {
      title: "🛡 Rule-Based Safety Filtering",
      desc: "Phase 1 ensures route compatibility, cargo fit, valid departure dates, and capacity checks before recommendations."
    },
    {
      title: "🤖 ML-Powered Reliability Ranking",
      desc: "Phase 2 uses an XGBoost model to predict on-time delivery probability and rank containers intelligently."
    },
    {
      title: "🚢 Partial Container Booking",
      desc: "Exporters book only the space they need and pay proportionally, enabling shared container utilization."
    },
    {
      title: "📊 Booking Analytics & History",
      desc: "Confirmed bookings are stored to track demand trends, optimize costs, and improve space utilization over time."
    },
    {
      title: "🏢 Provider Dashboard",
      desc: "Logistics providers monitor container utilization, active routes, and booking stats to maximize revenue."
    }
  ]

  return (
    <section className="key-section" id="features">
      <div className="key-header">
        <h2>Smart Container Recommendation Engine</h2>
        <p>
          Rapidrun combines rule-based feasibility checks with machine learning
          intelligence to deliver safe, optimized, and cost-efficient container
          recommendations.
        </p>
      </div>

      <div className="key-grid">
        {features.map((f, i) => (
          <div key={i} className="key-card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

