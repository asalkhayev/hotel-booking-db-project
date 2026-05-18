import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBookings, getHotel, getRoomsByHotel, getUsers } from "../api";
import RoomCard from "../components/RoomCard";
import BookingForm from "../components/BookingForm";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
];

const roomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
];

const amenities = [
  "Free Wi-Fi",
  "Breakfast included",
  "Private workspace",
  "Airport transfer",
  "Room service",
  "City view",
  "Air conditioning",
  "Secure payment",
];

function calculateNights(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate - startDate;
  const nights = diff / (1000 * 60 * 60 * 24);
  return nights > 0 ? nights : 1;
}

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [checkIn, setCheckIn] = useState("2026-05-20");
  const [checkOut, setCheckOut] = useState("2026-05-23");
  const [guests] = useState(2);

  const nights = calculateNights(checkIn, checkOut);

  async function loadDetails() {
    const [hotelData, roomsData, usersData, bookingsData] = await Promise.all([
      getHotel(id),
      getRoomsByHotel(id),
      getUsers(),
      getBookings(),
    ]);

    setHotel(hotelData);
    setRooms(roomsData);
    setUsers(usersData);
    setBookingsCount(bookingsData.length);
  }

  useEffect(() => {
    loadDetails();
  }, [id]);

  if (!hotel) {
    return (
      <main>
        <div className="empty-box page-empty">Loading hotel details...</div>
      </main>
    );
  }

  const activeHotelImage = hotelImages[(hotel.id - 1) % hotelImages.length];

  return (
    <main>
      <section className="property-section">
        <div className="breadcrumb">Home &gt; Hotels &gt; {hotel.name}</div>

        <div className="gallery-grid">
          <div
            className="gallery-main"
            style={{ backgroundImage: `url(${activeHotelImage})` }}
          ></div>

          <div
            className="gallery-small"
            style={{ backgroundImage: `url(${roomImages[0]})` }}
          ></div>

          <div
            className="gallery-small"
            style={{ backgroundImage: `url(${roomImages[1]})` }}
          ></div>

          <div
            className="gallery-small"
            style={{ backgroundImage: `url(${roomImages[2]})` }}
          ></div>

          <div
            className="gallery-small dark-gallery"
            style={{ backgroundImage: `url(${hotelImages[4]})` }}
          >
            <span>Show all photos</span>
          </div>
        </div>

        <div className="property-head">
          <div>
            <h2>{hotel.name}</h2>
            <p className="location-line">⌖ {hotel.address}</p>
            <p className="meta-line">
              {guests} guests · {rooms.length || 1} rooms available · {hotel.stars} star property
            </p>
          </div>

          <div className="score-block">
            <span>★ {hotel.stars}.72</span>
            <small>{bookingsCount} database bookings</small>
            <a href="#select-room">Book now</a>
          </div>
        </div>

        <div className="property-layout">
          <div className="property-main">
            <section className="text-block">
              <h3>About the place</h3>
              <p>
                {hotel.description ||
                  "This property offers a comfortable stay with convenient access to the city center, clean rooms, and modern facilities."}
                {" "}The platform stores this hotel, rooms, bookings, payments, and reviews in a normalized PostgreSQL database.
              </p>
            </section>

            <section className="text-block">
              <h3>What this place offers</h3>

              <div className="amenities-grid">
                {amenities.map((item) => (
                  <div className="amenity-item" key={item}>
                    <span>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="text-block" id="select-room">
              <h3>Select room</h3>

              <div className="room-list">
                {rooms.length === 0 ? (
                  <div className="empty-box">No rooms loaded for this hotel yet.</div>
                ) : (
                  rooms.map((room, index) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      index={index}
                      nights={nights}
                      guests={guests}
                      selectedRoom={selectedRoom}
                      setSelectedRoom={setSelectedRoom}
                    />
                  ))
                )}
              </div>
            </section>
          </div>

          <BookingForm
            users={users}
            selectedRoom={selectedRoom}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            nights={nights}
            onBookingCreated={loadDetails}
          />
        </div>
      </section>

      <section className="rules-section">
        <h3>Property rules</h3>
        <ul>
          <li>Check-in starts at 3 PM and check-out is before 12 PM.</li>
          <li>Guests must provide valid contact information before booking.</li>
          <li>Each booking is linked to one room and one user in the database.</li>
          <li>Payments and reviews can be recorded after the booking is created.</li>
        </ul>
      </section>
    </main>
  );
}

export default HotelDetails;