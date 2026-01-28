import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas, crud, ml


# -----------------------------
# APP INITIALIZATION
# -----------------------------
app = FastAPI(title="Smart Logistics Backend")


# -----------------------------
# CORS CONFIGURATION
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://teamsrmhackathon.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# DATABASE INIT (SAFE)
# -----------------------------
# NOTE: Avoid auto-creating tables in production
if os.getenv("ENV") != "production":
    models.Base.metadata.create_all(bind=engine)


# -----------------------------
# DATABASE DEPENDENCY
# -----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/")
def health_check():
    return {"status": "Smart Logistics Backend running"}


# -----------------------------
# OPTIMIZE CONTAINER SELECTION
# -----------------------------
@app.post("/recommend", response_model=list[schemas.ContainerResponse])
def recommend(
    req: schemas.ShipmentRequest,
    db: Session = Depends(get_db)
):
    containers = crud.get_feasible_containers(
        db,
        req.origin,
        req.destination,
        req.departure_date,
        req.volume
    )

    results = []

    for c in containers:
        reliability = ml.predict_reliability()
        available = c.total_capacity - c.booked_capacity

        cost_score = 1 - (c.cost / 2000)
        capacity_score = available / c.total_capacity

        final_score = (
            0.6 * reliability +
            0.3 * cost_score +
            0.1 * capacity_score
        )

        results.append({
            "container_id": c.id,
            "available_capacity": available,
            "reliability_score": reliability,
            "cost": c.cost,
            "final_score": round(final_score, 4)
        })

    results.sort(key=lambda x: x["final_score"], reverse=True)
    return results


# -----------------------------
# RESERVE SPACE
# -----------------------------
@app.post("/reserve")
def reserve(
    req: schemas.ReservationRequest,
    db: Session = Depends(get_db)
):
    booking = crud.reserve_space(
        db,
        req.container_id,
        req.volume
    )

    if not booking:
        return {
            "status": "failed",
            "reason": "Insufficient capacity"
        }

    return {
        "status": "success",
        "booking_id": booking.id,
        "container_id": booking.container_id
    }


# -----------------------------
# BOOKING HISTORY
# -----------------------------
@app.get("/bookings", response_model=list[schemas.BookingResponse])
def booking_history(db: Session = Depends(get_db)):
    return db.query(models.Booking).all()


# -----------------------------
# PROVIDER DASHBOARD
# -----------------------------
@app.get(
    "/provider/dashboard",
    response_model=list[schemas.ProviderContainerResponse]
)
def provider_dashboard(db: Session = Depends(get_db)):
    containers = db.query(models.Container).all()
    response = []

    for c in containers:
        utilization = (
            c.booked_capacity / c.total_capacity
        ) * 100 if c.total_capacity else 0

        response.append({
            "container_id": c.id,
            "route": f"{c.origin} → {c.destination}",
            "total_capacity": c.total_capacity,
            "booked_capacity": c.booked_capacity,
            "utilization_percent": round(utilization, 2),
            "cost": c.cost
        })

    return response
