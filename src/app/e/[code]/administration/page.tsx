"use client";
import handleRequest from "@/axios/request";
import { ParticipantState } from "@/features/participant-administration/dto";
import AdministrationProfileSection from "@/features/participant-administration/sections/profile";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const AdministrationPage = () => {
  const { data: progressState, isLoading } = useQuery({
    queryKey: ["progress"],
    queryFn: () =>
      handleRequest<ParticipantState>("GET", "/user/state").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center py-8">Loading event data...</div>
      )}

      {!progressState?.is_verified && <AdministrationProfileSection />}

      {progressState?.is_verified && (
        <div className="flex justify-center py-8">
          Verified Tab: {progressState.step}
        </div>
      )}

      {progressState?.is_locked && (
        <div className="flex justify-center py-8">
          Locked Tab: {progressState.step}
        </div>
      )}

      <div className=" py-4 text-center">©2024 | VecSys by HIMATIKA Vektor</div>
    </div>
  );
};

export default AdministrationPage;
