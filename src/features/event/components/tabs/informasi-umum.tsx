import handleRequest from "@/axios/request";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import ToggleEventStatus from "../toggle-event-status";
import { Event } from "../../dto";
import UpdateEventForm from "../forms/update-event-form";

const InformasiUmum = ({ id }: { id: string }) => {
  const { data: event, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () =>
      handleRequest<Event>("GET", `/event/${id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  return (
    <Card className="w-full h-full p-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <div className="w-full flex justify-end mb-4">
        <ToggleEventStatus
          key={`${event?.active}`}
          eventId={id}
          isActive={event?.active ?? false}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading event data...</div>
      ) : event ? (
        <UpdateEventForm eventId={id} event={event} />
      ) : (
        <div className="flex justify-center py-8">
          Failed to load event data
        </div>
      )}
    </Card>
  );
};

export default InformasiUmum;
