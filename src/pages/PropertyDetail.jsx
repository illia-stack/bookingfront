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
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const fetchProperty = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProperty(id);
      setProperty(res.data.data);
    } catch (err) {
      console.error(err);
      setError(translations[lang].propertyNotFound);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError(translations[lang].selectDates);
      return;
    }

    setBookingLoading(true);
    setError("");

    try {
      const res = await createBooking({
        property_id: Number(id),
        check_in: checkIn,
        check_out: checkOut,
        locale: lang
      });

      const url = res.data.checkout_url;

      if (!url) {
        setError(translations[lang].bookingFailed);
        return;
      }

      window.location.href = url;

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || translations[lang].bookingFailed);
    } finally {
      setBookingLoading(false);
    }
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="page-center">
        <p className="loading-text">{translations[lang].loading}</p>
      </div>
    );
  }

  /* ERROR */
  if (error && !property) {
    return (
      <div className="page-center">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="detail-page">

      <div className="detail-card">

        {/* IMAGE */}
        <img
          src={property.image_url || "https://via.placeholder.com/800x400"}
          alt={property.title}
          className="detail-image"
        />

        {/* TITLE */}
        <h1 className="detail-title">{property.title}</h1>

        {/* INFO */}
        <div className="detail-info">
          <p>📍 {property.city}</p>
          <p>💰 {property.price_per_night} € / {translations[lang].night}</p>
          <p>👥 {translations[lang].upTo} {property.max_guests} {translations[lang].guests}</p>
        </div>

        {/* DESCRIPTION */}
        <p className="detail-description">{property.description}</p>

        {/* BOOKING SECTION */}
        <div className="booking-box">

          <h3>{translations[lang].bookProperty}</h3>

          {/* ERROR */}
          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleBooking}>

            {/* CHECK-IN */}
            <div className="form-group">
              <label>{translations[lang].checkInLabel}</label>
              <p className="hint">{translations[lang].checkInHint}</p>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* CHECK-OUT */}
            <div className="form-group">
              <label>{translations[lang].checkOutLabel}</label>
              <p className="hint">{translations[lang].checkOutHint}</p>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="primary-btn full-btn"
              disabled={bookingLoading}
            >
              {bookingLoading ? translations[lang].loading : translations[lang].createBooking}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}