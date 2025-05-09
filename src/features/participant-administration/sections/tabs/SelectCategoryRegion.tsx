"use client";

import React from "react";
import BottomNavigatorButton from "../../components/bottom-navigator-button";
import { useParticipant } from "@/hooks/use-participant";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { EventCategoriesNRegions } from "../../dto";
import { toast } from "sonner";

interface SelectCategoryRegionProps {
  callback: VoidFunction
}

const SelectCategoryRegion = ({callback}: SelectCategoryRegionProps) => {
  const {data: categorynregions, isLoading} = useQuery({
    queryKey: ["categorynregions"],
    queryFn: () =>
      handleRequest<EventCategoriesNRegions>("GET", "/user/administration/category").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
      staleTime: Infinity
  });

  return <div className=" space-y-2">
    
    <BottomNavigatorButton leftDisabled  />
  </div>;
};

export default SelectCategoryRegion;
