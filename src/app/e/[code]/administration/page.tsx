"use client";

import { cn } from "@/lib/utils";
import { CreditCard, ListTodo, Receipt, User2 } from "lucide-react";
import React from "react";

const tabs = [
  {
    id: 0,
    name: "Pilih Kategori",
    icon: <ListTodo />,
  },
  {
    id: 1,
    name: "Pilih Pembayaran",
    icon: <CreditCard />,
  },
  {
    id: 2,
    name: "Konfirmasi Pembayaran",
    icon: <Receipt />,
  },
];

const AdministrationPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0].id);
  return (
    <div className=" w-full bg-vblue-100 p-4 flex flex-col gap-5 items-center">
      <div className="flex items-center font-semibold gap-2">
        <User2 /> Data Partisipan
      </div>
      <div className=" flex gap-3">
        {tabs.map((tab, index) => (
          <div key={tab.id} className=" flex items-center">
            <div
              className="flex flex-col items-center gap-2"
              onClick={() => setSelectedTab(tab.id)}
            >
              <div
                className={cn(
                  "p-2 bg-white rounded-full",
                  index <= selectedTab && "bg-vblue-500 text-white"
                )}
              >
                {tab.icon}
              </div>
              <span className={selectedTab === tab.id ? "text-vblue-500" : ""}>
                {tab.name}
              </span>
            </div>
            {index < tabs.length - 1 && (
              <hr
                className={cn(
                  "my-2 border  w-12",
                  index < selectedTab ? "border-vblue-500" : "border-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrationPage;
