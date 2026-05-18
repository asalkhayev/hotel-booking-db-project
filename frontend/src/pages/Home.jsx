import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBookings, getHotels, getUsers } from "../api";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-05-20");
  const [checkOut, setCheckOut] = useState("2026-05-23");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    async function loadData() {
      const [hotelsData, usersData, bookingsData] = await Promise.all([
        getHotels(),
        getUsers(),
        getBookings(),
      ]);

      setHotels(hotelsData);
      setUsers(usersData);
      setBookings(bookingsData);
    }

    loadData();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <p className="small-kicker">Luxury stays · smart booking · live database</p>
          <h1>Find your perfect stay with comfort and style.</h1>
          <p className="hero-copy">
            A polished hotel booking platform built with React, FastAPI, and
            PostgreSQL. Browse hotels, select rooms, and create real bookings.
          </p>

          <SearchBar
            destination={destination}
            setDestination={setDestination}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
          />
        </div>
      </section>

      <main>
        <section className="overview-strip">
          <div>
            <strong>{hotels.length}</strong>
            <span>Hotels</span>
          </div>
          <div>
            <strong>{users.length}</strong>
            <span>Users</span>
          </div>
          <div>
            <strong>{bookings.length}</strong>
            <span>Bookings</span>
          </div>
          <div>
            <strong>FastAPI</strong>
            <span>Connected backend</span>
          </div>
        </section>

        <section className="content-section">
          <div className="section-title">
            <p>Featured properties</p>
            <h2>Handpicked hotels for your next trip</h2>
          </div>

          <div className="stays-grid">
            {hotels.slice(0, 3).map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
          </div>

          <div className="center-action">
            <Link className="large-link-button" to="/hotels">
              View all hotels
            </Link>
          </div>
        </section>

        <section className="rules-section">
          <h3>Why this project is more than a simple CRUD app</h3>
          <ul>
            <li>Real React interface with reusable components and multiple pages.</li>
            <li>FastAPI backend connected to PostgreSQL through SQLAlchemy.</li>
            <li>Bookings are inserted into the real database from the frontend.</li>
            <li>Database schema includes relations, constraints, fake data, indexes, and SQL queries.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default Home;