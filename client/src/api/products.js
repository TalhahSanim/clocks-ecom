// Every product request in one area and pages call these and never directly through axios itself
import api from "./api";

// getAll ({category -> "alarm",sort-> "price"}) -> GET /api/products?category=alarm&sort=price
export const getAll = (params = {}) => api.get("/products", { params }).then((response) => response.data);

export const getById = (id) => api.get(`/products/${id}`).then((response) => response.data);
// Uploads send image on supabase so allow 60 seconds instead of the default 10 seconds to give more time for the upload process
export const create = (formData) =>
  api.post("/products", formData, { timeout: 60000 }).then((response) => response.data);

export const update = (id, formData) =>
  api.put(`/products/${id}`, formData, { timeout: 60000 }).then((response) => response.data);

export const remove = (id) => api.delete(`/products/${id}`).then((response) => response.data);
