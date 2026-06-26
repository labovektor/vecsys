"use client";

import handleRequest from "@/axios/request";
import { ParticipantData } from "@/features/participant-administration/dto";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useMemo } from "react";
import { toast } from "sonner";

type ParticipantAuthContextProviderProps = {
  children: React.ReactNode;
};

interface ParticipantAuthContextType {
  user?: ParticipantData | null;
  refetchData: VoidFunction;
  loading: boolean;
  logout: VoidFunction;
}

export const ParticipantAuthContext = createContext<ParticipantAuthContextType>(
  {} as ParticipantAuthContextType,
);

export default function ParticipantAuthContextProvider({
  children,
}: ParticipantAuthContextProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toLoginPage = () => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === "e" && segments[1]) {
      router.replace(`/e/${segments[1]}/login`);
    }
  };

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
          toLoginPage();
        }
        return res.data;
      }),
  });

  const memoedValue = useMemo(
    () => ({
      user: participant,
      loading: isPending,
      refetchData: () => refetch(),
      logout: () => {
        handleRequest<unknown>("GET", "/user/logout");
        toLoginPage();
      },
    }),
    [participant, isPending, refetch, router],
  );

  return (
    <ParticipantAuthContext.Provider value={memoedValue}>
      {children}
    </ParticipantAuthContext.Provider>
  );
}
