import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import { createBooking } from "../services/booking";
import { checkout } from "../services/payment";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingId, setBookingId] = useState(null);

  const getProperty = async () => {
    const res = await api.get(`/properties/${id}`);
    setProperty(res.data.data);
  };

  const handleBooking = async () => {
    try {
      const res = await createBooking({ property_id: id, check_in: checkIn, check_out: checkOut });
      setBookingId(res.data.data.id);
      alert("Booking created! Now proceed to payment.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const handlePay = async () => {
    if (!bookingId) return alert("Please create a booking first!");
    const res = await checkout(bookingId);
    window.location.href = res.data.url; // Stripe Checkout
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{property.title}</h1>
      <img src={property.image_url || "https://via.placeholder.com/600"} alt={property.title} style={{ width: "100%", borderRadius: "10px" }} />
      <p>{property.description}</p>
      <p>📍 {property.city}</p>
      <p>💰 {property.price_per_night} € / night</p>
      <p>👥 Up to {property.max_guests} guests</p>

      <h3>Book this property</h3>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      <button onClick={handleBooking}>Create Booking</button>

      {bookingId && <button onClick={handlePay}>Pay Now</button>}
    </div>
  );
}