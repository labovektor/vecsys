"use client";

import { getQueryClient } from "@/lib/get-query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
