// Every product request in one area and pages call these and never directly through axios itself
import api from "./api";

// getAll ({category -> "alarm",sort-> "price"}) -> GET /api/products?category=alarm&sort=price
export const getAll = (params = {}) =>
  api.get("/products", { params }).then((response) => response.data);

export const getById = (id) =>
  api.get(`/products/${id}`).then((response) => response.data);

export const create = (formData) =>
  api.post("/products", formData).then((response) => response.data);

export const update = (id, formData) =>
  api.put(`/products/${id}`, formData).then((response) => response.data);

export const remove = (id) =>
  api.delete(`/products/${id}`).then((response) => response.data);
