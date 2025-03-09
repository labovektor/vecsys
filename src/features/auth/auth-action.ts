"use server";

import { SchemaLogin } from "@/features/auth/auth-schema";
import { handleRequest } from "@/lib/safe-actions";
import { Admin } from "./auth-entity";

export async function loginAction(payload: SchemaLogin) {
  return handleRequest<Admin>("POST", "/admin/login", payload);
}

export async function getAdminAction() {
  return handleRequest<Admin>("GET", "/admin");
}
