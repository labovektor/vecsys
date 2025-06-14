"use client";

import handleRequest from "@/axios/request";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Event } from "@/features/event/dto";
import { toast } from "sonner";
import { useCallback } from "react";

const ChooseEvent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedEventId = searchParams.get('eventId');

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () =>
      handleRequest<Event[]>("GET", "/admin/event").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  const handleEventChange = useCallback((eventId: string) => {
    const params = new URLSearchParams(searchParams);
    if (eventId) {
      params.set('eventId', eventId);
    } else {
      params.delete('eventId');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);
  return (
    <div className="mb-6 flex items-center gap-4 px-1">
      <label className="text-sm font-medium whitespace-nowrap">
        Pilih Event
      </label>
      <Select value={selectedEventId || ""} onValueChange={handleEventChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Pilih event ..." />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            events?.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChooseEvent;