"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import EmptyState from "./empty-state";

const TabsIndex = () => {
  const searchParams = useSearchParams();
  const selectedEventId = searchParams.get('eventId');

  if (!selectedEventId) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      <Tabs
        className="w-full"
        defaultValue="sudah-bayar"
      >
        <TabsList>
          <TabsTrigger value="sudah-bayar">Sudah Bayar (100)</TabsTrigger>
          <TabsTrigger value="belum-bayar">Belum Bayar (88)</TabsTrigger>
        </TabsList>
        <TabsContent value="sudah-bayar">
          <div className="mt-4">
            <p>Sudah bayar {selectedEventId}</p>
          </div>
        </TabsContent>
        <TabsContent value="belum-bayar">
          <div className="mt-4">
            <p>Belum bayar {selectedEventId}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsIndex;
