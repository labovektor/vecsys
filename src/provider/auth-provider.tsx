"use client";

import handleRequest from "@/axios/request";
import { Admin } from "@/features/auth/entity";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useMemo } from "react";
import { toast } from "sonner";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface AuthContextType {
  user?: Admin | null;
  loading: boolean;
  logout: VoidFunction;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const router = useRouter();

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

  const memoedValue = useMemo(
    () => ({
      user: admin,
      loading: isPending,
      logout: () => {
        handleRequest<unknown>("GET", "/admin/logout");
        router.replace("/login");
      },
    }),
    [admin, isPending, router],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}
