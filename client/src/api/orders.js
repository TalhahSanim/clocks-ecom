// Orders API calls as api.js adds the login token
import api from "./api";

export const createOrder = (order) => api.post("/orders", order).then((response) => response.data);
export const getMyOrders = () => api.get("/orders/my-orders").then((response) => response.data);
export const getOrder = (id) => api.get(`/orders/${id}`).then((response) => response.data);
export const getAllOrders = () => api.get("/orders").then((response) => response.data);
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status }).then((response) => response.data);
