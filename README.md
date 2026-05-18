# Hotel Booking Database Project

## Project Overview

This project is a hotel booking platform built for a database course project.  
The application allows users to browse hotels, view rooms, create bookings, record payments, and leave hotel reviews.

The project focuses on database design, SQL schema creation, relational constraints, queries, indexes, and integration with a working local MVP.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript

### Backend
- Python
- FastAPI
- SQLAlchemy

### Database
- PostgreSQL

### Documentation and Design
- SQL DDL
- DBML
- dbdiagram.io schema image

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
└── README.md
```

## Main Entities

The database contains the following entities:

- cities
- hotels
- room_types
- rooms
- users
- bookings
- payments
- reviews

## Main Relationships

- One city has many hotels.
- One hotel has many rooms.
- One room has one room type.
- One user can create many bookings.
- One room can have many bookings over time.
- One booking can have one payment.
- One user can write many reviews.
- One hotel can have many reviews.

## Critical User Scenarios

### 1. Browse hotels

A user can view hotels from different cities.

### 2. View hotel rooms

A user can choose a hotel and see rooms belonging to that hotel.

### 3. Create booking

A user can book a room by selecting check-in and check-out dates.

### 4. Record payment

A payment can be connected to a booking.

### 5. Leave review

A user can leave a rating and comment for a hotel.

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create and activate virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Database Setup

Create PostgreSQL database:

```bash
createdb -U postgres hotel_booking_db
```

The backend uses the database connection from:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/hotel_booking_db
```

## Required SQL Files

The project includes:

- `database/schema.sql` — database schema with tables and constraints
- `database/data.sql` — fake but valid data
- `database/queries.sql` — required analytical SQL queries
- `database/indexes.sql` — indexes for optimization
- `database/schema.dbml` — DBML schema for dbdiagram.io

## Required Queries

The project answers the following SQL tasks:

1. Count the number of bookings per hotel in the last week.
2. Find the average occupancy rate for each hotel in the last month.
3. List the top 5 cities with the highest number of bookings.

## API Endpoints

Main backend endpoints:

```text
GET /cities
POST /cities

GET /hotels
POST /hotels
GET /hotels/{hotel_id}
GET /hotels/{hotel_id}/rooms

GET /room-types
POST /room-types

GET /rooms
POST /rooms

GET /users
POST /users

GET /bookings
POST /bookings

GET /payments
POST /payments

GET /reviews
POST /reviews
```

## MVP Status

The current MVP supports:

- Creating cities
- Creating room types
- Creating hotels
- Creating rooms
- Creating users
- Creating bookings
- Creating payments
- Creating reviews
- Viewing stored data through FastAPI Swagger UI

This proves that the backend is connected to the PostgreSQL database and that data can be inserted and retrieved.
