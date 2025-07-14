"use client";

import handleRequest from "@/axios/request";
import { ParticipantData } from "@/features/participant-administration/dto";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ParticipantAuthContextProviderProps = {
  children: React.ReactNode;
};

interface ParticipantAuthContextType {
  user?: ParticipantData | null;
  refetchData: VoidFunction;
  loading: boolean;
  error?: string;
  logout: VoidFunction;
}

export const ParticipantAuthContext = createContext<ParticipantAuthContextType>(
  {} as ParticipantAuthContextType
);

export default function ParticipantAuthContextProvider({
  children,
}: ParticipantAuthContextProviderProps) {
  const [error, setError] = useState<string>();

  const pathname = usePathname();

  useEffect(() => {
    if (error) setError(undefined);
  }, [pathname]);

  const {
    data: participant,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["participant-profile"],
    queryFn: () =>
      handleRequest<ParticipantData>("GET", "/user/data").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  function logout() {}

  function refetchData() {
    refetch();
  }

  const memoedValue = useMemo(
    () => ({
      user: participant,
      loading: isPending,
      refetchData,
      error,
      logout,
    }),
    [participant, error]
  );

  return (
    <ParticipantAuthContext.Provider value={memoedValue}>
      {children}
    </ParticipantAuthContext.Provider>
  );
}
