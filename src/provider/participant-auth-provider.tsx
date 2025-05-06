"use client";

import handleRequest from "@/axios/request";
import { Participant } from "@/features/participant/dto";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ParticipantAuthContextProviderProps = {
  children: React.ReactNode;
};

interface ParticipantAuthContextType {
  user?: Participant | null;
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

  const { data: participant, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      handleRequest<Participant>("GET", "/user").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  function logout() {}

  const memoedValue = useMemo(
    () => ({
      user: participant,
      loading: isPending,
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
