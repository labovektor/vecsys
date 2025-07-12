"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { EventCategoriesNRegions } from "../../dto";
import { toast } from "sonner";
import PickCategoryRegionForm from "../../form/PickCategoryRegionForm";

const SelectCategoryRegion = () => {
  const { data: categorynregions, isLoading } = useQuery({
    queryKey: ["categorynregions"],
    queryFn: () =>
      handleRequest<EventCategoriesNRegions>(
        "GET",
        "/user/administration/category"
      ).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
    staleTime: Infinity,
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center py-8">Loading event data...</div>
      ) : categorynregions ? (
        <PickCategoryRegionForm choices={categorynregions} />
      ) : (
        <div className="flex justify-center py-8">
          Failed to load event data
        </div>
      )}
    </div>
  );
};

export default SelectCategoryRegion;
