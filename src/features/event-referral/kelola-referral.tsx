import React from "react";
import handleRequest from "@/axios/request";
import { Card, CardContent } from "@/components/ui/card";
import { EventReferral } from "./dto";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DataTable } from "@/components/table/data-table";
import AddEventReferralDialog from "./forms/new-referrral-form";
import { eventReferralColumn } from "./components/event-referral-column";

const KelolaReferral = ({ id }: { id: string }) => {
  const { data: referral, isLoading } = useQuery({
    queryKey: ["referral"],
    queryFn: async () =>
      handleRequest<EventReferral[]>("GET", `admin/event/${id}/referal`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      )
  });
  return (
    <Card className="w-full h-full bg-white">
      <CardContent>
        <DataTable 
          data={referral || []}  
          loading={isLoading}        
          columns={eventReferralColumn} 
          actions={<AddEventReferralDialog id={id}/>}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaReferral;