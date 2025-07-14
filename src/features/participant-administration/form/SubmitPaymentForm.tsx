"use client";

import { useParticipant } from "@/hooks/use-participant";
import React from "react";
import { useForm } from "react-hook-form";
import { submitPaymentSchema, SubmitPaymentType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BottomNavigatorButton from "../components/bottom-navigator-button";
import { useParticipantAdministrationProfile } from "../providers/participant-administration-profile-provider";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn, createFormData } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import handleRequest from "@/axios/request";
import { toast } from "sonner";

const SubmitPaymentForm = () => {
  const { user, refetchData } = useParticipant();
  const { toPreviousStep, selectedPayment } =
    useParticipantAdministrationProfile();
  const form = useForm<SubmitPaymentType>({
    resolver: zodResolver(submitPaymentSchema),
    defaultValues: {
      account_number: user?.participant?.payment?.bank_account ?? "",
      account_name: user?.participant?.payment?.bank_name ?? "",
      transfer_date: user?.participant?.payment?.date
        ? new Date(user?.participant?.payment?.date)
        : new Date(),
      invoice: null,
    },
  });

  const [preview, setPreview] = React.useState<string | null>(
    user?.participant?.payment?.invoice
      ? `${process.env.NEXT_PUBLIC_API_URL}${user?.participant?.payment?.invoice}`
      : null
  );

  const onSubmit = async (data: SubmitPaymentType) => {
    console.log(selectedPayment);
    const reqData = {
      ...data,
      transfer_date: data.transfer_date.toISOString(),
      payment_option_id: selectedPayment?.id,
    };
    const formData = createFormData(reqData);

    const { error } = await handleRequest<unknown>(
      "PATCH",
      `/user/administration/payment`,
      formData
    );
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Data pembayaran berhasil disimpan");

    refetchData();
    setPreview(user?.participant?.payment?.invoice ?? null);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
        {user?.participant.payment && (
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Kamu telah berhasil melakukan pembayaran</AlertTitle>
            <AlertDescription>
              Tidak ada aksi apapun yang kamu perlu lakukan sekarang. Mohon
              tunggu hingga panitia memverifikasi pembayaranmu.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Akun Pengirim</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pengirim</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transfer_date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Tanggal Transfer</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoice"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Bukti Pembayaran</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  {...fieldValues}
                  onChange={async (e) => {
                    if (!e.target.files) {
                      return;
                    }
                    const file = e.target.files[0];

                    fieldValues.onChange(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {preview && (
            <img src={preview} className=" max-h-32 object-contain" />
          )}
        </div>

        <BottomNavigatorButton
          onLeftClick={toPreviousStep}
          rightDisabled={form.formState.isSubmitting}
          rightButtonType="confirm"
        />
      </form>
    </Form>
  );
};

export default SubmitPaymentForm;
