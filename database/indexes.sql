-- Indexes for foreign keys and frequently filtered columns

CREATE INDEX idx_hotels_city_id ON hotels(city_id);

CREATE INDEX idx_rooms_hotel_id ON rooms(hotel_id);
CREATE INDEX idx_rooms_room_type_id ON rooms(room_type_id);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_check_in_check_out ON bookings(check_in, check_out);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);

CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_hotel_id ON reviews(hotel_id);

CREATE INDEX idx_users_email ON users(email);