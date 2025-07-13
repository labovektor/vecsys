"use client";

import { Button } from "@/components/ui/button";
import ParticipantDetailForm from "@/features/participant/form/participant-detail-form";
import BiodataPeserta from "@/features/participant/components/biodata-peserta";
import { EyeIcon, PrinterIcon } from "lucide-react";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { ParticipantDetail } from "@/features/participant/dto";
import { toast } from "sonner";

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
        <div className="flex justify-between py-4 px-1">
          <h1 className="text-xl font-bold">Detail Peserta</h1>
          <div className="flex gap-2">
            <Button className="bg-gray-800 text-white">
              <EyeIcon /> Lihat Bukti Pembayaran
            </Button>
            <Button className="bg-gray-800 text-white">
              <PrinterIcon /> Cetak Kartu Peserta
            </Button>
          </div>
        </div>

        <ParticipantDetailForm id={id} />
      </div>

      <div className="">
        <BiodataPeserta participantId={id} participant={participant} />
      </div>
    </div>
  )
}

export default ParticipantDetailPage;