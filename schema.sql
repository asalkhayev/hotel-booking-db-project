CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(100),
    address VARCHAR(200)
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER,
    room_number INTEGER,
    price_per_night NUMERIC,
    CONSTRAINT rooms_hotel_id_fkey
        FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    room_id INTEGER,
    check_in DATE,
    check_out DATE,
    status VARCHAR(50),
    CONSTRAINT bookings_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT bookings_room_id_fkey
        FOREIGN KEY (room_id) REFERENCES rooms(id)
);