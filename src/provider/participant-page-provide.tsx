"use client";

import handleRequest from "@/axios/request";
import { Event } from "@/features/event/dto";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useMemo } from "react";
import { toast } from "sonner";

type ParticipantContextProviderProps = {
  children: React.ReactNode;
};

interface ParticipantContextType {
  event?: Event | null;
  refetchData: VoidFunction;
  loading: boolean;
}

export const ParticipantContext = createContext<ParticipantContextType>(
  {} as ParticipantContextType,
);

export default function ParticipantContextProvider({
  children,
}: ParticipantContextProviderProps) {
  const { code: slug } = useParams();
  const {
    data: event,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["event-page"],
    queryFn: () =>
      handleRequest<Event>("GET", `/e/${slug}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  const memoedValue = useMemo(
    () => ({
      event: event,
      loading: isPending,
      refetchData: () => refetch(),
    }),
    [event, isPending, refetch],
  );

  return (
    <ParticipantContext.Provider value={memoedValue}>
      {event && children}
    </ParticipantContext.Provider>
  );
}
