function SearchBar({ destination, setDestination, checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests }) {
    return (
      <form className="search-panel">
        <label>
          <span>Destination</span>
          <input
            type="text"
            placeholder="Search by hotel or city"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
  
        <label>
          <span>Check-in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
  
        <label>
          <span>Check-out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
  
        <label>
          <span>Guests</span>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
  
        <button type="button" onClick={() => (window.location.href = "/hotels")}>
          Search
        </button>
      </form>
    );
  }
  
  export default SearchBar;