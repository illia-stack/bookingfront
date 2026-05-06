// src/pages/Home.jsx
import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/client";

export default function Home() {
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const res = await api.get("/properties");
      setProperties(res.data.data); // Laravel Paginate
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="container" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}