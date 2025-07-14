"use client";

import handleRequest from "@/axios/request";
import { ParticipantProgressStep } from "@/features/participant/dto";
import { Loader, Lock, School, SquareUserRound } from "lucide-react";
import React, { useContext, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { ParticipantState } from "../dto";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const SelectInstitution = dynamic(
  () => import("../sections/tabs/SelectInstitution"),
  { ssr: false }
);

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
    child: <>Isi Biodata</>,
  },
  {
    id: 2,
    step: "fill_biodatas",
    name: "Kunci Data",
    icon: <Lock />,
    child: <>Kunci Data</>,
  },
];

interface ParticipantAdministrationDataContextType {
  steps: Step[];
  focusedStep: Step;
  isLoading: boolean;
  toPreviousStep: VoidFunction;
  toNextStep: VoidFunction;
  reloadData: VoidFunction;
}

export const ParticipantAdministrationDataContext =
  React.createContext<ParticipantAdministrationDataContextType>(
    {} as ParticipantAdministrationDataContextType
  );

export function ParticipantAdministrationDataProvider({
  children,
}: ParticipantAdministrationDataProviderProps) {
  const [selectedTab, setSelectedTab] = React.useState(steps[0]);

  const {
    data: progressState,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["progress"],
    queryFn: () =>
      handleRequest<ParticipantState>("GET", "/user/state").then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });

  useEffect(() => {
    const step = steps.find((step) => step.step === progressState?.step);

    if (step) {
      setSelectedTab(step);
    }
  }, [progressState]);

  const toNextStep = () => {
    setSelectedTab((prev) => {
      const currentStep = steps.findIndex((step) => step.id === prev.id);
      if (currentStep === steps.length - 1) {
        return prev;
      }
      return steps[currentStep + 1];
    });
  };

  const reloadData = () => {
    refetch();
  };

  const toPreviousStep = () => {
    setSelectedTab((prev) => {
      const currentStep = steps.findIndex((step) => step.id === prev.id);
      if (currentStep === 0) {
        return prev;
      }
      return steps[currentStep - 1];
    });
  };

  const memoedValue = useMemo(
    () => ({
      steps,
      focusedStep: selectedTab,
      isLoading,
      toPreviousStep,
      toNextStep,
      reloadData,
    }),
    [selectedTab, isLoading, progressState, isLoading]
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
      "The App Context must be used within an ParticipantAdministrationDataContext"
    );
  }

  return context;
}
