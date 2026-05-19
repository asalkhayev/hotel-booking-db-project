-- Clear existing data in dependency order
TRUNCATE TABLE reviews, payments, bookings, rooms, room_types, hotels, cities, users
RESTART IDENTITY CASCADE;

-- Cities
INSERT INTO cities (name, country) VALUES
('Bremen', 'Germany'),
('Berlin', 'Germany'),
('Munich', 'Germany'),
('Hamburg', 'Germany'),
('Paris', 'France'),
('Barcelona', 'Spain'),
('Rome', 'Italy'),
('Amsterdam', 'Netherlands'),
('Vienna', 'Austria'),
('Prague', 'Czech Republic');

-- Hotels
INSERT INTO hotels (city_id, name, address, stars, description) VALUES
(1, 'Bremen Central Hotel', 'Bahnhofstraße 10, Bremen', 4, 'Modern hotel near Bremen main station.'),
(1, 'Riverside Bremen Inn', 'Schlachte 22, Bremen', 3, 'Cozy hotel near the Weser river.'),
(2, 'Berlin City Stay', 'Alexanderplatz 5, Berlin', 4, 'Comfortable hotel in central Berlin.'),
(2, 'Urban Loft Berlin', 'Friedrichstraße 88, Berlin', 4, 'Stylish city hotel close to shops and restaurants.'),
(3, 'Munich Grand House', 'Marienplatz 3, Munich', 5, 'Elegant hotel in the heart of Munich.'),
(3, 'Bavaria Comfort Suites', 'Leopoldstraße 45, Munich', 4, 'Comfortable suites for business and leisure.'),
(4, 'Hamburg Harbor Hotel', 'Hafenstraße 12, Hamburg', 4, 'Hotel with harbor views and modern rooms.'),
(4, 'Nordic Stay Hamburg', 'Mönckebergstraße 18, Hamburg', 3, 'Simple and clean stay near the city center.'),
(5, 'Paris Boutique Hotel', 'Rue de Rivoli 18, Paris', 5, 'Luxury boutique hotel close to main attractions.'),
(5, 'Montmartre View Hotel', 'Rue Lepic 21, Paris', 4, 'Charming hotel with artistic atmosphere.'),
(6, 'Barcelona Beach Hotel', 'Passeig Marítim 12, Barcelona', 4, 'Hotel near the beach with sea views.'),
(6, 'Gaudi Garden Stay', 'Carrer de Mallorca 401, Barcelona', 4, 'Bright hotel close to architectural landmarks.'),
(7, 'Roma Classic Hotel', 'Via Nazionale 55, Rome', 4, 'Classic hotel close to historical attractions.'),
(7, 'Colosseum Suites', 'Via Labicana 20, Rome', 5, 'Premium suites near the Colosseum.'),
(8, 'Amsterdam Canal Stay', 'Prinsengracht 75, Amsterdam', 4, 'Canal-side hotel with cozy interiors.'),
(8, 'Dutch Design Hotel', 'Damrak 40, Amsterdam', 4, 'Modern design hotel in the city center.'),
(9, 'Vienna Imperial Hotel', 'Ringstraße 9, Vienna', 5, 'Luxury hotel inspired by Viennese elegance.'),
(9, 'Wien City Rooms', 'Mariahilfer Straße 66, Vienna', 3, 'Affordable and comfortable city hotel.'),
(10, 'Prague Old Town Hotel', 'Old Town Square 7, Prague', 4, 'Historic hotel in Prague Old Town.'),
(10, 'Bohemian Stay Prague', 'Nerudova 14, Prague', 4, 'Boutique stay with local character.');

-- Room types
INSERT INTO room_types (name, capacity, description) VALUES
('Single Room', 1, 'Room for one guest with one single bed.'),
('Standard Double Room', 2, 'Comfortable room for two guests with one double bed.'),
('Twin Room', 2, 'Room for two guests with two separate beds.'),
('Family Room', 4, 'Large room suitable for families.'),
('Suite', 3, 'Premium room with extra space and luxury facilities.');

