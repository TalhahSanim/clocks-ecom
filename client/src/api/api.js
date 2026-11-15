// One axios for the app
import axios from "axios";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

// Server says the login is expired -> sign out so user logs in again
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && auth.currentUser) {
      await signOut(auth);
    }
    return Promise.reject(error);
  },
);

//  "/api" goes to vite's proxy to http://localhost:3000/api
const api = axios.create({ baseURL: "/api", timeout: 10000 });

// Adds firebase Id token to each request so the server can determine user identity
// getIdToken() refreshes it if its close to one hour expiry
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    config.headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }
  return config;
});

// Turn any error into one readable message -> The servers ApiError text if one exists
export function errorMessage(err) {
  return err.response?.data || "Something Went Wrong, Please Try Again";
}

export default api;
