import { useEffect, useMemo, useState } from "react";

import { getBookings, getPayments } from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [bookingsData, paymentsData] = await Promise.all([
        getBookings(),
        getPayments(),
      ]);

      setBookings(bookingsData);
      setPayments(paymentsData);
    }

    loadData();
  }, []);

  const paymentByBookingId = useMemo(() => {
    const map = {};

    payments.forEach((payment) => {
      map[payment.booking_id] = payment;
    });

    return map;
  }, [payments]);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="small-kicker">Database proof</p>
          <h1>Recent bookings</h1>
          <p>
            These records are loaded directly from PostgreSQL through the
            FastAPI backend, including booking and payment status.
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
                  <th>Booking</th>
                  <th>Payment</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const payment = paymentByBookingId[booking.id];

                  return (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.user_id}</td>
                      <td>{booking.room_id}</td>
                      <td>{booking.check_in}</td>
                      <td>{booking.check_out}</td>
                      <td>
                        <span className="status">{booking.status}</span>
                      </td>
                      <td>
                        {payment ? (
                          <span className="payment-status">
                            {payment.status} · {payment.payment_method}
                          </span>
                        ) : (
                          <span className="payment-status unpaid">unpaid</span>
                        )}
                      </td>
                      <td>€{booking.total_price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default Bookings;