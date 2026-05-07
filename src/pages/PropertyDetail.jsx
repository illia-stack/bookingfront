import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../api/property";
import { createBooking } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function PropertyDetail() {

  const { id } = useParams();
  const { lang } = useLanguage();

  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const fetchProperty = async () => {
    const res = await getProperty(id);
    setProperty(res.data.data);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleBooking = async () => {

    if (!checkIn || !checkOut) {
      return alert(translations[lang].selectDates);
    }

    try {
      const res = await createBooking({
        property_id: id,
        check_in: checkIn,
        check_out: checkOut
      });

      window.location.href = res.data.checkout_url;

    } catch (err) {
      alert(err.response?.data?.message || translations[lang].bookingFailed);
    }
  };

  if (!property) return <p>{translations[lang].loading}</p>;

  return (
    <div className="container">

      <h1 style={{ textAlign: "left" }}>
        {property.title}
      </h1>

      <img
        src={property.image_url}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <p>{property.description}</p>

      <p>📍 {property.city}</p>

      <p>
        💰 {property.price_per_night} € / {translations[lang].night}
      </p>

      <p>
        👥 {translations[lang].upTo} {property.max_guests} {translations[lang].guests}
      </p>

      <h3>{translations[lang].bookProperty}</h3>

      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <button onClick={handleBooking}>
        {translations[lang].createBooking}
      </button>

    </div>
  );
}