"use client";

import React from "react";
import BiodataAnggotaForm from "../form/detail/biodata-anggota-form";
import { BiodataAnggotaSchemaType } from "../schema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import handleRequest from "@/axios/request";
import { useRouter, useSearchParams } from "next/navigation";
interface BiodataPesertaProps {
  participantId: string;
  initialData?: {
    anggota1?: Partial<BiodataAnggotaSchemaType>;
    anggota2?: Partial<BiodataAnggotaSchemaType>;
    anggota3?: Partial<BiodataAnggotaSchemaType>;
  };
}

const BiodataPeserta = ({ participantId, initialData }: BiodataPesertaProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [formData, setFormData] = React.useState<{
    anggota1?: BiodataAnggotaSchemaType;
    anggota2?: BiodataAnggotaSchemaType;
    anggota3?: BiodataAnggotaSchemaType;
  }>({});

  const handleAnggotaSubmit = (anggotaNumber: number, data: BiodataAnggotaSchemaType) => {
    setFormData(prev => ({
      ...prev,
      [`anggota${anggotaNumber}`]: data
    }));
  };

  const handleHapusPeserta = useMutation({
    mutationKey: ["deleteParticipant", participantId],
    mutationFn: () => {
      return handleRequest("DELETE", `/admin/participant/${participantId}`).then(res => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        queryClient.refetchQueries({ queryKey: ["participant", participantId] });
      });
    },
    onSuccess: () => {
      toast.success("Peserta berhasil dihapus");
      router.push(`/dashboard/participant?eventId=${eventId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSimpanPerubahan = () => {
    console.log("Save all changes for participant:", participantId);
    console.log("All form data:", formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Biodata Anggota</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BiodataAnggotaForm
          anggotaNumber={1}
          participantId={participantId}
          initialData={initialData?.anggota1}
          onSubmit={(data) => handleAnggotaSubmit(1, data)}
        />

        <BiodataAnggotaForm
          anggotaNumber={2}
          participantId={participantId}
          initialData={initialData?.anggota2}
          onSubmit={(data) => handleAnggotaSubmit(2, data)}
        />

        <BiodataAnggotaForm
          anggotaNumber={3}
          participantId={participantId}
          initialData={initialData?.anggota3}
          onSubmit={(data) => handleAnggotaSubmit(3, data)}
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button
          variant="destructive"
          onClick={() => handleHapusPeserta.mutate()}
        >
          <TrashIcon className="mr-1" />
          Hapus Peserta
        </Button>

        <Button
          onClick={handleSimpanPerubahan}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

export default BiodataPeserta;