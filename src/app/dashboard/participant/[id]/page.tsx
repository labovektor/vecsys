"use client";

import { Button } from "@/components/ui/button";
import ParticipantDetailForm from "@/features/participant/form/participant-detail-form";
import BiodataPeserta from "@/features/participant/components/biodata-peserta";
import { EyeIcon, PrinterIcon } from "lucide-react";
import React, { use } from "react";

const ParticipantDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

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
        <BiodataPeserta participantId={id} />
      </div>
    </div>
  )
}

export default ParticipantDetailPage;