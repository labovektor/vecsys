import handleRequest from "@/axios/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Participant, PaymentStatus } from "../dto";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { getParticipantColumn } from "./participant-column";

const KelolaPeserta = ({ id, status }: { id: string; status: PaymentStatus; }) => {
  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant", status],
    queryFn: async () =>
      handleRequest<Participant[]>("GET", `/admin/event/${id}/participant?status=${status}`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
  });
  
  return (
    <Card className="w-full h-full bg-white">
      <CardContent>
        <DataTable
          data={participant || []}
          loading={isLoading}
          columns={getParticipantColumn(status)}
          // actions={}
          />
      </CardContent>
    </Card>
  );
};

export default KelolaPeserta;