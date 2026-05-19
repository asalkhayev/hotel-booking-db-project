import { useEffect, useState } from "react";

import {
  getAnalyticsSummary,
  getBookingsPerHotel,
  getOccupancyRate,
  getTopCities,
} from "../api";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [bookingsPerHotel, setBookingsPerHotel] = useState([]);
  const [topCities, setTopCities] = useState([]);
  const [occupancyRate, setOccupancyRate] = useState([]);

  useEffect(() => {
    async function loadAnalytics() {
      const [summaryData, bookingsData, citiesData, occupancyData] =
        await Promise.all([
          getAnalyticsSummary(),
          getBookingsPerHotel(),
          getTopCities(),
          getOccupancyRate(),
        ]);

      setSummary(summaryData);
      setBookingsPerHotel(bookingsData);
      setTopCities(citiesData);
      setOccupancyRate(occupancyData);
    }

    loadAnalytics();
  }, []);

  if (!summary) {
    return (
      <main>
        <div className="empty-box page-empty">Loading analytics...</div>
      </main>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="small-kicker">Admin dashboard</p>
          <h1>Database analytics</h1>
          <p>
            Real statistics calculated by FastAPI from PostgreSQL tables,
            bookings, rooms, hotels, users, and cities.
          </p>
        </div>
      </section>

      <main>
        <section className="admin-grid">
          <div className="admin-card">
            <span>Total hotels</span>
            <strong>{summary.total_hotels}</strong>
          </div>

          <div className="admin-card">
            <span>Total rooms</span>
            <strong>{summary.total_rooms}</strong>
          </div>

          <div className="admin-card">
            <span>Total users</span>
            <strong>{summary.total_users}</strong>
          </div>

          <div className="admin-card">
            <span>Total bookings</span>
            <strong>{summary.total_bookings}</strong>
          </div>

          <div className="admin-card wide-admin-card">
            <span>Total revenue</span>
            <strong>€{Number(summary.total_revenue).toFixed(2)}</strong>
          </div>
        </section>

        <section className="analytics-layout">
          <div className="analytics-card">
            <div className="analytics-heading">
              <p>SQL task</p>
              <h2>Bookings per hotel</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {bookingsPerHotel.map((item) => (
                  <tr key={item.hotel_id}>
                    <td>{item.hotel_name}</td>
                    <td>{item.bookings_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="analytics-card">
            <div className="analytics-heading">
              <p>SQL task</p>
              <h2>Top cities</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Country</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {topCities.map((item) => (
                  <tr key={item.city_id}>
                    <td>{item.city_name}</td>
                    <td>{item.country}</td>
                    <td>{item.total_bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="analytics-card full-width-card">
            <div className="analytics-heading">
              <p>SQL task</p>
              <h2>Occupancy rate by hotel</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Total rooms</th>
                  <th>Booked rooms</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {occupancyRate.map((item) => (
                  <tr key={item.hotel_id}>
                    <td>{item.hotel_name}</td>
                    <td>{item.total_rooms}</td>
                    <td>{item.booked_rooms}</td>
                    <td>
                      <span className="status">
                        {item.occupancy_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rules-section admin-notes">
          <h3>Why this dashboard matters</h3>
          <ul>
            <li>Statistics are calculated in the backend from real database tables.</li>
            <li>The dashboard demonstrates joins between hotels, rooms, bookings, and cities.</li>
            <li>Revenue is calculated from booking prices stored in PostgreSQL.</li>
            <li>These analytics match the required SQL tasks from the project description.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;