import api from "./client";

export const createBooking = async (data) => {
  try {
    return await api.post("/bookings", data);
  } catch (err) {
    throw err;
  }
};

export const getMyBookings = () => {
  return api.get("/my-bookings");
};