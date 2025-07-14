"use client";

import { useParticipant } from "@/hooks/use-participant";
import React from "react";
import { useParticipantAdministrationData } from "../../providers/participant-administration-data-provider";
import BottomNavigatorButton from "../../components/bottom-navigator-button";
import AddMemberForm from "../../form/AddMemberForm";
import MemberCard from "../../components/member-card";

const ManageMember = () => {
  const { user, refetchData } = useParticipant();
  const { toNextStep, toPreviousStep } = useParticipantAdministrationData();

  const canAddMember = () => {
    if (user && user.participant.category) {
      if (!user.participant.category.is_group) {
        if (user.participant.biodata && user.participant.biodata.length >= 1) {
          return false;
        }
        return true;
      } else {
        if (
          user.participant.biodata &&
          user.participant.biodata.length >=
            user.participant.event?.group_member_num
        ) {
          return false;
        }
        return true;
      }
    }
    return false;
  };
  return (
    <div className=" space-y-3">
      {user && (
        <>
          {user.participant.biodata?.map((biodata, index) => (
            <MemberCard
              key={biodata.id}
              biodata={biodata}
              index={index + 1}
              callBack={refetchData}
              canDelete
            />
          ))}
          <div className=" max-w-md mx-auto">
            <AddMemberForm callback={refetchData} disabled={!canAddMember()} />
          </div>
          <BottomNavigatorButton
            onLeftClick={toPreviousStep}
            rightDisabled={
              !user?.participant.biodata ||
              user?.participant.biodata.length <= 0
            }
            onRightClick={toNextStep}
          />
        </>
      )}
    </div>
  );
};

export default ManageMember;
