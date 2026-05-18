import { useEffect, useState } from "react";

import { getBookings } from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      const data = await getBookings();
      setBookings(data);
    }

    loadBookings();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="small-kicker">Database proof</p>
          <h1>Recent bookings</h1>
          <p>
            These records are loaded directly from the PostgreSQL database
            through the FastAPI backend.
          </p>
        </div>
      </section>

      <main>
        <section className="content-section compact-section">
          <div className="bookings-table-card">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Room ID</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.user_id}</td>
                    <td>{booking.room_id}</td>
                    <td>{booking.check_in}</td>
                    <td>{booking.check_out}</td>
                    <td>
                      <span className="status">{booking.status}</span>
                    </td>
                    <td>€{booking.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default Bookings;