import { User2 } from "lucide-react";
import React from "react";
import StepsTab from "../components/steps-tab";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParticipantAdministrationData } from "../providers/participant-administration-data-provider";

const AdministrationDataSection = () => {
  const { steps, focusedStep } = useParticipantAdministrationData();

  return (
    <div>
      <div className=" w-full bg-vblue-100 p-4 flex flex-col gap-5 items-center">
        <div className="flex items-center font-semibold gap-2">
          <User2 /> Data Peserta
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

export default AdministrationDataSection;
