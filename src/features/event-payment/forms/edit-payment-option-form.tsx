"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaymentOptionSchemaType, paymentOptionSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { PaymentOption } from "../dto";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getQueryClient } from "@/lib/get-query-client";
import { Pencil } from "lucide-react";

const EditPaymentOptionForm = ({ payment }: { payment: PaymentOption }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);
  const [asQr, setAsQr] = React.useState(payment.as_qr);

  const form = useForm<PaymentOptionSchemaType>({
    resolver: zodResolver(paymentOptionSchema),
    defaultValues: {
      provider: payment.provider,
      account: payment.account,
      name: payment.name,
      as_qr: payment.as_qr,
    },
  });

  async function onSubmit(values: PaymentOptionSchemaType) {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      `/admin/payment-option/${payment.id}`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["payment-options", payment.event_id] });
    toast.success("Metode pembayaran berhasil diperbarui");
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Metode Pembayaran</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama provider" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pemilik Akun</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama pemilik akun" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="as_qr"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tampilkan Sebagai QR?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        const isQr = value === "true";
                        field.onChange(isQr);
                        setAsQr(isQr);
                      }}
                      defaultValue={field.value ? "true" : "false"}
                      className="flex flex-row space-x-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="edit_as_qr_yes" />
                        <Label htmlFor="edit_as_qr_yes">Ya</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="edit_as_qr_no" />
                        <Label htmlFor="edit_as_qr_no">Tidak</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {asQr ? "URL QR Code" : "Nomor Rekening"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        asQr
                          ? "Masukkan URL gambar QR Code"
                          : "Masukkan nomor rekening"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Memperbarui..." : "Ubah Pembayaran"}
            </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentOptionForm;
