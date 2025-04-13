"use client";

import handleRequest from "@/axios/request";
import { DataTable } from "@/components/table/data-table";
import { eventColumns } from "@/features/event/component/table-column";
import { Event } from "@/features/event/entity";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const EventPage = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      handleRequest<Event[]>("GET", "/admin/event").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });
  return (
    <DataTable columns={eventColumns} data={events || []} loading={isLoading} />
  );
};

export default EventPage;
