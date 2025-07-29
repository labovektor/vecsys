"use client";

import { useParticipant } from "@/hooks/use-participant";
import React from "react";
import BottomNavigatorButton from "../../components/bottom-navigator-button";
import { useParticipantAdministrationData } from "../../providers/participant-administration-data-provider";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import InstitutionCard from "../../components/institution-card";
import MemberCard from "../../components/member-card";
import { getQueryClient } from "@/lib/get-query-client";

const LockData = () => {
  const queryClient = getQueryClient();
  const { user } = useParticipant();
  const { toPreviousStep } = useParticipantAdministrationData();
  const [locking, setLocking] = React.useState(false);
  const lockData = async () => {
    setLocking(true);

    const { error } = await handleRequest<unknown>("PATCH", "/user/data/lock");
    setLocking(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Data berhasil dikunci");
    queryClient.refetchQueries({ queryKey: ["progress"] });
  };
  return (
    <div className=" space-y-3">
      <section className=" text-center w-full max-w-md mx-auto space-y-2">
        <h2 className=" text-lg font-bold text-error">Perhatian!</h2>
        <p className=" text-muted-foreground">
          Pastikan data di bawah sudah benar lalu tekan selesai. data tidak
          dapat diubah setelahnya!
        </p>
      </section>

      <section className=" text-center w-full max-w-md mx-auto  space-y-2">
        <h3 className="  font-bold">Data Institusi:</h3>
        {user?.participant.institution ? (
          <InstitutionCard institution={user.participant.institution} />
        ) : (
          "Kamu belum memilih institusi"
        )}
      </section>

      <section className="  w-full max-w-md mx-auto  space-y-2">
        <h3 className="  font-bold text-center">Biodata Tim:</h3>
        {user?.participant.biodata && user?.participant.biodata?.length > 0
          ? user.participant.biodata.map((biodata, index) => (
              <MemberCard
                key={biodata.id}
                biodata={biodata}
                index={index + 1}
                canDelete={false}
              />
            ))
          : "Kamu belum mengisi biodata tim"}
      </section>

      <BottomNavigatorButton
        onLeftClick={toPreviousStep}
        rightButtonType="confirm"
        onRightClick={lockData}
        rightDisabled={locking}
      />
    </div>
  );
};

export default LockData;
