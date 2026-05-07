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
    try {
      const res = await getProperty(id);
      setProperty(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Property not found");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleBooking = async () => {

    if (!checkIn || !checkOut) {
      alert(translations[lang].selectDates);
      return;
    }

    try {
      const res = await createBooking({
        property_id: id,
        check_in: checkIn,
        check_out: checkOut
      });

      // Backend gibt checkout_url zurück
      const url = res.data.checkout_url;

      if (!url) {
        alert(translations[lang].bookingFailed);
        return;
      }

      window.location.href = url;

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || translations[lang].bookingFailed);
    }
  };

  if (!property) {
    return <p>{translations[lang].loading}</p>;
  }

  return (
    <div className="container">

      {/* TITLE */}
      <h1 style={{ textAlign: "left" }}>
        {property.title}
      </h1>

      {/* IMAGE */}
      <img
        src={property.image_url || "https://via.placeholder.com/600"}
        alt={property.title}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
      />

      {/* DESCRIPTION */}
      <p style={{ marginBottom: "10px" }}>
        {property.description}
      </p>

      {/* INFO */}
      <p>📍 {property.city}</p>

      <p>
        💰 {property.price_per_night} € / {translations[lang].night}
      </p>

      <p>
        👥 {translations[lang].upTo} {property.max_guests} {translations[lang].guests}
      </p>

      {/* BOOKING SECTION */}
      <h3 style={{ marginTop: "20px" }}>
        {translations[lang].bookProperty}
      </h3>

      <p style={{ color: "#666", marginBottom: "10px" }}>
        {translations[lang].bookingHint}
      </p>

      {/* CHECK-IN */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          {translations[lang].checkInLabel}
        </label>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      {/* CHECK-OUT */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          {translations[lang].checkOutLabel}
        </label>

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button onClick={handleBooking}>
        {translations[lang].createBooking}
      </button>

    </div>
  );
}