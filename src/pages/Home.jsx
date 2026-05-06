import { useEffect, useState } from "react";
import { getProperties } from "../services/property";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then((res) => {
      setProperties(res.data.data.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>Properties</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
        {properties.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.city}</p>
            <p>{p.price_per_night} € / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}