"use client";

import handleRequest from "@/axios/request";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { PaymentOption } from "../dto";

const DeletePaymentOptionForm = ({ payment }: { payment: PaymentOption }) => {
  const queryClient = getQueryClient();
  const deletePayment = useMutation({
    mutationKey: [payment.id],
    mutationFn: () =>
      handleRequest("DELETE", `/admin/payment-option/${payment.id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("Metode pembayaran berhasil dihapus");
        queryClient.refetchQueries({ queryKey: ["payment-options", payment.event_id] });
      }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={deletePayment.isPending}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Kamu Benar-Benar Yakin?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deletePayment.mutate()}
          >
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePaymentOptionForm;
