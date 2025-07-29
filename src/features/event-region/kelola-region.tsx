import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { DataTable } from "@/components/table/data-table";
import { evenRegionColumn } from "./components/event-region-column";
import AddEventCategoryDialog from "./forms/new-region-form";
import { useRegion } from "./hooks/useRegion";

const KeloaRegion = ({ id }: { id: string }) => {
  const { data: regions, isLoading } = useRegion(id);
  
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
