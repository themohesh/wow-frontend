import axios from "axios";
import { getToken } from "../utils/tokenUtils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      localStorage.removeItem("job_match_token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
