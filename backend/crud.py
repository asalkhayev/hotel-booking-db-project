from sqlalchemy.orm import Session

import models
import schemas


def get_cities(db: Session):
    return db.query(models.City).all()


def create_city(db: Session, city: schemas.CityCreate):
    db_city = models.City(**city.model_dump())
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city


def get_room_types(db: Session):
    return db.query(models.RoomType).all()


def create_room_type(db: Session, room_type: schemas.RoomTypeCreate):
    db_room_type = models.RoomType(**room_type.model_dump())
    db.add(db_room_type)
    db.commit()
    db.refresh(db_room_type)
    return db_room_type


def get_hotels(db: Session):
    return db.query(models.Hotel).all()


def get_hotel(db: Session, hotel_id: int):
    return db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()


def create_hotel(db: Session, hotel: schemas.HotelCreate):
    db_hotel = models.Hotel(**hotel.model_dump())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel


def get_rooms(db: Session):
    return db.query(models.Room).all()


def get_rooms_by_hotel(db: Session, hotel_id: int):
    return db.query(models.Room).filter(models.Room.hotel_id == hotel_id).all()


def create_room(db: Session, room: schemas.RoomCreate):
    db_room = models.Room(**room.model_dump())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room


def get_users(db: Session):
    return db.query(models.User).all()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        return existing_user

    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_bookings(db: Session):
    return db.query(models.Booking).all()


def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def get_payments(db: Session):
    return db.query(models.Payment).all()


def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.model_dump())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment


def get_reviews(db: Session):
    return db.query(models.Review).all()


def create_review(db: Session, review: schemas.ReviewCreate):
    db_review = models.Review(**review.model_dump())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review