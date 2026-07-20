import { API_BASE_URL } from "../config";

export const sendContact = async (data) => {
  const res = await fetch(`${API_BASE_URL}/contact.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};