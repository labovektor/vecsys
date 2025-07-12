import { User2 } from "lucide-react";
import React from "react";
import StepsTab from "../components/steps-tab";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParticipantAdministrationProfile } from "../providers/participant-administration-profile-provider";

const AdministrationProfileSection = () => {
  const { steps, focusedStep } = useParticipantAdministrationProfile();

  return (
    <div>
      <div className=" w-full bg-vblue-100 p-4 flex flex-col gap-5 items-center">
        <div className="flex items-center font-semibold gap-2">
          <User2 /> Data Partisipan
        </div>
        <div className=" flex gap-3">
          <StepsTab steps={steps} selectedTab={focusedStep.id} />
        </div>
      </div>

      <div className=" p-3">
        <Card className=" bg-white">
          <CardHeader />
          <CardContent>{focusedStep.child}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdministrationProfileSection;
