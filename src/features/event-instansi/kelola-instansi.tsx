import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { Institution } from "./dto";
import { toast } from "sonner";
import { institutionColumn } from "./components/institution-column"; 
import NewInstitutionForm from "./forms/new-institution-form";

const KelolaInstansi = ({ id }: { id: string }) => {
  const { data: institutions, isLoading } = useQuery({
    queryKey: ["institutions", id],
    queryFn: async () =>
      handleRequest<Institution[]>("GET", `/admin/event/${id}/institution`).then(
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
          data={institutions || []}
          loading={isLoading}
          columns={institutionColumn}
          actions={<NewInstitutionForm id={id} />}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaInstansi;
