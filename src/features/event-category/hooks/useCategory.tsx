import handleRequest from "@/axios/request"
import { useQuery } from "@tanstack/react-query"
import { EventCategory } from "../dto"
import { toast } from "sonner"

export const useCategory = (eventId: string) => {
  return useQuery({
    queryKey: ["categories", eventId],
    queryFn: async () => 
      handleRequest<EventCategory[]>("GET", `/admin/event/${eventId}/category`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
    enabled: !!eventId,
  })
}