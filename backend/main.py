from typing import List

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

import crud
import models
import schemas
from database import Base, engine, get_db

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Hotel Booking Platform API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Hotel Booking API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/cities", response_model=List[schemas.City])
def read_cities(db: Session = Depends(get_db)):
    return crud.get_cities(db)


@app.post("/cities", response_model=schemas.City)
def create_city(city: schemas.CityCreate, db: Session = Depends(get_db)):
    return crud.create_city(db, city)


@app.get("/room-types", response_model=List[schemas.RoomType])
def read_room_types(db: Session = Depends(get_db)):
    return crud.get_room_types(db)


@app.post("/room-types", response_model=schemas.RoomType)
def create_room_type(room_type: schemas.RoomTypeCreate, db: Session = Depends(get_db)):
    return crud.create_room_type(db, room_type)


@app.get("/hotels", response_model=List[schemas.Hotel])
def read_hotels(db: Session = Depends(get_db)):
    return crud.get_hotels(db)


@app.post("/hotels", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    return crud.create_hotel(db, hotel)


@app.get("/hotels/{hotel_id}", response_model=schemas.Hotel)
def read_hotel(hotel_id: int, db: Session = Depends(get_db)):
    return crud.get_hotel(db, hotel_id)


@app.get("/hotels/{hotel_id}/rooms", response_model=List[schemas.Room])
def read_rooms_by_hotel(hotel_id: int, db: Session = Depends(get_db)):
    return crud.get_rooms_by_hotel(db, hotel_id)


@app.get("/rooms", response_model=List[schemas.Room])
def read_rooms(db: Session = Depends(get_db)):
    return crud.get_rooms(db)


@app.post("/rooms", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db, room)


@app.get("/users", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)


@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@app.get("/bookings", response_model=List[schemas.Booking])
def read_bookings(db: Session = Depends(get_db)):
    return crud.get_bookings(db)


@app.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db, booking)


@app.get("/payments", response_model=List[schemas.Payment])
def read_payments(db: Session = Depends(get_db)):
    return crud.get_payments(db)


@app.post("/payments", response_model=schemas.Payment)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return crud.create_payment(db, payment)


@app.get("/reviews", response_model=List[schemas.Review])
def read_reviews(db: Session = Depends(get_db)):
    return crud.get_reviews(db)


@app.post("/reviews", response_model=schemas.Review)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    return crud.create_review(db, review)