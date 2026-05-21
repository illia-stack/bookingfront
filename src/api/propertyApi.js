import api from "./api";

export const getProperties = () => {
  return api.get("/properties");
};

export const getProperty = (id) => {
  return api.get(`/properties/${id}`);
};