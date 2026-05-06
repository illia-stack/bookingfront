import { useEffect, useState } from "react";
import { getMyBookings } from "../services/booking";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getMyBookings();
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  if (!bookings.length) return <p>No bookings yet.</p>;

  return (
    <div className="container">
      <h1>My Bookings</h1>
      {bookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
          <h3>{b.property.title}</h3>
          <p>📍 {b.property.city}</p>
          <p>Check-in: {b.check_in}</p>
          <p>Check-out: {b.check_out}</p>
          <p>Total: {b.total_price} €</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}