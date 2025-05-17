import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { PaymentOption } from "./dto";
import { toast } from "sonner";
import { paymentOptionColumn } from "./components/payment-option-column";
import NewPaymentOptionForm from "./forms/new-payment-option-form";

const KelolaPayment = ({ id }: { id: string }) => {
  const { data: paymentOptions, isLoading } = useQuery({
    queryKey: ["payment-options", id],
    queryFn: async () =>
      handleRequest<PaymentOption[]>("GET", `/admin/event/${id}/payment-option`).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
          }
          return res.data;
        }
      ),
  });

  return (
    <Card className="w-full h-full bg-white">
      <CardContent>
        <DataTable
          data={paymentOptions || []}
          loading={isLoading}
          columns={paymentOptionColumn}
          actions={<NewPaymentOptionForm id={id} />}
        />
      </CardContent>
    </Card>
  );
};

export default KelolaPayment;
