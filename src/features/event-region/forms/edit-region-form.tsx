"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { editRegionSchema, EditRegionSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { EventRegion } from "../dto";

const EditRegionForm = ({
  id,
  currentVal,
}: {
  id: string;
  currentVal: Partial<EventRegion>;
}) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<EditRegionSchemaType>({
    resolver: zodResolver(editRegionSchema),
    defaultValues: {
      name: currentVal.name || "",
      contact_name: currentVal.contact_name || "",
      contact_number: currentVal.contact_number || "",
      visible: currentVal.visible || true,
    },
  });

  async function onSubmit(values: EditRegionSchemaType) {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      `/admin/region/${id}`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    toast.success("Region updated");
    queryClient.refetchQueries({ queryKey: ["regions"] });
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
          <DialogTitle>Ubah Region</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Region</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kontak</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Telepon Kontak</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Tampilkan di Pendaftaran?</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Memperbarui..." : "Ubah Region"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRegionForm;
