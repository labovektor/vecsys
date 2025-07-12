"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { EventPaymentOptions } from "../../dto";
import { toast } from "sonner";
import PickPaymentForm from "../../form/PickPaymentForm";

const SelectPayment = () => {
  const { data: paymentOptions, isLoading } = useQuery({
    queryKey: ["payment-options"],
    queryFn: () =>
      handleRequest<EventPaymentOptions>(
        "GET",
        "/user/administration/payment"
      ).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
    staleTime: Infinity,
  });
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center py-8">Loading event data...</div>
      ) : paymentOptions ? (
        <PickPaymentForm options={paymentOptions} />
      ) : (
        <div className="flex justify-center py-8">
          Failed to load payment options data
        </div>
      )}
    </div>
  );
};

export default SelectPayment;
