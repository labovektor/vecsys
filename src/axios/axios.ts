import { extractEventCodeFromPath } from "@/lib/event-config";
import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const nonProtectedRoutes = [
  "/",
  "/login",
  /^\/e\/[^/]+\/login$/,
  /^\/e\/[^/]+\/register$/,
  /^\/e\/[^/]+\/forgot-password$/,
  /^\/e\/[^/]+\/reset-password$/,
];

function isNonProtectedRoute(pathname: string) {
  return nonProtectedRoutes.some((route) => {
    if (typeof route === "string") {
      return route === pathname;
    }
    return route.test(pathname);
  });
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (!isNonProtectedRoute(window.location.pathname)) {
        console.error("Unauthorized - redirecting to login...");
        const currentPath = window.location.pathname;

        // check if current is admin page or participant page
        if (currentPath.startsWith("/e")) {
          const code = extractEventCodeFromPath(currentPath);
          if (code) {
            window.location.href = `/e/${code}/login`;
          } else {
            // fallback kalau gagal deteksi code
            window.location.href = "/invalid-event";
          }
        } else {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
