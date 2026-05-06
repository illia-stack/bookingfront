import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      {/* Image */}
      <img
        src={property.image_url || "https://via.placeholder.com/300"}
        alt={property.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      {/* Title */}
      <h3>{property.title}</h3>

      {/* Location */}
      <p style={{ color: "#666" }}>
        📍 {property.city}
      </p>

      {/* Price */}
      <p style={{ fontWeight: "bold" }}>
        💰 {property.price_per_night} € / night
      </p>

      {/* Guests */}
      <p style={{ fontSize: "14px", color: "#555" }}>
        👥 Up to {property.max_guests} guests
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(`/properties/${property.id}`)}
      >
        View Details
      </button>

    </div>
  );
}