-- Rooms: 3 rooms per hotel = 60 rooms
INSERT INTO rooms (hotel_id, room_type_id, room_number, price_per_night, is_available) VALUES
(1, 1, '101', 69.99, TRUE), (1, 2, '102', 89.99, TRUE), (1, 5, '201', 180.00, TRUE),
(2, 1, '11', 59.99, TRUE), (2, 3, '12', 75.00, TRUE), (2, 4, '21', 130.00, TRUE),
(3, 2, '301', 120.00, TRUE), (3, 4, '305', 160.00, TRUE), (3, 5, '401', 220.00, TRUE),
(4, 1, '101', 95.00, TRUE), (4, 2, '102', 125.00, TRUE), (4, 5, '501', 240.00, TRUE),
(5, 2, '201', 155.00, TRUE), (5, 4, '210', 210.00, TRUE), (5, 5, '301', 310.00, TRUE),
(6, 1, '15', 105.00, TRUE), (6, 2, '16', 135.00, TRUE), (6, 3, '17', 145.00, TRUE),
(7, 2, '101', 110.00, TRUE), (7, 4, '202', 190.00, TRUE), (7, 5, '303', 270.00, TRUE),
(8, 1, '41', 80.00, TRUE), (8, 2, '42', 105.00, TRUE), (8, 3, '43', 115.00, TRUE),
(9, 2, '501', 180.00, TRUE), (9, 5, '601', 390.00, TRUE), (9, 4, '602', 260.00, TRUE),
(10, 1, '21', 130.00, TRUE), (10, 2, '22', 170.00, TRUE), (10, 5, '31', 320.00, TRUE),
(11, 2, '101', 145.00, TRUE), (11, 4, '202', 230.00, TRUE), (11, 5, '303', 340.00, TRUE),
(12, 1, '10', 115.00, TRUE), (12, 2, '20', 155.00, TRUE), (12, 4, '30', 240.00, TRUE),
(13, 2, '101', 140.00, TRUE), (13, 3, '102', 150.00, TRUE), (13, 5, '201', 310.00, TRUE),
(14, 2, '301', 190.00, TRUE), (14, 4, '401', 260.00, TRUE), (14, 5, '501', 420.00, TRUE),
(15, 1, '7', 120.00, TRUE), (15, 2, '8', 160.00, TRUE), (15, 3, '9', 170.00, TRUE),
(16, 2, '110', 150.00, TRUE), (16, 4, '210', 225.00, TRUE), (16, 5, '310', 300.00, TRUE),
(17, 2, '101', 210.00, TRUE), (17, 4, '202', 310.00, TRUE), (17, 5, '303', 520.00, TRUE),
(18, 1, '31', 85.00, TRUE), (18, 2, '32', 110.00, TRUE), (18, 3, '33', 125.00, TRUE),
(19, 2, '101', 125.00, TRUE), (19, 4, '201', 200.00, TRUE), (19, 5, '301', 290.00, TRUE),
(20, 1, '12', 100.00, TRUE), (20, 2, '14', 135.00, TRUE), (20, 4, '16', 210.00, TRUE);

-- Users
INSERT INTO users (full_name, email, phone) VALUES
('Ayan Salkhayeva', 'ayan@example.com', '+491234567890'),
('Leyla Mammadova', 'leyla@example.com', '+491111111111'),
('Nigar Abdullayeva', 'nigar@example.com', '+492222222222'),
('Sehri Nuriyeva', 'sehri@example.com', '+493333333333'),
('Sara Smith', 'sara@example.com', '+494444444444'),
('Emma Brown', 'emma@example.com', '+495555555555'),
('Noah Miller', 'noah@example.com', '+496666666666'),
('Mia Garcia', 'mia@example.com', '+497777777777'),
('Luca Rossi', 'luca@example.com', '+498888888888'),
('Sofia Novak', 'sofia@example.com', '+499999999999'),
('Anna Weber', 'anna@example.com', '+491010101010'),
('Mark Johnson', 'mark@example.com', '+491212121212'),
('Elena Petrova', 'elena@example.com', '+491313131313'),
('David Lee', 'david@example.com', '+491414141414'),
('Laura Schmidt', 'laura@example.com', '+491515151515'),
('Omar Hassan', 'omar@example.com', '+491616161616'),
('Julia Meyer', 'julia@example.com', '+491717171717'),
('Daniel Kim', 'daniel@example.com', '+491818181818'),
('Maria Silva', 'maria@example.com', '+491919191919'),
('Adam Nowak', 'adam@example.com', '+492020202020');

