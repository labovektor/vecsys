import env from "@/lib/env";
import axios from "axios";

export const baseURL = "https://dash.grabpay.id:3443/staging/vecsys/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  // baseURL: "http://localhost:8787",
  withCredentials: true,
});

const nonProtectedRoute = ["/", "/login"];

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (!nonProtectedRoute.includes(window.location.pathname)) {
        console.error("Unauthorized - redirecting to login...");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
