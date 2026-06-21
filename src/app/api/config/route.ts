import env from "@/lib/env";
import { NextResponse } from "next/server";

export async function GET() {
  let url = env.API_URL;
  if (!url.endsWith("/")) {
    url = url + "/";
  }
  return NextResponse.json({
    baseURL: env.API_URL || "http://localhost:8787",
  });
}
