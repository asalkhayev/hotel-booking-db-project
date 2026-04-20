CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(100),
    address VARCHAR(200),
    rating NUMERIC(2,1)
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    room_number INTEGER,
    price_per_night NUMERIC(10,2),
    capacity INTEGER,
    CONSTRAINT rooms_hotel_id_fkey
        FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    check_in DATE,
    check_out DATE,
    status VARCHAR(50),
    CONSTRAINT bookings_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT bookings_room_id_fkey
        FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_rooms_hotel_id ON rooms(hotel_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);