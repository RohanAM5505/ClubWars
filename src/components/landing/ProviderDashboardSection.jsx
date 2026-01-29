import React from "react"

export default function ProviderDashboardSection() {
  return (
    <section className="provider-section" id="resources">
      <div className="provider-grid">
        
        {/* Left Text */}
        <div className="provider-text">
          <h2>
            Provider Dashboard <br /> & Utilization Analytics
          </h2>

          <p>
            Rapidrun helps logistics providers monitor unused container space,
            booking activity, and demand trends through a real-time dashboard.
          </p>

          <ul>
            <li>📊 Track booked vs unused capacity</li>
            <li>🚢 Monitor active routes & shipments</li>
            <li>💰 Improve revenue by filling wasted space</li>
            <li>🤖 ML-based ranking for more reliable choices</li>
          </ul>

          <button
            className="provider-btn"
            onClick={() => alert("Dashboard prototype coming soon!")}
          >
            View Prototype Demo
          </button>
        </div>

        {/* Right Mock Panel */}
        <div className="provider-mock">
          <h3>Container Space Utilization</h3>

          <div className="mock-bar">
            <div className="fill"></div>
          </div>

          <p className="mock-label">
            Up to <b>30% unused space</b> can be optimized
          </p>

          <div className="mock-stats">
            <div>
              <h4>Rule Safe</h4>
              <p>Feasibility Filter</p>
            </div>
            <div>
              <h4>ML Ranked</h4>
              <p>Reliable Options</p>
            </div>
            <div>
              <h4>Shared</h4>
              <p>Partial Booking</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

