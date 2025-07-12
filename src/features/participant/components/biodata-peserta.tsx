"use client";

import React from "react";
import BiodataAnggotaForm from "../form/detail/biodata-anggota-form";
import { BiodataAnggotaSchemaType } from "../schema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface BiodataPesertaProps {
  participantId: string;
  initialData?: {
    anggota1?: Partial<BiodataAnggotaSchemaType>;
    anggota2?: Partial<BiodataAnggotaSchemaType>;
    anggota3?: Partial<BiodataAnggotaSchemaType>;
  };
}

const BiodataPeserta = ({ participantId, initialData }: BiodataPesertaProps) => {
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

  const handleHapusPeserta = () => {
    console.log("Hapus peserta clicked for participant:", participantId);
  };

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
          onClick={handleHapusPeserta}
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