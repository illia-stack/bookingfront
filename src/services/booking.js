import api from "../api/client";

export const createBooking = (data) => {
  return api.post("/bookings", data);
};

export const getMyBookings = () => {
  return api.get("/my-bookings");
};