"use client";

import handleRequest from "@/axios/request";
import { Admin } from "@/features/auth/auth-entity";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface AuthContextType {
  user?: Admin | null;
  loading: boolean;
  error?: string;
  logout: VoidFunction;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [error, setError] = useState<string>();

  const pathname = usePathname();

  useEffect(() => {
    if (error) setError(undefined);
  }, [pathname]);

  const { data: admin, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      handleRequest<Admin>("GET", "/admin").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  function logout() {}

  const memoedValue = useMemo(
    () => ({
      user: admin,
      loading: isPending,
      error,
      logout,
    }),
    [admin, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}
