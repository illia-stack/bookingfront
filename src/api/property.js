import api from "./client";

export const getProperties = (page = 1) => {
  return api.get("/properties", {
    params: { page }
  });
};

export const getProperty = (id) => {
  return api.get(`/properties/${id}`);
};