-- Bookings
INSERT INTO bookings (user_id, room_id, check_in, check_out, status, total_price, created_at) VALUES
(1, 1, '2026-05-20', '2026-05-23', 'confirmed', 209.97, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(2, 3, '2026-05-18', '2026-05-21', 'confirmed', 540.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(3, 5, '2026-04-28', '2026-05-02', 'completed', 300.00, CURRENT_TIMESTAMP - INTERVAL '20 days'),
(4, 8, '2026-05-10', '2026-05-15', 'completed', 800.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(5, 10, '2026-05-25', '2026-05-28', 'confirmed', 285.00, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(6, 12, '2026-05-22', '2026-05-24', 'confirmed', 480.00, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(7, 14, '2026-05-12', '2026-05-14', 'completed', 420.00, CURRENT_TIMESTAMP - INTERVAL '9 days'),
(8, 16, '2026-05-19', '2026-05-22', 'confirmed', 315.00, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(9, 18, '2026-05-21', '2026-05-26', 'confirmed', 725.00, CURRENT_TIMESTAMP - INTERVAL '6 days'),
(10, 20, '2026-05-15', '2026-05-18', 'completed', 570.00, CURRENT_TIMESTAMP - INTERVAL '12 days'),
(11, 22, '2026-05-17', '2026-05-19', 'completed', 160.00, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(12, 24, '2026-05-24', '2026-05-27', 'confirmed', 345.00, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(13, 26, '2026-05-11', '2026-05-13', 'completed', 780.00, CURRENT_TIMESTAMP - INTERVAL '13 days'),
(14, 28, '2026-05-20', '2026-05-22', 'confirmed', 260.00, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(15, 30, '2026-05-23', '2026-05-25', 'confirmed', 640.00, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(16, 32, '2026-05-13', '2026-05-16', 'completed', 690.00, CURRENT_TIMESTAMP - INTERVAL '11 days'),
(17, 34, '2026-05-26', '2026-05-28', 'confirmed', 230.00, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(18, 36, '2026-05-18', '2026-05-20', 'completed', 480.00, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(19, 38, '2026-05-14', '2026-05-17', 'completed', 450.00, CURRENT_TIMESTAMP - INTERVAL '14 days'),
(20, 40, '2026-05-21', '2026-05-24', 'confirmed', 930.00, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(1, 42, '2026-05-16', '2026-05-18', 'completed', 620.00, CURRENT_TIMESTAMP - INTERVAL '9 days'),
(2, 44, '2026-05-27', '2026-05-30', 'confirmed', 360.00, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(3, 46, '2026-05-19', '2026-05-21', 'confirmed', 320.00, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(4, 48, '2026-05-12', '2026-05-15', 'completed', 510.00, CURRENT_TIMESTAMP - INTERVAL '15 days'),
(5, 50, '2026-05-21', '2026-05-23', 'confirmed', 620.00, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(6, 52, '2026-05-22', '2026-05-24', 'confirmed', 170.00, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(7, 54, '2026-05-15', '2026-05-17', 'completed', 250.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(8, 56, '2026-05-28', '2026-05-31', 'confirmed', 375.00, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(9, 58, '2026-05-17', '2026-05-19', 'completed', 400.00, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(10, 60, '2026-05-25', '2026-05-27', 'confirmed', 420.00, CURRENT_TIMESTAMP - INTERVAL '2 days');

-- Payments
INSERT INTO payments (booking_id, amount, payment_method, status)
SELECT id, total_price, 
       CASE WHEN id % 3 = 0 THEN 'paypal'
            WHEN id % 3 = 1 THEN 'card'
            ELSE 'bank_transfer'
       END,
       'paid'
FROM bookings;

-- Reviews
INSERT INTO reviews (user_id, hotel_id, rating, comment) VALUES
(1, 1, 5, 'Great location, clean room, and friendly staff.'),
(2, 1, 4, 'Good hotel near the station.'),
(3, 2, 4, 'Nice and affordable place.'),
(4, 4, 5, 'Excellent city hotel with comfortable rooms.'),
(5, 5, 5, 'Beautiful interior and premium service.'),
(6, 6, 4, 'Good value and quiet rooms.'),
(7, 7, 5, 'Amazing harbor view.'),
(8, 8, 3, 'Simple but clean.'),
(9, 9, 5, 'Perfect stay in Paris.'),
(10, 10, 4, 'Charming hotel and nice staff.'),
(11, 11, 5, 'Loved the beach location.'),
(12, 12, 4, 'Beautiful design and comfortable stay.'),
(13, 13, 4, 'Very convenient location.'),
(14, 14, 5, 'Luxury experience near the Colosseum.'),
(15, 15, 4, 'Cozy hotel by the canal.'),
(16, 16, 5, 'Modern and stylish rooms.'),
(17, 17, 5, 'Elegant hotel with excellent service.'),
(18, 18, 3, 'Affordable and practical.'),
(19, 19, 4, 'Great location in Old Town.'),
(20, 20, 4, 'Nice boutique atmosphere.');