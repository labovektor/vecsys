"use client";

import { Button } from "@/components/ui/button";
import ParticipantDetailForm from "@/features/participant/form/detail/participant-detail-form";
import BiodataPeserta from "@/features/participant/components/detail/biodata-peserta";
import { EyeIcon, PrinterIcon } from "lucide-react";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { ParticipantDetail } from "@/features/participant/dto";
import { toast } from "sonner";
import Header from "@/features/participant/components/detail/header";

const ParticipantDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data: participant, isLoading, error } = useQuery({
    queryKey: ["participant", id],
    queryFn: async () =>
      handleRequest<ParticipantDetail>("GET", `/admin/participant/${id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          throw new Error(res.error.message);
        }
        return res.data;
      }),
  });

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-white space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !participant) {
    return (
      <div className="p-4 border rounded-lg bg-white">
        <div className="text-center text-red-500">
          <p>Failed to load participant data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white space-y-6">
      <div className="">
        <Header participantId={id} />
        <ParticipantDetailForm id={id} />
      </div>

      <div className="">
        <BiodataPeserta participantId={id} participant={participant} />
      </div>
    </div>
  )
}

export default ParticipantDetailPage;