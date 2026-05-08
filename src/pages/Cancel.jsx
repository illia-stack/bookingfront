import { Link, useSearchParams } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Cancel() {

  const { lang } = useLanguage();

  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("booking_id");

  return (
    <div className="page-center">

      <div className="status-card status-cancel">

        {/* ICON + TITLE */}
        <div className="status-icon">❌</div>

        <h1>
          {translations[lang].paymentCancelledTitle}
        </h1>

        {/* MESSAGE */}
        <p className="muted">
          {translations[lang].paymentCancelledMessage}
        </p>

        {/* BOOKING ID */}
        {bookingId && (
          <p className="booking-id">
            {translations[lang].bookingId}:{" "}
            <strong>#{bookingId}</strong>
          </p>
        )}

        {/* INFO */}
        <p className="hint">
          {translations[lang].tryAgainLater}
        </p>

        {/* BUTTON */}
        <Link to="/my-bookings">
          <button className="primary-btn">
            {translations[lang].backToBookings}
          </button>
        </Link>

      </div>

    </div>
  );
}