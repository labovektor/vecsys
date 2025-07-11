import EventDashboardData from "@/features/dashboard/dashboard-data";
import ChooseEvent from "@/features/participant/components/choose-event";
import React from "react";

const Dashboard = () => {
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-bold">Hello, Vektorian!</h1>
      <ChooseEvent />
      <EventDashboardData />
    </section>
  );
};

export default Dashboard;
