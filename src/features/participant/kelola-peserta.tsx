import handleRequest from "@/axios/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Participant, PaymentStep } from "./dto";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getParticipantColumn } from "./components/participant-column";
import { Button } from "@/components/ui/button";
import { exportAsExcelFile } from "@/lib/xlsx";
import {
  excelBiodataColumn,
  excelParticipantColumn,
} from "./components/excel-participant-column";
import { Save } from "lucide-react";
import { BulkAddParticipantsForm } from "./form/bulk-add-participant-form";
import { ParticipantBiodata } from "../participant-administration/dto";

const KelolaPeserta = ({ id, step }: { id: string; step: PaymentStep }) => {
  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant", id, step],
    queryFn: async () =>
      handleRequest<Participant[]>(
        "GET",
        `/admin/event/${id}/participant?step=${step}`,
      ).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  const exportLockedBiodatas = async () => {
    const res = await handleRequest<ParticipantBiodata[]>(
      "GET",
      `/admin/event/${id}/biodata`,
    );
    if (res.error) {
      toast.error(res.error.message);
    }

    if (res.data) {
      exportAsExcelFile(res.data, excelBiodataColumn, `biodata-peserta`);
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardContent>
        <DataTable
          data={participant || []}
          loading={isLoading}
          columns={getParticipantColumn(step)}
          actions={(data) => (
            <div className="flex gap-2">
              <BulkAddParticipantsForm eventId={id} />
              <Button
                variant="success"
                onClick={() =>
                  exportAsExcelFile(
                    data,
                    excelParticipantColumn,
                    `peserta-${step}`,
                  )
                }
              >
                Export Peserta (XLSX)
                <Save />
              </Button>
              <Button variant="success" onClick={exportLockedBiodatas}>
                Export Biodata Dikunci (XLSX)
                <Save />
              </Button>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaPeserta;
