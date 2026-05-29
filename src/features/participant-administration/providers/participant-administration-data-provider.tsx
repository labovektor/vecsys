"use client";

import handleRequest from "@/axios/request";
import { ParticipantProgressStep } from "@/features/participant/dto";
import { Loader, Lock, School, SquareUserRound } from "lucide-react";
import React, { useContext, useMemo } from "react";
import { toast } from "sonner";
import { ParticipantState } from "../dto";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const SelectInstitution = dynamic(
  () => import("../sections/tabs/SelectInstitution"),
  { ssr: false },
);

const ManageMember = dynamic(() => import("../sections/tabs/ManageMember"), {
  ssr: false,
});

const LockData = dynamic(() => import("../sections/tabs/LockData"), {
  ssr: false,
});

type ParticipantAdministrationDataProviderProps = {
  children: React.ReactNode;
};

export interface Step {
  id: number;
  step: ParticipantProgressStep;
  name: string;
  icon: React.ReactNode;
  child: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 0,
    step: "verified",
    name: "Isi Data Institusi",
    icon: <School />,
    child: <SelectInstitution />,
  },
  {
    id: 1,
    step: "select_institution",
    name: "Isi Biodata Peserta",
    icon: <SquareUserRound />,
    child: <ManageMember />,
  },
  {
    id: 2,
    step: "fill_biodatas",
    name: "Kunci Data",
    icon: <Lock />,
    child: <LockData />,
  },
];

interface ParticipantAdministrationDataContextType {
  steps: Step[];
  focusedStep: Step;
  isLoading: boolean;
  toPreviousStep: VoidFunction;
  toNextStep: VoidFunction;
}

export const ParticipantAdministrationDataContext =
  React.createContext<ParticipantAdministrationDataContextType>(
    {} as ParticipantAdministrationDataContextType,
  );

export function ParticipantAdministrationDataProvider({
  children,
}: ParticipantAdministrationDataProviderProps) {
  const [stepIndexOverride, setStepIndexOverride] = React.useState<number | null>(null);

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

  const stepIndex = useMemo(() => {
    if (stepIndexOverride !== null) return stepIndexOverride;
    const idx = steps.findIndex((s) => s.step === progressState?.step);
    return idx >= 0 ? idx : 0;
  }, [stepIndexOverride, progressState]);

  const selectedTab = steps[stepIndex];

  const memoedValue = useMemo(
    () => ({
      steps,
      focusedStep: selectedTab,
      isLoading,
      toNextStep: () => {
        setStepIndexOverride((prev) => {
          const currentIdx = prev ?? steps.findIndex((s) => s.step === progressState?.step);
          if (currentIdx < 0 || currentIdx >= steps.length - 1) return prev;
          return currentIdx + 1;
        });
      },
      toPreviousStep: () => {
        setStepIndexOverride((prev) => {
          const currentIdx = prev ?? steps.findIndex((s) => s.step === progressState?.step);
          if (currentIdx <= 0) return prev;
          return currentIdx - 1;
        });
      },
    }),
    [selectedTab, isLoading, progressState],
  );

  return (
    <ParticipantAdministrationDataContext.Provider value={memoedValue}>
      {isLoading ? <Loader className="animate-spin mx-auto" /> : children}
    </ParticipantAdministrationDataContext.Provider>
  );
}

export function useParticipantAdministrationData() {
  const context = useContext(ParticipantAdministrationDataContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an ParticipantAdministrationDataContext",
    );
  }

  return context;
}
