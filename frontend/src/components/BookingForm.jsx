import { useState } from "react";
import { createBooking } from "../api";

function BookingForm({
  users,
  selectedRoom,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  nights,
  onBookingCreated,
}) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");

  const roomPrice = selectedRoom ? Number(selectedRoom.price_per_night) : 0;
  const subtotal = roomPrice * nights;
  const cleaningFee = selectedRoom ? 18 : 0;
  const taxes = selectedRoom ? subtotal * 0.07 : 0;
  const total = subtotal + cleaningFee + taxes;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedRoom) {
      setMessage("Please choose a room first.");
      return;
    }

    if (!selectedUserId) {
      setMessage("Please choose a guest.");
      return;
    }

    await createBooking({
      user_id: Number(selectedUserId),
      room_id: Number(selectedRoom.id),
      check_in: checkIn,
      check_out: checkOut,
      status: "confirmed",
      total_price: Number(total.toFixed(2)),
    });

    setMessage("Booking confirmed and saved in PostgreSQL.");
    setSelectedUserId("");

    if (onBookingCreated) {
      onBookingCreated();
    }
  }

  return (
    <aside className="reservation-card">
      <h3>Reserve your stay</h3>
      <p>Choose a guest and confirm the booking.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Guest
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select guest</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
        </label>

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