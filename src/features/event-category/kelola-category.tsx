import handleRequest from "@/axios/request";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { EventCategory } from "./dto";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { eventCategoryColumn } from "./components/event-category-column";
import AddEventCategoryDialog from "./forms/new-category-form";

const KelolaCategory = ({ id }: { id: string }) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      handleRequest<EventCategory[]>("GET", `/admin/event/${id}/category`).then(
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
          data={categories || []}
          loading={isLoading}
          columns={eventCategoryColumn}
          actions={<AddEventCategoryDialog id={id} />}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaCategory;
