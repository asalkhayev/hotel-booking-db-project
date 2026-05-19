import { useEffect, useState } from "react";
import { createBooking, createPayment } from "../api";

function BookingForm({
  selectedRoom,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  nights,
  onBookingCreated,
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const roomPrice = selectedRoom ? Number(selectedRoom.price_per_night) : 0;
  const subtotal = roomPrice * nights;
  const cleaningFee = selectedRoom ? 18 : 0;
  const taxes = selectedRoom ? subtotal * 0.07 : 0;
  const total = subtotal + cleaningFee + taxes;

  async function handleSubmit(e) {
    e.preventDefault();

    const savedUser = localStorage.getItem("currentUser");
    const loggedInUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loggedInUser) {
      setMessage("Please login before booking.");
      return;
    }

    if (!selectedRoom) {
      setMessage("Please choose a room first.");
      return;
    }

    const newBooking = await createBooking({
      user_id: Number(loggedInUser.id),
      room_id: Number(selectedRoom.id),
      check_in: checkIn,
      check_out: checkOut,
      status: "confirmed",
      total_price: Number(total.toFixed(2)),
    });
    
    await createPayment({
      booking_id: Number(newBooking.id),
      amount: Number(total.toFixed(2)),
      payment_method: "card",
      status: "paid",
    });

    setCurrentUser(loggedInUser);
    setMessage("Booking and payment confirmed successfully.");

    if (onBookingCreated) {
      onBookingCreated();
    }
  }

  return (
    <aside className="reservation-card">
      <h3>Reserve your stay</h3>

      {currentUser ? (
        <p className="logged-user-note">
          Logged in as <strong>{currentUser.full_name}</strong>
        </p>
      ) : (
        <p className="logged-user-note warning">
          Please login from the header before booking.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </label>

          <label>
            Check-out
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="reservation-summary">
          <div>
            <span>Room</span>
            <strong>
              {selectedRoom ? `Room ${selectedRoom.room_number}` : "Not selected"}
            </strong>
          </div>

          <div>
            <span>Nights</span>
            <strong>{nights}</strong>
          </div>

          <div>
            <span>Cleaning</span>
            <strong>€{cleaningFee.toFixed(2)}</strong>
          </div>

          <div>
            <span>Taxes</span>
            <strong>€{taxes.toFixed(2)}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>
        </div>

        <button className="book-button" type="submit">
          Book now
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </aside>
  );
}

export default BookingForm;