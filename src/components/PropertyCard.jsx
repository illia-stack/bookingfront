import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function PropertyCard({ property }) {

  const navigate = useNavigate();

  const { lang } = useLanguage();

  return (
    <div className="card">

      {/* IMAGE */}
      <img
        src={
          property.image_url ||
          "https://via.placeholder.com/300"
        }
        alt={property.title}
        loading="lazy"
        style={{
          width: "100%",
          borderRadius: "10px"
        }}
      />

      {/* TITLE */}
      <h3>
        {property.title}
      </h3>

      {/* CITY */}
      <p>
        📍 {property.city}
      </p>

      {/* PRICE */}
      <p>
        💰 {property.price_per_night} €
        {" / "}
        {translations[lang].night}
      </p>

      {/* GUESTS */}
      <p>
        👥 {translations[lang].upTo}
        {" "}
        {property.max_guests}
        {" "}
        {translations[lang].guests}
      </p>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate(`/properties/${property.id}`)
        }
      >
        {translations[lang].viewDetails}
      </button>

    </div>
  );
}