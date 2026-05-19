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
        src={property.image_url}
        alt={property.title}
        loading="lazy"
      />

      {/* CONTENT */}
      <div className="card-content">

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
          className="btn-full"
          onClick={() =>
            navigate(`/properties/${property.id}`)
          }
        >
          {translations[lang].viewDetails}
        </button>

      </div>

    </div>
  );
}