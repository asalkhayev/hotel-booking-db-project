import { Link } from "react-router-dom";

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
];

function HotelCard({ hotel, index = 0 }) {
  return (
    <article className="stay-card">
      <div
        className="stay-photo"
        style={{
          backgroundImage: `url(${hotelImages[index % hotelImages.length]})`,
        }}
      >
        <button className="heart-button" type="button">
          ♡
        </button>
      </div>

      <div className="stay-body">
        <div className="stay-top">
          <h3>{hotel.name}</h3>
          <span>{hotel.stars}.0</span>
        </div>

        <p className="stay-location">{hotel.address}</p>
        <p className="stay-text">
          {hotel.description || "A comfortable stay with modern rooms."}
        </p>

        <div className="stay-footer">
          <div>
            <small>From</small>
            <strong>€89/night</strong>
          </div>

          <Link className="card-link-button" to={`/hotels/${hotel.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;