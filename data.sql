INSERT INTO users (name, email)
VALUES 
('Alice', 'alice@gmail.com'),
('Bob', 'bob@gmail.com');

INSERT INTO hotels (name, city, address)
VALUES
('Grand Hotel', 'Berlin', 'Street 1'),
('Sea View', 'Hamburg', 'Street 2');

INSERT INTO rooms (hotel_id, room_number, price_per_night)
VALUES
(1, 101, 100),
(1, 102, 120),
(2, 201, 90);

INSERT INTO bookings (user_id, room_id, check_in, check_out, status)
VALUES
(1, 1, '2026-04-10', '2026-04-12', 'confirmed'),
(2, 3, '2026-04-11', '2026-04-13', 'confirmed');