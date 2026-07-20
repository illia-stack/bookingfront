import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProperty } from "../api/property";

import {
  createBooking,
  createStripeSession
} from "../api/booking";

import { AuthContext } from "../context/AuthContext";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

import PropertyComments from "../components/PropertyComments";

export default function PropertyDetail() {

  const { id } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { authFetch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [property, setProperty] = useState(null);

  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const todayStr = new Date().toISOString().split("T")[0];

 
  
  useEffect(() => {
    setLoading(true);
    const fetchProperty = async () => {

      try {

        const res = await getProperty(id);

        setProperty(res.data || null);

      } catch (err) {

        console.error(err);
        alert(translations[lang].propertyNotFound);

      } finally {

        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, lang]);

  
  const handleBooking = async () => {

    if (bookingLoading) return;
    
    if (!checkIn || !checkOut) {
      alert(translations[lang].selectDates);
      return;
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (isNaN(inDate) || isNaN(outDate)) {
      alert(translations[lang].invalidDates);
      return;
    }

    if (inDate < today) {
      alert(translations[lang].invalidDates);
      return;
    }

    if (outDate <= inDate) {
      alert(translations[lang].invalidDates);
      return;
    }

    
    setBookingLoading(true);

      try {

            // 1. Create booking
          const booking = await createBooking(
            authFetch,
            {
              property_id: Number(id),
              check_in: checkIn,
              check_out: checkOut,
              locale: lang
            }
          );

          const bookingId = booking?.data?.booking_id;

            if (!bookingId) {
              alert(translations[lang].bookingFailed);
              return;
            }

            // 2. Create Stripe session
        const stripe = await createStripeSession(
            authFetch,
            bookingId
        );

        if (!stripe.success || !stripe.data?.checkout_url) {
    console.error("Stripe response:", stripe);
    alert(translations[lang].bookingFailed);
    return;
}

        window.location.assign(stripe.data.checkout_url);
      } catch (err) {
        console.error("BOOKING ERROR:", err);

        const status = err?.status;

        const message =
          err?.message ||
          err?.error ||
          "";

        const msg = message.toLowerCase();

        if (status === 401) {
          alert(translations[lang].loginRequired);
          navigate("/login");
          return;
        }

        if (
          msg.includes("not available") ||
          msg.includes("already booked") ||
          err.code === "BOOKING_CONFLICT"
        ) {
          alert(translations[lang].alreadyBooked);
        } else {
          alert(translations[lang].bookingFailed);
        }
      } finally {
        setBookingLoading(false);
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
            loading="lazy"
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

          {/* BOOKING */}
          <div className="booking-box">

            <h3>
              {translations[lang].bookProperty}
            </h3>

            <div className="booking-dates">

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
                  min={todayStr}
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
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />

              </div>

            </div>

            <button
              className="primary-btn full-btn"
              disabled={bookingLoading}
              onClick={handleBooking}
            >
              {bookingLoading
                ? translations[lang].loading
                : translations[lang].createBooking}
            </button>

          </div>

        </div>

        {/* COMMENTS */}
        <PropertyComments
          propertyId={id}
        />

      </div>
  );
  
}