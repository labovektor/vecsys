"use client";

import handleRequest from "@/axios/request";
import { Button, buttonVariants } from "@/components/ui/button";
import { ParticipantDetail } from "@/features/participant/dto";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import BiodataPeserta from "@/features/participant/components/detail/biodata-peserta";
import { EyeIcon, PrinterIcon } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { toast } from "sonner";
import ParticipantDetailForm from "@/features/participant/form/detail/participant-detail-form";
import { getBaseURL } from "@/axios/axios";
import { arrayBufferDownload } from "@/lib/array_buffer_downloader";

const ParticipantDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant", id],
    queryFn: async () =>
      handleRequest<ParticipantDetail>("GET", `/admin/participant/${id}`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
            throw new Error(res.error.message);
          }
          return res.data;
        },
      ),
  });

  const getParticipantCard = async () => {
    if (participant) {
      const { error, data } = await handleRequest<ArrayBuffer>(
        "GET",
        `/admin/participant/${participant.id}/card`,
        undefined,
        "arraybuffer",
      );
      if (error || !data) {
        if (error) toast.error(error.message);
        return;
      }

      arrayBufferDownload(data, `kartu_peserta_${participant.name}.pdf`);
    }
  };

  return (
    <>
      <div className="flex justify-between py-4 px-1">
        <h1 className="text-xl font-bold">Detail Peserta</h1>

        <div className="flex gap-2">
          <Link
            href={
              participant?.payment
                ? `${getBaseURL()}${participant?.payment?.invoice}`
                : `#`
            }
            className={cn(buttonVariants(), "bg-gray-800 text-white")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <EyeIcon /> Lihat Bukti Pembayaran
          </Link>
          <Button
            className="bg-gray-800 text-white"
            onClick={getParticipantCard}
          >
            <PrinterIcon /> Cetak Kartu Peserta
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Loading...</div>
      ) : participant ? (
        <div>
          <ParticipantDetailForm id={id} currentVal={participant} />
          <BiodataPeserta participantId={id} participant={participant} />
        </div>
      ) : (
        <div className="flex justify-center py-8">Failed to load data.</div>
      )}
    </>
  );
};

export default ParticipantDetailPage;
