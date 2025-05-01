import { isAxiosError } from "axios";
import axiosInstance from "./axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestReturn<T> = {
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
};

async function handleRequest<T>(
  method: HttpMethod,
  endpoint: string,
  body?: any
): Promise<RequestReturn<T>> {
  try {
    const isFormData = body instanceof FormData;
    const config = {
      method,
      url: endpoint,
      ...(body ? { 
        data: body,
        headers: isFormData ? {
          'Content-Type': 'multipart/form-data',
        } : undefined
      } : {}),
    };

    const res = await axiosInstance(config);
    return { data: res.data.data };
  } catch (error) {
    return {
      data: null,
      error: isAxiosError(error)
        ? {
            code: error.response?.status.toString() || "UNKNOWN_ERROR",
            message:
              error.response?.data.status.message ?? error.response?.data,
          }
        : {
            code: "UNKNOWN_ERROR",
            message: (error as Error).message,
          },
    };
  }
}

export default handleRequest;
