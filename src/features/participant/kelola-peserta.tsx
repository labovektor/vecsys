import handleRequest from "@/axios/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Participant, PaymentStep } from "./dto";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getParticipantColumn } from "./components/participant-column";
import { Button } from "@/components/ui/button";

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
              <Button>Import</Button>
              <Button>Export</Button>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaPeserta;
