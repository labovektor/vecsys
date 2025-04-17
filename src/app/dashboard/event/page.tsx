"use client";

import handleRequest from "@/axios/request";
import { DataTable } from "@/components/table/data-table";
import { eventColumn } from "@/features/event/components/event-column";
import { Event } from "@/features/event/dto";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const EventPage = () => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () =>
      handleRequest<Event[]>("GET", "/admin/event").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });
  return <DataTable data={events || []} columns={eventColumn} />;
};

export default EventPage;
