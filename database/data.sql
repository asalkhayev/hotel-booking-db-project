INSERT INTO cities (name, country) VALUES
('Bremen', 'Germany'),
('Berlin', 'Germany'),
('Paris', 'France'),
('Barcelona', 'Spain');

INSERT INTO hotels (city_id, name, address, stars, description) VALUES
(1, 'Bremen Central Hotel', 'Bahnhofstraße 10, Bremen', 4, 'Modern hotel near Bremen main station.'),
(1, 'Riverside Bremen Inn', 'Schlachte 22, Bremen', 3, 'Cozy hotel near the Weser river.'),
(2, 'Berlin City Stay', 'Alexanderplatz 5, Berlin', 4, 'Comfortable hotel in central Berlin.'),
(3, 'Paris Boutique Hotel', 'Rue de Rivoli 18, Paris', 5, 'Luxury boutique hotel close to main attractions.'),
(4, 'Barcelona Beach Hotel', 'Passeig Marítim 12, Barcelona', 4, 'Hotel near the beach with sea views.');

INSERT INTO room_types (name, capacity, description) VALUES
('Single Room', 1, 'Room for one guest with one single bed.'),
('Standard Double Room', 2, 'Comfortable room for two guests with one double bed.'),
('Twin Room', 2, 'Room for two guests with two separate beds.'),
('Family Room', 4, 'Large room suitable for families.'),
('Suite', 3, 'Premium room with extra space and luxury facilities.');

INSERT INTO rooms (hotel_id, room_type_id, room_number, price_per_night, is_available) VALUES
(1, 2, '101', 89.99, TRUE),
(1, 2, '102', 95.00, TRUE),
(1, 5, '201', 180.00, TRUE),
(2, 1, '11', 59.99, TRUE),
(2, 3, '12', 75.00, TRUE),
(3, 2, '301', 120.00, TRUE),
(3, 4, '305', 160.00, TRUE),
(4, 5, '501', 250.00, TRUE),
(4, 2, '402', 140.00, TRUE),
(5, 4, '210', 190.00, TRUE);

INSERT INTO users (full_name, email, phone) VALUES
('Ayan Salkhayeva', 'ayan@example.com', '+491234567890'),
('Leyla Mammadova', 'leyla@example.com', '+491111111111'),
('Nigar Abdullayeva', 'nigar@example.com', '+492222222222'),
('Ali Karimov', 'ali@example.com', '+493333333333'),
('Sara Smith', 'sara@example.com', '+494444444444');

INSERT INTO bookings (user_id, room_id, check_in, check_out, status, total_price, created_at) VALUES
(1, 1, '2026-05-20', '2026-05-23', 'confirmed', 269.97, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(2, 3, '2026-05-18', '2026-05-21', 'confirmed', 540.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(3, 5, '2026-04-28', '2026-05-02', 'completed', 300.00, CURRENT_TIMESTAMP - INTERVAL '20 days'),
(4, 8, '2026-05-10', '2026-05-15', 'completed', 1250.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(5, 10, '2026-05-25', '2026-05-28', 'confirmed', 570.00, CURRENT_TIMESTAMP - INTERVAL '1 day');

INSERT INTO payments (booking_id, amount, payment_method, status) VALUES
(1, 269.97, 'card', 'paid'),
(2, 540.00, 'paypal', 'paid'),
(3, 300.00, 'card', 'paid'),
(4, 1250.00, 'bank_transfer', 'paid'),
(5, 570.00, 'card', 'paid');

INSERT INTO reviews (user_id, hotel_id, rating, comment) VALUES
(1, 1, 5, 'Great location, clean room, and friendly staff.'),
(2, 1, 4, 'Good hotel near the station.'),
(3, 2, 4, 'Nice and affordable place.'),
(4, 4, 5, 'Excellent luxury experience.'),
(5, 5, 5, 'Beautiful beach view and comfortable room.');