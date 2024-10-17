import axiosInstance from "@/lib/axios";
import { schemaLogin } from "@/schema/auth_schema";
import { isAxiosError } from "axios";
import { z } from "zod";

export async function loginAction(payload: z.infer<typeof schemaLogin>) {
  try {
    const res = await axiosInstance.post("/admin/login", payload);
    return {
      data: res.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data["message"] ?? error.response?.data,
      };
    } else {
      return {
        error: (error as Error).message,
      };
    }
  }
}

export async function getAdminAction() {
  try {
    const res = await axiosInstance.get("/admin");
    return {
      data: res.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data["message"] ?? error.response?.data,
      };
    } else {
      return {
        error: (error as Error).message,
      };
    }
  }
}
