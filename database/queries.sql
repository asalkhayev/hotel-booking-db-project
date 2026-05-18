-- 1. Count the number of bookings per hotel in the last week
SELECT 
    h.id AS hotel_id,
    h.name AS hotel_name,
    COUNT(b.id) AS bookings_count
FROM hotels h
JOIN rooms r ON h.id = r.hotel_id
JOIN bookings b ON r.id = b.room_id
WHERE b.created_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
GROUP BY h.id, h.name
ORDER BY bookings_count DESC;


-- 2. Find the average occupancy rate for each hotel in the last month
SELECT 
    h.id AS hotel_id,
    h.name AS hotel_name,
    COUNT(DISTINCT b.id) AS booked_rooms_count,
    COUNT(DISTINCT r.id) AS total_rooms_count,
    ROUND(
        COUNT(DISTINCT b.id)::numeric / COUNT(DISTINCT r.id) * 100, 
        2
    ) AS occupancy_rate_percent
FROM hotels h
JOIN rooms r ON h.id = r.hotel_id
LEFT JOIN bookings b 
    ON r.id = b.room_id
    AND b.created_at >= CURRENT_TIMESTAMP - INTERVAL '1 month'
GROUP BY h.id, h.name
ORDER BY occupancy_rate_percent DESC;


-- 3. List the top 5 cities with the highest number of bookings
SELECT 
    c.id AS city_id,
    c.name AS city_name,
    c.country,
    COUNT(b.id) AS total_bookings
FROM cities c
JOIN hotels h ON c.id = h.city_id
JOIN rooms r ON h.id = r.hotel_id
JOIN bookings b ON r.id = b.room_id
GROUP BY c.id, c.name, c.country
ORDER BY total_bookings DESC
LIMIT 5;