# Domain Description

The chosen domain is a hotel booking platform. The system allows users to browse hotels in different cities, view available rooms, and create bookings for specific dates.

The platform stores information about cities, hotels, room types, rooms, users, bookings, payments, and reviews. Each hotel belongs to one city, and each hotel contains multiple rooms. Each room has a specific room type, such as Single Room, Standard Double Room, Family Room, or Suite.

Users can create bookings for rooms by choosing check-in and check-out dates. Each booking is connected to one user and one room. A booking also stores its status and total price. After a booking is created, a payment can be recorded for it. Users can also leave reviews for hotels with a rating and comment.

To reconstruct the database schema from this domain, it is important to know that the central process is room booking. The main relationship chain is:

City → Hotel → Room → Booking ← User

Additional entities such as Payment and Review extend this core structure. Payment belongs to a booking, while Review connects a user with a hotel.