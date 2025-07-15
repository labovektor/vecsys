"use client";

import React from "react";
import BiodataAnggotaForm from "../../form/detail/biodata-anggota-form";
import { UpdateBiodatasSchemaType } from "../../schema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import handleRequest from "@/axios/request";
import { useRouter, useSearchParams } from "next/navigation";
import { ParticipantDetail } from "../../dto";

interface BiodataPesertaProps {
  participantId: string;
  participant?: ParticipantDetail;
}

const BiodataPeserta = ({ participantId, participant }: BiodataPesertaProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const formRefs = React.useRef<{ [key: string]: any }>({});

  const biodataMembers = React.useMemo(() => {
    return participant?.biodata || [];
  }, [participant?.biodata]);

  const handleFormRef = (anggotaNumber: number, formRef: any) => {
    formRefs.current[`anggota${anggotaNumber}`] = formRef;
  };

  const handleHapusPeserta = useMutation({
    mutationKey: ["deleteParticipant", participantId],
    mutationFn: () => {
      return handleRequest("DELETE", `/admin/participant/${participantId}`).then(res => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
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

  const handleSimpanPerubahan = useMutation({
    mutationKey: ["updateBiodatas", participantId],
    mutationFn: () => {
      const biodataArray: UpdateBiodatasSchemaType = [];

      biodataMembers.forEach((existingMember, index) => {
        const anggotaNumber = index + 1;
        const formRef = formRefs.current[`anggota${anggotaNumber}`];

        if (formRef) {
          const formValues = formRef.getValues();

          biodataArray.push({
            ...formValues,
            id: existingMember.id,
          });
        } else if (existingMember) {
          // Fallback to existing data if form ref is not available
          biodataArray.push({
            id: existingMember.id,
            name: existingMember.name,
            gender: existingMember.gender,
            email: existingMember.email,
            phone: existingMember.phone,
            id_number: existingMember.id_number,
            id_card_picture: existingMember.id_card_picture
          });
        }
      });

      if (biodataArray.length === 0) {
        throw new Error("No biodata to save. No existing biodata found.");
      }

      return handleRequest<any>("PATCH", `/admin/participant/${participantId}/biodatas`, biodataArray).then(res => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
      });
    },
    onSuccess: () => {
      toast.success("Biodata berhasil disimpan");
      queryClient.refetchQueries({ queryKey: ["participant", participantId] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Biodata Anggota</h2>
      </div>

      <div className={`grid gap-6 ${biodataMembers.length === 1 ? 'grid-cols-1 max-w-md' :
        biodataMembers.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
          'grid-cols-1 lg:grid-cols-3'
        }`}>
        {biodataMembers.length > 0 ? (
          biodataMembers.map((member, index) => (
            <BiodataAnggotaForm
              key={member.id || index}
              anggotaNumber={index + 1}
              initialData={{
                id: member.id,
                name: member.name,
                gender: member.gender,
                email: member.email,
                phone: member.phone,
                id_number: member.id_number,
                id_card_picture: member.id_card_picture
              }}
              onFormRef={(formRef) => handleFormRef(index + 1, formRef)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Tidak ada biodata ditemukan untuk peserta ini.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button
          variant="destructive"
          onClick={() => handleHapusPeserta.mutate()}
          disabled={handleHapusPeserta.isPending}
        >
          <TrashIcon className="mr-1" />
          {handleHapusPeserta.isPending ? "Menghapus..." : "Hapus Peserta"}
        </Button>

        <Button
          onClick={() => handleSimpanPerubahan.mutate()}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={handleSimpanPerubahan.isPending}
        >
          {handleSimpanPerubahan.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
};

export default BiodataPeserta;