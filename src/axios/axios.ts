import { extractEventCodeFromPath } from "@/lib/event-config";
import axios from "axios";

let cachedBaseURL: string | null = null;

const axiosInstance = axios.create({
  withCredentials: true,
});

export async function getBaseURL(): Promise<string> {
  if (cachedBaseURL) {
    return cachedBaseURL;
  }
  try {
    const response = await axios.get("/api/config");
    cachedBaseURL = response.data.baseURL;
    return cachedBaseURL || "";
  } catch (error) {
    console.error("Gagal mengambil konfigurasi runtime:", error);
    return "";
  }
}

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

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url === "/api/config") {
      return config;
    }

    if (!config.baseURL) {
      config.baseURL = await getBaseURL();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
  },
);

export default axiosInstance;
