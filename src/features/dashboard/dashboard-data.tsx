"use client";

import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  CircleCheckBig,
  Hash,
  PenTool,
  TriangleAlert,
  Users2,
} from "lucide-react";
import EventDashboardChart from "./dashboard-chart";

const EventDashboardData = () => {
  const searchParams = useSearchParams();
  const selectedEventId = searchParams.get("eventId");

  // HARDCODE (Temp data)
  const currentTarget = 1257;
  const finalTarget = 5000;
  const sudahBayarMas = 410;
  let progress = (currentTarget / finalTarget) * 100;

  return (
    <>
      <div className="space-y-1.5">
        <div className="flex gap-1">
          <p className="text-sm">Target Peserta: </p>
          <p className="text-sm font-bold">{`${currentTarget}/${finalTarget}`}</p>{" "}
          {/*hardcode*/}
        </div>
        <Progress value={progress} className="h-[10]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <Card className="bg-white flex items-center justify-between px-6 ">
          <div className="bg-[#211951] rounded-full p-3">
            <Users2 className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2">
              <CardDescription>Total Peserta</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <h1 className="text-2xl font-bold">{currentTarget}</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        <Card className="bg-white flex items-center justify-between px-6">
          <div className="bg-[#FFCC00] rounded-full p-3">
            <Hash className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2 ">
              <CardDescription>Menunggu Konfirmasi</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2 ">
              <h1 className="text-2xl font-bold">58</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        <Card className="bg-white flex items-center justify-between px-6">
          <div className="bg-[#5677FC] rounded-full p-3">
            <PenTool className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2">
              <CardDescription>Ujian Aktif</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <h1 className="text-2xl font-bold">0</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        <Card className="bg-white flex items-center justify-between px-6">
          <div className="bg-[#FF3B30] rounded-full p-3">
            <TriangleAlert className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2">
              <CardDescription>Belum Membayar</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <h1 className="text-2xl font-bold">
                {currentTarget - sudahBayarMas}
              </h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        <Card className="bg-white flex items-center justify-between px-6">
          <div className="bg-[#34C759] rounded-full p-3">
            <CircleCheckBig className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2">
              <CardDescription>Sudah Membayar</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <h1 className="text-2xl font-bold">{sudahBayarMas}</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        <Card className="bg-white flex items-center justify-between px-6">
          <div className="bg-[#11C495] rounded-full p-3">
            <PenTool className="text-white w-6 h-6" />
          </div>
          <div>
            <CardHeader className="p-0 pt-2 ">
              <CardDescription>Total Ujian</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2 ">
              <h1 className="text-2xl font-bold">3</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>
      </div>
      <EventDashboardChart />
    </>
  );
};

export default EventDashboardData;
