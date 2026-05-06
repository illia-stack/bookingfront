import api from "../api/client";

export const getProperties = (filters = {}) => {
  return api.get("/properties", { params: filters });
};

export const getProperty = (id) => {
  return api.get(`/properties/${id}`);
};

export const createProperty = (data) => {
  return api.post("/properties", data);
};  