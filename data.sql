INSERT INTO users (name, email, password)
VALUES
('Alice Johnson', 'alice@example.com', 'alice123'),
('Bob Smith', 'bob@example.com', 'bob123');

INSERT INTO hotels (name, city, address, rating)
VALUES
('Grand Hotel', 'Berlin', 'Street 1', 4.5),
('Sea View', 'Hamburg', 'Street 2', 4.2);

INSERT INTO rooms (hotel_id, room_number, price_per_night, capacity)
VALUES
(1, 101, 100.00, 2),
(1, 102, 120.00, 3),
(2, 201, 90.00, 2);

INSERT INTO bookings (user_id, room_id, check_in, check_out, status)
VALUES
(1, 1, '2026-05-10', '2026-05-12', 'confirmed'),
(2, 3, '2026-05-11', '2026-05-14', 'pending');