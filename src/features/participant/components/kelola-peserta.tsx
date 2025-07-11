import handleRequest from "@/axios/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Participant, PaymentStep } from "../dto";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getParticipantColumn } from "./participant-column";
import { Button } from "@/components/ui/button";
import { exportAsExcelFile } from "@/lib/xlsx";
import { excelParticipantColumn } from "./excel-participant-column";
import { Save } from "lucide-react";
import { BulkAddParticipantsForm } from "../form/bulk-add-participant-form";

const KelolaPeserta = ({ id, step }: { id: string; step: PaymentStep }) => {
  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant", id, step],
    queryFn: async () =>
      handleRequest<Participant[]>(
        "GET",
        `/admin/event/${id}/participant?step=${step}`
      ).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  return (
    <Card className="w-full h-full bg-white">
      <CardContent>
        <DataTable
          data={participant || []}
          loading={isLoading}
          columns={getParticipantColumn(step)}
          actions={(data, table) => (
            <div className="flex gap-2">
              <BulkAddParticipantsForm eventId={id} />
              <Button
                variant="success"
                onClick={() =>
                  exportAsExcelFile(
                    data,
                    excelParticipantColumn,
                    `peserta-${step}`
                  )
                }
              >
                Export ke Excel
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
