import env from "@/schema/env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dash.grabpay.id:3443/staging/vecsys/api",
  // baseURL: "http://localhost:8787",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        console.error("Unauthorized - redirecting to login...");
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
