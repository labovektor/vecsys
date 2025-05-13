import handleRequest from "@/axios/request";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { evenRegionColumn } from "./components/event-region-column";
import AddEventCategoryDialog from "./forms/new-region-form";
import { EventRegion } from "./dto";

const KeloaRegion = ({ id }: { id: string }) => {
  const { data: regions, isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: async () =>
      handleRequest<EventRegion[]>("GET", `/admin/event/${id}/region`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
  });
  return (
    <Card className="w-full h-full bg-white ">
      <CardContent>
        <DataTable
          data={regions || []}
          loading={isLoading}
          columns={evenRegionColumn}
          actions={<AddEventCategoryDialog id={id} />}
        />
      </CardContent>
    </Card>
  );
};

export default KeloaRegion;
