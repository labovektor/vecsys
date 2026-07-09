import { AxiosResponse, isAxiosError, ResponseType } from "axios";
import axiosInstance from "./axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestReturn<T> = {
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
};

function arrayBufferToObject<T>(buffer: ArrayBuffer): T {
  const decoder = new TextDecoder("utf-8");
  const jsonString = decoder.decode(buffer);
  return JSON.parse(jsonString) as T;
}

async function handleRequest<T>(
  method: HttpMethod,
  endpoint: string,
  body?: unknown,
  responseType?: ResponseType,
): Promise<RequestReturn<T>> {
  const isBinary = responseType === "blob" || responseType === "arraybuffer";
  try {
    const config = {
      method,
      url: endpoint,
      responseType,
      ...(body ? { data: body } : {}),
    };

    const res = await axiosInstance(config);

    return {
      data: isBinary ? (res.data as T) : res.data.data,
    };
  } catch (error) {
    let code = "UNKNOWN_ERROR";
    let message = (error as Error).message;
    if (isAxiosError(error)) {
      code = error.response?.status.toString() || "UNKNOWN_ERROR";
      const data = isBinary
        ? arrayBufferToObject<AxiosResponse>(error.response?.data)
        : error.response?.data;
      message = data.status.message ?? data;
    }
    return {
      data: null,
      error: {
        code: code,
        message: message,
      },
    };
  }
}

export default handleRequest;
