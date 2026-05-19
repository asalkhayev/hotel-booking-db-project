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

from sqlalchemy import func


def get_analytics_summary(db: Session):
    total_hotels = db.query(models.Hotel).count()
    total_rooms = db.query(models.Room).count()
    total_users = db.query(models.User).count()
    total_bookings = db.query(models.Booking).count()

    total_revenue = db.query(func.coalesce(func.sum(models.Booking.total_price), 0)).scalar()

    return {
        "total_hotels": total_hotels,
        "total_rooms": total_rooms,
        "total_users": total_users,
        "total_bookings": total_bookings,
        "total_revenue": float(total_revenue),
    }


def get_bookings_per_hotel(db: Session):
    results = (
        db.query(
            models.Hotel.id.label("hotel_id"),
            models.Hotel.name.label("hotel_name"),
            func.count(models.Booking.id).label("bookings_count"),
        )
        .join(models.Room, models.Room.hotel_id == models.Hotel.id)
        .outerjoin(models.Booking, models.Booking.room_id == models.Room.id)
        .group_by(models.Hotel.id, models.Hotel.name)
        .order_by(func.count(models.Booking.id).desc())
        .all()
    )

    return [
        {
            "hotel_id": row.hotel_id,
            "hotel_name": row.hotel_name,
            "bookings_count": row.bookings_count,
        }
        for row in results
    ]


def get_top_cities(db: Session):
    results = (
        db.query(
            models.City.id.label("city_id"),
            models.City.name.label("city_name"),
            models.City.country.label("country"),
            func.count(models.Booking.id).label("total_bookings"),
        )
        .join(models.Hotel, models.Hotel.city_id == models.City.id)
        .join(models.Room, models.Room.hotel_id == models.Hotel.id)
        .outerjoin(models.Booking, models.Booking.room_id == models.Room.id)
        .group_by(models.City.id, models.City.name, models.City.country)
        .order_by(func.count(models.Booking.id).desc())
        .limit(5)
        .all()
    )

    return [
        {
            "city_id": row.city_id,
            "city_name": row.city_name,
            "country": row.country,
            "total_bookings": row.total_bookings,
        }
        for row in results
    ]


def get_occupancy_rate(db: Session):
    results = (
        db.query(
            models.Hotel.id.label("hotel_id"),
            models.Hotel.name.label("hotel_name"),
            func.count(func.distinct(models.Room.id)).label("total_rooms"),
            func.count(func.distinct(models.Booking.room_id)).label("booked_rooms"),
        )
        .join(models.Room, models.Room.hotel_id == models.Hotel.id)
        .outerjoin(models.Booking, models.Booking.room_id == models.Room.id)
        .group_by(models.Hotel.id, models.Hotel.name)
        .all()
    )

    data = []

    for row in results:
        occupancy_rate = 0

        if row.total_rooms > 0:
            occupancy_rate = round((row.booked_rooms / row.total_rooms) * 100, 2)

        data.append(
            {
                "hotel_id": row.hotel_id,
                "hotel_name": row.hotel_name,
                "total_rooms": row.total_rooms,
                "booked_rooms": row.booked_rooms,
                "occupancy_rate": occupancy_rate,
            }
        )

    return data

def get_reviews_by_hotel(db: Session, hotel_id: int):
    return db.query(models.Review).filter(models.Review.hotel_id == hotel_id).all()

def search_hotels(db: Session, destination: str = ""):
    query = db.query(models.Hotel)

    if destination:
        search = f"%{destination}%"
        query = (
            query
            .join(models.City, models.Hotel.city_id == models.City.id)
            .filter(
                (models.Hotel.name.ilike(search)) |
                (models.Hotel.address.ilike(search)) |
                (models.City.name.ilike(search)) |
                (models.City.country.ilike(search))
            )
        )

    return query.all()