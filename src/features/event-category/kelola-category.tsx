import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { DataTable } from "@/components/table/data-table";
import { eventCategoryColumn } from "./components/event-category-column";
import AddEventCategoryDialog from "./forms/new-category-form";
import { useCategory } from "./hooks/useCategory";

const KelolaCategory = ({ id }: { id: string }) => {
  const { data: categories, isLoading } = useCategory(id);

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
