import handleRequest from "@/axios/request";
import { Institution } from "@/features/event-instansi/dto";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import PickInstitutionForm from "../../form/PickInstitutionForm";

const SelectInstitution = () => {
  const { data: institutions, isLoading } = useQuery({
    queryKey: ["institutions"],
    queryFn: () =>
      handleRequest<Institution[]>("GET", "/user/data/institution").then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
    staleTime: Infinity,
  });
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center py-8">Loading event data...</div>
      ) : institutions ? (
        <PickInstitutionForm choices={institutions} />
      ) : (
        <div className="flex justify-center py-8">
          Failed to load institution data
        </div>
      )}
    </div>
  );
};

export default SelectInstitution;
