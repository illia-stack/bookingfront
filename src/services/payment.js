import api from "../api/client";

export const checkout = (booking_id) => {
  return api.post("/checkout", { booking_id });
};