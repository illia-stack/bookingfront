import api from "./client";

export const checkout = (bookingId) => {
  return api.post("/checkout", {
    booking_id: bookingId
  });
};