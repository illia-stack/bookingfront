import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/client";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);

  const getProperties = async () => {
    try {
      const res = await api.get("/properties", { params: { page } });
      setProperties(res.data.data.data || res.data.data); // Laravel Paginate
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    getProperties();
  }, [page]);

  return (
    <div className="container" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
