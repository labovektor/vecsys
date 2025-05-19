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
import { InstitutionSchemaType, institutionSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { Institution } from "../dto";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getQueryClient } from "@/lib/get-query-client";
import { Pencil } from "lucide-react";

const EditInstitutionForm = ({ institution }: { institution: Institution }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<InstitutionSchemaType>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      name: institution.name,
      email: institution.email,
      pendamping_name: institution.pendamping_name,
      pendamping_phone: institution.pendamping_phone,
    },
  });

  async function onSubmit(values: InstitutionSchemaType) {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      `/admin/institution/${institution.id}`,
      values
    );
    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    toast.success("Informasi instansi berhasil diperbarui");
    queryClient.refetchQueries({ queryKey: ["institutions", institution.event_id] });
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
          <DialogTitle>Edit instansi</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama instansi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama instansi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pendamping_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pendamping</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama pendamping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pendamping_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon Pendamping</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor telepon pendamping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Memperbarui..." : "Ubah instansi"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstitutionForm;
