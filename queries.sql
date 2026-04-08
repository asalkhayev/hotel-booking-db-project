-- Query 1: bookings per hotel
SELECT h.name, COUNT(b.id) AS total_bookings
FROM hotels h
JOIN rooms r ON h.id = r.hotel_id
JOIN bookings b ON r.id = b.room_id
GROUP BY h.name;

-- Query 2: average room price per hotel
SELECT h.name, AVG(r.price_per_night) AS avg_price
FROM hotels h
JOIN rooms r ON h.id = r.hotel_id
GROUP BY h.name;

-- Query 3: bookings per city
SELECT h.city, COUNT(b.id) AS total_bookings
FROM hotels h
JOIN rooms r ON h.id = r.hotel_id
JOIN bookings b ON r.id = b.room_id
GROUP BY h.city
ORDER BY total_bookings DESC;