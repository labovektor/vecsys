"use client";

import handleRequest from "@/axios/request";
import { Button, buttonVariants } from "@/components/ui/button";
import { Participant } from "@/features/participant/dto";
import ParticipantDetailForm from "@/features/participant/form/participant-detail-form";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, PrinterIcon } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { toast } from "sonner";

const ParticipantDetailPage = ({ params }: { params: Promise<{id: string}> }) => {
  const { id } = use(params);
  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant-detail", id],
    queryFn: async () => handleRequest<Participant>(
      "GET", `/admin/participant/${id}`,
    ).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
      }
      return res.data;
    })
  })
  
  return (
    <>
      <div className="flex justify-between py-4 px-1">
        <h1 className="text-xl font-bold">Detail Peserta</h1>
        
        <div className="flex gap-2">

          <Link 
            href={participant?.payment ? `${process.env.NEXT_PUBLIC_API_URL}${participant?.payment?.invoice}` : `#`} 
            className={cn(buttonVariants(), "bg-gray-800 text-white")}
            target="_blank"
            rel="noopener noreferrer"
          >
             <EyeIcon/> Lihat Bukti Pembayaran
          </Link>
          <Button className="bg-gray-800 text-white">
            <PrinterIcon/> Cetak Kartu Peserta
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">Loading...</div>
      ) : participant ? (
        <ParticipantDetailForm id={id} currentVal={participant}/>
        // {/* Biodata Peserta */}
      ) : (
        <div className="flex justify-center py-8">Failed to load data.</div>
      )}
    </>
  )
}

export default ParticipantDetailPage;