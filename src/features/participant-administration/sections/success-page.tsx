"use client";

import handleRequest from "@/axios/request";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParticipant } from "@/hooks/use-participant";
import { Bookmark, Eye } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const SuccessPage = () => {
  const { user } = useParticipant();
  const [loading, setLoading] = React.useState(false);
  const getParticipantCard = async () => {
    setLoading(true);
    const { error, data } = await handleRequest<any>(
      "GET",
      "/user/data/card",
      undefined,
      "arraybuffer"
    );
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `kartu_peserta_${user?.participant.name}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Bersihkan
    link.remove();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className=" p-3">
      <Card className=" bg-white">
        <CardHeader className=" flex flex-col items-center text-center">
          <Image src="/success.svg" alt="Success" width={200} height={200} />
          <CardTitle>Selamat!</CardTitle>
          <CardDescription>
            Kamu telah berhasil mendaftar event ini. Apa yang selanjutnya ingin
            kamu lakukan?
          </CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3 items-center">
          <Button onClick={getParticipantCard} disabled={loading}>
            <Eye /> Cetak Kartu Peserta
          </Button>
          <Button disabled>
            <Bookmark /> Cetak Sertifikat
          </Button>
          <p className=" text-sm text-muted-foreground">
            Sertifikat belum tersedia saat ini, kamu dapat mengunduh saat sudah
            tersedia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
