"use client";

import EventDashboardData from "@/features/dashboard/dashboard-data";
import ChooseEvent from "@/features/participant/components/choose-event";
import React from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/features/participant/components/empty-state";

const Dashboard = () => {
    const searchParams = useSearchParams();
    const selectedEventId = searchParams.get("eventId");

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-bold">Hello, Vektorian!</h1>
      <ChooseEvent />
      {selectedEventId ? (
        <EventDashboardData />
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default Dashboard;
