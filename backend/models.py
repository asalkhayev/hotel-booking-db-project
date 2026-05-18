from sqlalchemy import Column, Integer, String, Text, Numeric, Date, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)

    hotels = relationship("Hotel", back_populates="city")


class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String(150), nullable=False)
    address = Column(String(255), nullable=False)
    stars = Column(Integer, nullable=False)
    description = Column(Text)

    city = relationship("City", back_populates="hotels")
    rooms = relationship("Room", back_populates="hotel")
    reviews = relationship("Review", back_populates="hotel")


class RoomType(Base):
    __tablename__ = "room_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    description = Column(Text)

    rooms = relationship("Room", back_populates="room_type")


class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"), nullable=False)
    room_type_id = Column(Integer, ForeignKey("room_types.id"), nullable=False)
    room_number = Column(String(20), nullable=False)
    price_per_night = Column(Numeric(10, 2), nullable=False)
    is_available = Column(Boolean, default=True)

    hotel = relationship("Hotel", back_populates="rooms")
    room_type = relationship("RoomType", back_populates="rooms")
    bookings = relationship("Booking", back_populates="room")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(30))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    bookings = relationship("Booking", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    status = Column(String(30), nullable=False, default="confirmed")
    total_price = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")
    payment = relationship("Payment", back_populates="booking", uselist=False)


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), unique=True, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(50), nullable=False)
    status = Column(String(30), nullable=False, default="paid")
    paid_at = Column(DateTime(timezone=True), server_default=func.now())

    booking = relationship("Booking", back_populates="payment")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hotel_id = Column(Integer, ForeignKey("hotels.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="reviews")
    hotel = relationship("Hotel", back_populates="reviews")