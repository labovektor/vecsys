"use client";

import { getQueryClient } from "@/lib/get-query-client";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { addReferralSchema, AddReferralSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const AddEventReferralDialog = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<AddReferralSchemaType>({
    resolver: zodResolver(addReferralSchema),
    defaultValues: {
      code: "",
      desc: "",
      seat_available: undefined,
      discount: 0
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        code: "",
        desc: "",
        seat_available: undefined,
        is_discount: false,
        discount: 0
      });
    }
  }, [form, open]);

  const isDiscountChecked = useWatch({
    control: form.control,
    name: "is_discount",
    defaultValue: false
  });

  async function onSubmit(values: AddReferralSchemaType)  {
    const { error } = await handleRequest<unknown>(
      "POST",
      `admin/event/${id}/referal`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    queryClient.refetchQueries({ queryKey: ["referral"] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Tambahkan Kode Referral Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan Kode Referral Baru</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Referral</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
              
            <FormField
              control={form.control}
              name="seat_available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Tersedia</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value === undefined ? "" : field.value}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_discount"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      />
                  </FormControl>
                  <FormLabel>Diskon?</FormLabel>
                </FormItem>
              )}
            />

            {isDiscountChecked && (
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diskon (%)</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Plus/>
              {form.formState.isSubmitting
                ? "Menambahkan..."
                : "Tambah Kode"
              }
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventReferralDialog;