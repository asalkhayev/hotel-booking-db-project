import { useEffect, useMemo, useState } from "react";

import { getHotels, searchHotels } from "../api";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-05-20");
  const [checkOut, setCheckOut] = useState("2026-05-23");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    async function loadHotels() {
      const data = await getHotels();
      setHotels(data);
    }

    loadHotels();
  }, []);

  async function handleSearch() {
    const data = await searchHotels(destination);
    setHotels(data);
  }

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="small-kicker">Browse stays</p>
          <h1>Explore available hotels</h1>
          <p>
            Search through hotels stored in PostgreSQL and open a full hotel
            detail page with rooms and booking.
          </p>
        </div>
      </section>

      <main>
        <section className="content-section compact-section">
          <SearchBar
            destination={destination}
            setDestination={setDestination}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            onSearch={handleSearch}
          />

          <div className="section-title hotels-title">
            <p>Search results</p>
            <h2>{hotels.length} properties found</h2>
          </div>

          <div className="stays-grid">
          {hotels.map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Hotels;