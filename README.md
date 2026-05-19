# ArangaTrip — Hotel Booking Database Project

ArangaTrip is a full-stack hotel booking platform created for a database course project.  
The system allows users to browse hotels, search by destination, open detailed hotel pages, create guest profiles, book rooms, create payments, view reviews, and inspect booking analytics.

The main focus of the project is relational database design, SQL schema creation, constraints, valid fake data, analytical SQL queries, indexes, and integration of the database into a working application.

---

## Project Requirements Coverage

### Minimum Requirements

| Requirement | Status |
|---|---|
| Entities description | Done |
| Critical scenarios / common user paths | Done |
| Domain description | Done |
| SQL database schema / DDL | Done |
| DBML schema | Done |
| Database schema image | Done |
| Fake valid data in database | Done |
| 3 SQL queries | Done |
| Indexes / performance optimization | Done |

### Recommended Requirements

| Requirement | Status |
|---|---|
| Working local MVP | Done |
| Frontend + backend + database integration | Done |
| Data updates through the app | Done |
| Recorded demo | To be added |
| Cloud deployment | Optional / not included |

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL

### Design / Documentation
- SQL DDL
- DBML
- dbdiagram.io
- Markdown documentation

---

## Project Structure

```text
hotel-booking-db-project/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── RoomCard.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   └── LoginModal.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Hotels.jsx
│   │       ├── HotelDetails.jsx
│   │       ├── Bookings.jsx
│   │       └── AdminDashboard.jsx
│   └── package.json
│
├── database/
│   ├── schema.sql
│   ├── data.sql
│   ├── queries.sql
│   ├── indexes.sql
│   └── schema.dbml
│
├── docs/
│   ├── domain_description.md
│   ├── entities_description.md
│   ├── critical_scenarios.md
│   └── schema_image.png
│
├── demo/
│
├── .gitignore
└── README.md
```

---

## Domain Description

The chosen domain is a hotel booking platform. Users can browse hotels in different cities, view hotel details, select rooms, create bookings, make payments, and read or leave reviews.

The central process of the system is room booking:

```text
City → Hotel → Room → Booking ← User
```

Additional entities extend this process:

```text
Booking → Payment
Hotel → Review ← User
Room → Room Type
```

To reconstruct the database schema from this description, it is important to know:
- Hotels are located in cities.
- Hotels contain rooms.
- Each room has a room type.
- Users create bookings for rooms.
- Each booking stores dates, status, and total price.
- Each booking can have one payment.
- Users can review hotels.
- Analytical queries are based on joins between hotels, rooms, bookings, and cities.

---

## Main Entities

The database contains:

- `cities`
- `hotels`
- `room_types`
- `rooms`
- `users`
- `bookings`
- `payments`
- `reviews`

---

## Main Relationships

- One city has many hotels.
- One hotel has many rooms.
- One room belongs to one hotel.
- One room has one room type.
- One user can create many bookings.
- One room can have many bookings over time.
- One booking belongs to one user and one room.
- One booking can have one payment.
- One user can write many reviews.
- One hotel can have many reviews.

---

## Database Files

- `database/schema.sql` — SQL DDL for tables, primary keys, foreign keys, constraints, and checks.
- `database/data.sql` — fake but valid data: 10 cities, 20 hotels, 60 rooms, 20 users, 30 bookings, 30 payments, 20 reviews.
- `database/queries.sql` — required analytical SQL queries.
- `database/indexes.sql` — indexes for frequently filtered and joined columns.
- `database/schema.dbml` — DBML schema for dbdiagram.io.

---

## Required SQL Queries

The project answers the required hotel booking SQL tasks:

1. Count the number of bookings per hotel in the last week.
   - Implemented in `database/queries.sql`
   - Also available through `GET /analytics/bookings-per-hotel`

2. Find the average occupancy rate for each hotel in the last month.
   - Implemented in `database/queries.sql`
   - Also available through `GET /analytics/occupancy-rate`

3. List the top 5 cities with the highest number of bookings.
   - Implemented in `database/queries.sql`
   - Also available through `GET /analytics/top-cities`

---

## Application Features

### Frontend Features
- Multi-page React application
- Home page
- Hotels listing page
- Hotel detail page
- Destination search
- Room selection
- Guest login/profile creation
- Booking form
- Automatic payment creation after booking
- Reviews section on hotel detail page
- Bookings page with payment status
- Admin dashboard with analytics

### Backend Features
- FastAPI REST API
- SQLAlchemy models
- PostgreSQL database connection
- CRUD routes for main entities
- Search route for hotels
- Analytics routes for database statistics

### Database Features
- Normalized relational schema
- Primary keys and foreign keys
- Check constraints
- Unique constraints
- Fake valid data
- Analytical queries
- Indexes for optimization

---

## API Endpoints

### Basic
```text
GET /
GET /health
```

### Cities
```text
GET /cities
POST /cities
```

### Hotels
```text
GET /hotels
POST /hotels
GET /hotels/search/?destination=...
GET /hotels/{hotel_id}
GET /hotels/{hotel_id}/rooms
GET /hotels/{hotel_id}/reviews
```

### Room Types
```text
GET /room-types
POST /room-types
```

### Rooms
```text
GET /rooms
POST /rooms
```

### Users
```text
GET /users
POST /users
```

### Bookings
```text
GET /bookings
POST /bookings
```

### Payments
```text
GET /payments
POST /payments
```

### Reviews
```text
GET /reviews
POST /reviews
```

### Analytics
```text
GET /analytics/summary
GET /analytics/bookings-per-hotel
GET /analytics/top-cities
GET /analytics/occupancy-rate
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd hotel-booking-db-project
```

---

## Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/hotel_booking_db
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Database Setup

Create the PostgreSQL database:

```bash
createdb -U postgres hotel_booking_db
```

Load schema:

```bash
psql -U postgres -d hotel_booking_db -f database/schema.sql
```

Load fake data:

```bash
psql -U postgres -d hotel_booking_db -f database/data.sql
```

Load indexes:

```bash
psql -U postgres -d hotel_booking_db -f database/indexes.sql
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## How to Use the App

1. Open the homepage.
2. Go to the hotels page.
3. Search hotels by destination.
4. Open a hotel details page.
5. Login or create a guest profile.
6. Select a room.
7. Create a booking.
8. A payment is created automatically.
9. Open the bookings page to see booking and payment status.
10. Open the admin dashboard to view database analytics.

---

## Demo Flow

A recommended demo should show:

1. Homepage and navigation.
2. Hotels page with destination search.
3. Hotel detail page with gallery, room list, amenities, and reviews.
4. Login / guest profile creation.
5. Room booking.
6. Payment status shown on bookings page.
7. Admin dashboard with real database analytics.
8. FastAPI Swagger documentation.
9. SQL, DBML, and schema files.

---

## MVP Status

The project includes a working local MVP. The frontend communicates with the FastAPI backend, and the backend reads/writes data from PostgreSQL.

The project demonstrates real database updates because creating a booking from the frontend inserts a new row into the `bookings` table and automatically creates a related row in the `payments` table.

---

## Notes

The `.env` file is not included in the repository because it contains the local database password.

The project is designed to run locally and can be extended with cloud deployment using services such as Supabase, Render, Vercel, or Netlify.
