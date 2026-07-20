import { API_BASE_URL } from "../config";

export const createBooking = async (
  authFetch,
  data
) => {

  const res = await authFetch(
    `${API_BASE_URL}/bookings.php`,
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};

export const getMyBookings = async (authFetch) => {

    const res = await authFetch(
        `${API_BASE_URL}/my-bookings`
    );

    const json = await res.json();

    if (!res.ok) {
        json.status = res.status;
        throw json;
    }

    return json;
};

export const createStripeSession = async (
  authFetch,
  bookingId
) => {

  const res = await authFetch(
    `${API_BASE_URL}/stripe/create-session`,
    {
      method: "POST",
      body: JSON.stringify({
        booking_id: bookingId
      })
    }
  );

  const json = await res.json();

  if (!res.ok) {
    json.status = res.status;
    throw json;
  }

  return json;
};

