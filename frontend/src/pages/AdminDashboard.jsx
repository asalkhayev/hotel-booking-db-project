import { useEffect, useMemo, useState } from "react";

import { getBookings, getHotels, getUsers } from "../api";

function AdminDashboard() {
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

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

  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, booking) => sum + Number(booking.total_price), 0);
  }, [bookings]);

  const averageBookingValue = bookings.length
    ? totalRevenue / bookings.length
    : 0;

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="small-kicker">Admin dashboard</p>
          <h1>Project analytics</h1>
          <p>
            A simple dashboard showing database-driven project metrics from the
            hotel booking system.
          </p>
        </div>
      </section>

      <main>
        <section className="admin-grid">
          <div className="admin-card">
            <span>Total hotels</span>
            <strong>{hotels.length}</strong>
          </div>

          <div className="admin-card">
            <span>Total users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="admin-card">
            <span>Total bookings</span>
            <strong>{bookings.length}</strong>
          </div>

          <div className="admin-card">
            <span>Total revenue</span>
            <strong>€{totalRevenue.toFixed(2)}</strong>
          </div>
        </section>

        <section className="rules-section admin-notes">
          <h3>What this dashboard proves</h3>
          <ul>
            <li>The frontend reads data from backend API endpoints.</li>
            <li>The backend retrieves real rows from PostgreSQL.</li>
            <li>New bookings created in the hotel page update these numbers.</li>
            <li>Average booking value is currently €{averageBookingValue.toFixed(2)}.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;