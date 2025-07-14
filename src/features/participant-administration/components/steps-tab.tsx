import { cn } from "@/lib/utils";
import { Step } from "@/features/participant-administration/providers/participant-administration-profile-provider";
import React from "react";

const StepsTab = ({
  steps,
  selectedTab,
}: {
  steps: Step[];
  selectedTab: number;
}) => {
  return steps.map((tab, index) => (
    <div key={tab.id} className=" flex items-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "p-2 bg-white rounded-full",
            index <= selectedTab && "bg-vblue-500 text-white"
          )}
        >
          {tab.icon}
        </div>
        <span
          className={cn(
            " text-sm text-center",
            selectedTab === tab.id ? "text-vblue-500" : ""
          )}
        >
          {tab.name}
        </span>
      </div>
      {index < steps.length - 1 && (
        <hr
          className={cn(
            "my-2 border  w-12",
            index < selectedTab ? "border-vblue-500" : "border-gray-300"
          )}
        />
      )}
    </div>
  ));
};

export default StepsTab;
