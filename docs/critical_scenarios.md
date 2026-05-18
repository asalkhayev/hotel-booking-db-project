# Critical Scenarios

## Scenario 1: User browses hotels

1. User opens the hotel booking platform.
2. The frontend sends a request to the backend.
3. The backend retrieves hotels from the database.
4. The user sees a list of hotels with names, addresses, star ratings, and descriptions.

Related tables:
- cities
- hotels

## Scenario 2: User views rooms in a hotel

1. User selects a hotel.
2. The frontend requests rooms for the selected hotel.
3. The backend queries rooms connected to that hotel.
4. The user sees room numbers, room types, prices, and availability.

Related tables:
- hotels
- rooms
- room_types

## Scenario 3: User creates a booking

1. User chooses a room.
2. User enters check-in and check-out dates.
3. The frontend sends booking data to the backend.
4. The backend creates a new booking in the database.
5. The booking is connected to the selected user and room.
6. The database stores the booking status and total price.

Related tables:
- users
- rooms
- bookings

## Scenario 4: User pays for booking

1. User confirms the booking.
2. Payment information is sent to the backend.
3. The backend records payment data.
4. The payment is linked to the booking.

Related tables:
- bookings
- payments

## Scenario 5: User writes a review

1. User chooses a hotel after their stay.
2. User gives a rating and writes a comment.
3. The backend saves the review.
4. The review is linked to both the user and the hotel.

Related tables:
- users
- hotels
- reviews