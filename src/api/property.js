import { API_BASE_URL } from "../config";

export const getProperties = async () => {
  const res = await fetch(`${API_BASE_URL}/properties`, {
    credentials: "include"
  });

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};

export const getProperty = async (id) => {
  const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
    credentials: "include"
  });

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};