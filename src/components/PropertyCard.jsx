import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function PropertyCard({ property }) {

  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <div className="card">

      <img
        src={property.image_url || "https://via.placeholder.com/300"}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h3>{property.title}</h3>

      <p>📍 {property.city}</p>

      <p>
        💰 {property.price_per_night} € / {translations[lang].night}
      </p>

      <p>
        👥 {translations[lang].upTo} {property.max_guests} {translations[lang].guests}
      </p>

      <button onClick={() => navigate(`/properties/${property.id}`)}>
        {translations[lang].viewDetails}
      </button>

    </div>
  );
}