"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import EmptyState from "./empty-state";
import KelolaPeserta from "../kelola-peserta";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { Participant } from "../dto";

const TabsIndex = () => {
  const searchParams = useSearchParams();
  const selectedEventId = searchParams.get("eventId");

  const { data: paidPart } = useQuery({
    queryKey: ["part-count", selectedEventId, "paid"],
    queryFn: async () =>
      handleRequest<Participant[]>(
        "GET",
        `/admin/event/${selectedEventId}/participant?step=paid`
      ).then((res) => res.data || []),
    enabled: !!selectedEventId,
  });

  const { data: unpaidPart } = useQuery({
    queryKey: ["part-count", selectedEventId, "unpaid"],
    queryFn: async () =>
      handleRequest<Participant[]>(
        "GET",
        `admin/event/${selectedEventId}/participant?step=unpaid`
      ).then((res) => res.data || []),
    enabled: !!selectedEventId,
  });

  if (!selectedEventId) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      <Tabs className="w-full" defaultValue="sudah-bayar">
        <TabsList>
          <TabsTrigger value="sudah-bayar">
            Sudah Bayar ({paidPart?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="belum-bayar">
            Belum Bayar ({unpaidPart?.length ?? 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sudah-bayar">
          <KelolaPeserta id={selectedEventId} step="paid" />
        </TabsContent>
        <TabsContent value="belum-bayar">
          <KelolaPeserta id={selectedEventId} step="unpaid" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsIndex;
