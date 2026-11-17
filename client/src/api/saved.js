// Saved For Later -> api.js adds the token
import api from "./api";

export const getSaved = () => api.get("/saved").then((response) => response.data);
export const saveClock = (id) => api.put(`/saved/${id}`).then((response) => response.data);
export const unsaveClock = (id) => api.delete(`/saved/${id}`).then((response) => response.data);
