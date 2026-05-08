import { Link, useSearchParams } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Success() {

  const { lang } = useLanguage();

  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("booking_id");

  return (
    <div className="page-center">

      <div className="status-card status-success">

        {/* ICON + TITLE */}
        <div className="status-icon">✅</div>

        <h1>
          {translations[lang].paymentSuccessfulTitle}
        </h1>

        {/* MESSAGE */}
        <p className="muted">
          {translations[lang].paymentSuccessfulMessage}
        </p>

        {/* BOOKING ID */}
        {bookingId && (
          <p className="booking-id">
            {translations[lang].bookingId}: <strong>#{bookingId}</strong>
          </p>
        )}

        {/* BUTTON */}
        <Link to="/my-bookings">
          <button className="primary-btn">
            {translations[lang].viewMyBookings}
          </button>
        </Link>

      </div>

    </div>
  );
}