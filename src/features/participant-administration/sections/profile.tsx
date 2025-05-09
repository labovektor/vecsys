import {
  Check,
  CreditCard,
  ListTodo,
  MoveLeft,
  MoveRight,
  Receipt,
  User2,
} from "lucide-react";
import React from "react";
import StepsTab, { Step } from "../components/steps-tab";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { ParticipantState } from "../dto";
import { toast } from "sonner";

const SelectCategoryRegion = dynamic(
  () => import("./tabs/SelectCategoryRegion"),
  { ssr: false }
);

const steps: Step[] = [
  {
    id: 0,
    step: "registered",
    name: "Pilih Kategori",
    icon: <ListTodo />,
  },
  {
    id: 1,
    step: "categorized",
    name: "Pilih Pembayaran",
    icon: <CreditCard />,
  },
  {
    id: 2,
    step: "paid",
    name: "Konfirmasi Pembayaran",
    icon: <Receipt />,
  },
];

const AdministrationProfileSection = () => {
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

  const step = steps.find((step) => step.step === progressState?.step);
  const [selectedTab, setSelectedTab] = React.useState(step?.id ?? steps[0].id);

  const tabs = [
    {
      id: 0,
      child: <SelectCategoryRegion callback={()=>setSelectedTab((prev) => prev + 1)} />,
    },
    {
      id: 1,
      child: <div>Pilih Pembayaran</div>,
    },
    {
      id: 2,
      child: <div>Konfirmasi Pembayaran</div>,
    },
  ];

  return (
    <div>
      <div className=" w-full bg-vblue-100 p-4 flex flex-col gap-5 items-center">
        <div className="flex items-center font-semibold gap-2">
          <User2 /> Data Partisipan
        </div>
        <div className=" flex gap-3">
          <StepsTab steps={steps} selectedTab={selectedTab} />
        </div>
      </div>

      {tabs[selectedTab].child}
    </div>
  );
};

export default AdministrationProfileSection;
