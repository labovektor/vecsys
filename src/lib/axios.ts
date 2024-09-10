import env from "@/schema/env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8787/",
});

export default axiosInstance;
