import { useState } from "react";
import { checkout } from "../services/payment";

export default function PropertyDetail() {
  const [bookingId, setBookingId] = useState(null);

  const handlePay = async () => {
    if (!bookingId) return;

    const res = await checkout(bookingId);

    window.location.href = res.data.url;
  };

  return (
    <div>
      <h1>Property Detail</h1>

      {/* später: Booking erstellen → bookingId setzen */}

      <button onClick={handlePay}>
        Pay Now
      </button>
    </div>
  );
}