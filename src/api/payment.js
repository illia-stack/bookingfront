import api from "./api";

export const checkout = (bookingId) => {
  return api.post("/checkout", {
    booking_id: bookingId
  });
};