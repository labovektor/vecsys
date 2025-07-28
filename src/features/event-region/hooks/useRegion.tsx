import handleRequest from "@/axios/request";
import { useQuery } from "@tanstack/react-query";
import { EventRegion } from "../dto";
import { toast } from "sonner";

export const useRegion = (eventId: string) => {
  return useQuery({
    queryKey: ["regions", eventId],
    queryFn: async () =>
      handleRequest<EventRegion[]>("GET", `/admin/event/${eventId}/region`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
    enabled: !!eventId,
  });
}