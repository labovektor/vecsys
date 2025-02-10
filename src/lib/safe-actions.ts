import { isAxiosError } from "axios";
import axiosInstance from "./axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ActionReturn<T> = Partial<{
  data: T;
  error: string;
}>;

export async function handleRequest<T>(
  method: HttpMethod,
  endpoint: string,
  body?: any
): Promise<ActionReturn<T>> {
  try {
    const config = {
      method,
      url: endpoint,
      ...(body ? { data: body } : {}),
    };

    const res = await axiosInstance(config);
    return {
      data: res.data,
    };
  } catch (error) {
    return {
      error: isAxiosError(error)
        ? error.response?.data["message"] ?? error.response?.data
        : (error as Error).message,
    };
  }
}
