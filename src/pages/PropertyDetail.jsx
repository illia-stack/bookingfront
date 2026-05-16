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
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const fetchProperty = async () => {

    try {

      const res = await getProperty(id);
      setProperty(res.data.data);

    } catch (err) {

      console.error(err);
      alert(translations[lang].propertyNotFound);

    } finally {

      setLoading(false);
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
        property_id: Number(id),
        check_in: checkIn,
        check_out: checkOut,
        locale: lang
      });

      const url = res.data.checkout_url;

      if (!url) {
        alert(translations[lang].bookingFailed);
        return;
      }

      window.location.href = url;

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        translations[lang].bookingFailed
      );
    }
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="page-center">
        <p className="loading-text">
          {translations[lang].loading}
        </p>
      </div>
    );
  }

  /* NOT FOUND */
  if (!property) {
    return (
      <div className="page-center">
        <p>{translations[lang].propertyNotFound}</p>
      </div>
    );
  }

  return (
    <div className="detail-page">

      <div className="detail-card">

        {/* IMAGE */}
        <img
          src={
            property.image_url ||
            "https://via.placeholder.com/800x400"
          }
          alt={property.title}
          className="detail-image"
        />

        {/* TITLE */}
        <h1 className="detail-title">
          {property.title}
        </h1>

        {/* INFO */}
        <div className="detail-info">

          <p>📍 {property.city}</p>

          <p>
            💰 {property.price_per_night} € / {translations[lang].night}
          </p>

          <p>
            👥 {translations[lang].upTo}{" "}
            {property.max_guests}{" "}
            {translations[lang].guests}
          </p>

        </div>

        {/* DESCRIPTION */}
        <p className="detail-description">
          {property.description}
        </p>

        {/* BOOKING SECTION */}
        <div className="booking-box">

          <h3>
            {translations[lang].bookProperty}
          </h3>

          {/* CHECK-IN */}
          <div className="form-group">

            <label>
              {translations[lang].checkInLabel}
            </label>

            <p className="hint">
              {translations[lang].checkInHint}
            </p>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

          </div>

          {/* CHECK-OUT */}
          <div className="form-group">

            <label>
              {translations[lang].checkOutLabel}
            </label>

            <p className="hint">
              {translations[lang].checkOutHint}
            </p>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

          </div>

          {/* BUTTON */}
          <button
            className="primary-btn full-btn"
            onClick={handleBooking}
          >
            {translations[lang].createBooking}
          </button>

        </div>

      </div>

    </div>
  );
}