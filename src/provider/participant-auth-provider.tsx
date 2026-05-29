"use client";

import handleRequest from "@/axios/request";
import { ParticipantData } from "@/features/participant-administration/dto";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

  const eventId = participant?.participant.event_id;

  const memoedValue = useMemo(
    () => ({
      user: participant,
      loading: isPending,
      refetchData: () => refetch(),
      logout: () => {
        handleRequest<unknown>("GET", "/user/logout");
        router.replace(`/e/${eventId}/login`);
      },
    }),
    [participant, isPending, refetch, eventId, router],
  );

  return (
    <ParticipantAuthContext.Provider value={memoedValue}>
      {children}
    </ParticipantAuthContext.Provider>
  );
}
