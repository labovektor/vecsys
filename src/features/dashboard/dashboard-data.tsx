"use client";

import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
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
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { Event } from "@/features/event/dto";
import { Participant } from "@/features/participant/dto";

const EventDashboardData = () => {
  const searchParams = useSearchParams();
  const selectedEventId = searchParams.get("eventId");

  const { data: eventData, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["event", selectedEventId],
    queryFn: async () => {
      if (!selectedEventId) return null;
      return handleRequest<Event>("GET", `/event/${selectedEventId}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      });
    },
    enabled: !!selectedEventId,
  });

  const { data: participantsData, isLoading: isLoadingParticipants } = useQuery({
    queryKey: ["participants", selectedEventId],
    queryFn: async () => {
      if (!selectedEventId) return [];
      return handleRequest<Participant[]>("GET", `/admin/event/${selectedEventId}/participant?step=all`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data || [];
      });
    },
    enabled: !!selectedEventId,
  });

  // Fetch paid participants for category breakdown
  const { data: participantsPaidData, isLoading: isLoadingPaid } = useQuery({
    queryKey: ["participantsPaid", selectedEventId],
    queryFn: async () => {
      if (!selectedEventId) return [];
      return handleRequest<Participant[]>("GET", `/admin/event/${selectedEventId}/participant?step=paid`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data || [];
      });
    },
    enabled: !!selectedEventId,
  });

  if (isLoadingEvent || isLoadingParticipants || isLoadingPaid || !selectedEventId) {
    return <div className="text-center">Loading...</div>;
  }

  // Calculate statistics from participants data
  const totalParticipants = participantsData?.length || 0;
  const finalTarget = eventData?.participant_target || 0;
  const progress = finalTarget > 0 ? (totalParticipants / finalTarget) * 100 : 0;

  // Calculate participant statistics by progress_step
  const paidParticipants = participantsData?.filter(p => p.progress_step === "paid" || p.progress_step === "verified" || p.progress_step === "locked").length || 0;
  const unpaidParticipants = totalParticipants - paidParticipants;
  const waitingConfirmation = participantsData?.filter(p => p.progress_step === "registered" || p.progress_step === "categorized").length || 0;
  const lockedParticipants = participantsData?.filter(p => p.progress_step === "locked").length || 0;

  const currentTarget = selectedEventId ? totalParticipants : 0;
  const sudahBayar = selectedEventId ? paidParticipants : 0;
  const belumBayar = selectedEventId ? unpaidParticipants : 0;
  const menungguKonfirmasi = selectedEventId ? waitingConfirmation : 0;



  return (
    <>
      <div className="space-y-1.5">
        <div className="flex gap-1">
          <p className="text-sm">Target Peserta: </p>
          <p className="text-sm font-bold">{`${currentTarget}/${finalTarget}`}</p>
        </div>
        <Progress key={selectedEventId} value={progress} className="h-[10]" />
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
              <h1 className="text-2xl font-bold">{menungguKonfirmasi}</h1>
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
              {/* Using dummy 0 as no exam data available yet */}
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
                {belumBayar}
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
              <h1 className="text-2xl font-bold">{sudahBayar}</h1>
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
              {/* Using dummy 0 as no exam data available yet */}
              <h1 className="text-2xl font-bold">0</h1>
            </CardContent>
          </div>
          <div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>
      </div>
      <EventDashboardChart
        eventId={selectedEventId}
        participantsAll={participantsData}
        participantsPaid={participantsPaidData}
      />
    </>
  );
};

export default EventDashboardData;
