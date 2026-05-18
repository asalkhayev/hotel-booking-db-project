from datetime import date, datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, EmailStr


class CityBase(BaseModel):
    name: str
    country: str


class CityCreate(CityBase):
    pass


class City(CityBase):
    id: int

    class Config:
        from_attributes = True


class HotelBase(BaseModel):
    city_id: int
    name: str
    address: str
    stars: int
    description: Optional[str] = None


class HotelCreate(HotelBase):
    pass


class Hotel(HotelBase):
    id: int

    class Config:
        from_attributes = True


class RoomTypeBase(BaseModel):
    name: str
    capacity: int
    description: Optional[str] = None


class RoomTypeCreate(RoomTypeBase):
    pass


class RoomType(RoomTypeBase):
    id: int

    class Config:
        from_attributes = True


class RoomBase(BaseModel):
    hotel_id: int
    room_type_id: int
    room_number: str
    price_per_night: Decimal
    is_available: bool = True


class RoomCreate(RoomBase):
    pass


class Room(RoomBase):
    id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class BookingBase(BaseModel):
    user_id: int
    room_id: int
    check_in: date
    check_out: date
    status: str = "confirmed"
    total_price: Decimal


class BookingCreate(BookingBase):
    pass


class Booking(BookingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class PaymentBase(BaseModel):
    booking_id: int
    amount: Decimal
    payment_method: str
    status: str = "paid"


class PaymentCreate(PaymentBase):
    pass


class Payment(PaymentBase):
    id: int
    paid_at: datetime

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    user_id: int
    hotel_id: int
    rating: int
    comment: Optional[str] = None


class ReviewCreate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True