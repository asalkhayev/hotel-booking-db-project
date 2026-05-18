# Entities Description

## City

Stores information about cities where hotels are located.

Fields:
- id: unique identifier
- name: city name
- country: country name

Relationship:
- One city can have many hotels.

## Hotel

Stores information about hotels.

Fields:
- id: unique identifier
- city_id: reference to the city
- name: hotel name
- address: hotel address
- stars: hotel rating from 1 to 5
- description: short hotel description

Relationship:
- One hotel belongs to one city.
- One hotel can have many rooms.
- One hotel can have many reviews.

## Room Type

Stores categories of rooms.

Fields:
- id: unique identifier
- name: room type name
- capacity: maximum number of guests
- description: room type description

Relationship:
- One room type can be used by many rooms.

## Room

Stores individual hotel rooms.

Fields:
- id: unique identifier
- hotel_id: reference to the hotel
- room_type_id: reference to the room type
- room_number: room number inside the hotel
- price_per_night: room price per night
- is_available: availability status

Relationship:
- One room belongs to one hotel.
- One room has one room type.
- One room can have many bookings over time.

## User

Stores customer information.

Fields:
- id: unique identifier
- full_name: customer full name
- email: unique customer email
- phone: customer phone number
- created_at: registration timestamp

Relationship:
- One user can have many bookings.
- One user can write many reviews.

## Booking

Stores room reservation information.

Fields:
- id: unique identifier
- user_id: reference to the user
- room_id: reference to the room
- check_in: arrival date
- check_out: departure date
- status: booking status
- total_price: full booking price
- created_at: booking creation timestamp

Relationship:
- One booking belongs to one user.
- One booking belongs to one room.
- One booking can have one payment.

## Payment

Stores payment information for bookings.

Fields:
- id: unique identifier
- booking_id: reference to booking
- amount: payment amount
- payment_method: method of payment
- status: payment status
- paid_at: payment timestamp

Relationship:
- One payment belongs to one booking.

## Review

Stores user reviews for hotels.

Fields:
- id: unique identifier
- user_id: reference to user
- hotel_id: reference to hotel
- rating: rating from 1 to 5
- comment: review text
- created_at: review creation timestamp

Relationship:
- One review belongs to one user.
- One review belongs to one hotel.