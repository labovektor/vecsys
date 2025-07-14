"use client";

import handleRequest from "@/axios/request";
import { ParticipantProgressStep } from "@/features/participant/dto";
import { CreditCard, ListTodo, Loader, Receipt } from "lucide-react";
import React, { useContext, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { ParticipantState } from "../dto";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { PaymentOption } from "@/features/event-payment/dto";

const SelectCategoryRegion = dynamic(
  () => import("../sections/tabs/SelectCategoryRegion"),
  { ssr: false }
);

const SelectPayment = dynamic(() => import("../sections/tabs/SelectPayment"), {
  ssr: false,
});

const SubmitPayment = dynamic(() => import("../sections/tabs/SubmitPayment"), {
  ssr: false,
});

type ParticipantAdministrationProfileProviderProps = {
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
    step: "registered",
    name: "Pilih Kategori",
    icon: <ListTodo />,
    child: <SelectCategoryRegion />,
  },
  {
    id: 1,
    step: "categorized",
    name: "Pilih Pembayaran",
    icon: <CreditCard />,
    child: <SelectPayment />,
  },
  {
    id: 2,
    step: "paid",
    name: "Konfirmasi Pembayaran",
    icon: <Receipt />,
    child: <SubmitPayment />,
  },
];

interface ParticipantAdministrationProfileContextType {
  steps: Step[];
  focusedStep: Step;
  isLoading: boolean;
  toPreviousStep: VoidFunction;
  toNextStep: VoidFunction;
  selectedPayment: PaymentOption | null;
  setSelectedPayment: React.Dispatch<
    React.SetStateAction<PaymentOption | null>
  >;
}

export const ParticipantAdministrationProfileContext =
  React.createContext<ParticipantAdministrationProfileContextType>(
    {} as ParticipantAdministrationProfileContextType
  );

export function ParticipantAdministrationProfileProvider({
  children,
}: ParticipantAdministrationProfileProviderProps) {
  const [selectedPayment, setSelectedPayment] =
    React.useState<PaymentOption | null>(null);
  const [selectedTab, setSelectedTab] = React.useState(steps[0]);

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
      selectedPayment,
      setSelectedPayment,
    }),
    [selectedTab, isLoading, selectedPayment, progressState, isLoading]
  );

  return (
    <ParticipantAdministrationProfileContext.Provider value={memoedValue}>
      {isLoading ? <Loader className="animate-spin mx-auto" /> : children}
    </ParticipantAdministrationProfileContext.Provider>
  );
}

export function useParticipantAdministrationProfile() {
  const context = useContext(ParticipantAdministrationProfileContext);

  if (!context) {
    throw new Error(
      "The App Context must be used within an ParticipantAdministrationProfileContext"
    );
  }

  return context;
}
