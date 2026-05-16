import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  if (!property) return null; // Schutz, falls property undefineds

  return (
    <div className="card">
      {/* IMAGE */}
      <img
        src={property.image_url || "https://via.placeholder.com/600x400"}
        alt={property.title || translations[lang].propertyImageAlt}
        loading="lazy"
      />

      {/* CONTENT */}
      <div className="card-content">
        {/* TITLE */}
        <h3>{property.title || translations[lang].untitledProperty}</h3>

        {/* CITY */}
        <p>📍 {property.city || translations[lang].unknownCity}</p>

        {/* PRICE */}
        <p>
          💰 {property.price_per_night ?? "—"} € / {translations[lang].night}
        </p>

        {/* GUESTS */}
        <p>
          👥 {translations[lang].upTo} {property.max_guests ?? "—"} {translations[lang].guests}
        </p>

        {/* BUTTON */}
        <button
          className="btn-full"
          aria-label={`${translations[lang].viewDetails} ${property.title ?? ""}`}
          onClick={() => navigate(`/properties/${property.id}`)}
        >
          {translations[lang].viewDetails}
        </button>
      </div>
    </div>
  );
}