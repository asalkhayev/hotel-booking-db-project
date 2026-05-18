const roomImages = [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
  ];
  
  function RoomCard({ room, index = 0, nights, guests, selectedRoom, setSelectedRoom }) {
    const price = Number(room.price_per_night);
    const roomSubtotal = price * nights;
    const roomTaxes = roomSubtotal * 0.07;
    const roomTotal = roomSubtotal + 18 + roomTaxes;
  
    const isSelected = selectedRoom?.id === room.id;
  
    return (
      <article
        className={isSelected ? "select-room-card active-room" : "select-room-card"}
        onClick={() => setSelectedRoom(room)}
      >
        <img src={roomImages[index % roomImages.length]} alt={`Room ${room.room_number}`} />
  
        <div className="room-info">
          <h4>Room {room.room_number}</h4>
          <p>{guests} guests · {nights} nights · Private bathroom</p>
          <span>★ 4.{50 + index} · {10 + index * 6} reviews</span>
  
          <button type="button">{isSelected ? "Selected" : "Select room"}</button>
        </div>
  
        <div className="price-breakdown">
          <h5>Price breakdown</h5>
          <div>
            <span>€{price.toFixed(2)} × {nights} nights</span>
            <strong>€{roomSubtotal.toFixed(2)}</strong>
          </div>
          <div>
            <span>Cleaning fee</span>
            <strong>€18.00</strong>
          </div>
          <div>
            <span>Taxes</span>
            <strong>€{roomTaxes.toFixed(2)}</strong>
          </div>
          <div className="total-line">
            <span>Total</span>
            <strong>€{roomTotal.toFixed(2)}</strong>
          </div>
        </div>
      </article>
    );
  }
  
  export default RoomCard;