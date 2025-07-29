"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { InstitutionSchemaType, institutionSchema } from "../schema";
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

const NewInstitutionForm = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<InstitutionSchemaType>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      name: "",
      email: "",
      pendamping_name: "",
      pendamping_phone: "",
    },
  });

  async function onSubmit(values: InstitutionSchemaType) {
    const { error } = await handleRequest<unknown>(
      "POST",
      `/admin/event/${id}/institution`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    form.reset();
    toast.success("instansi berhasil ditambahkan");
    queryClient.refetchQueries({ queryKey: ["institutions", id] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Tambah instansi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah instansi</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Instansi</FormLabel>
                  <FormControl>
                    <Input placeholder="nama instansi" {...field} />
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
                  <FormLabel>Email Instansi</FormLabel>
                  <FormControl>
                    <Input placeholder="email instansi" {...field} />
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
                    <Input placeholder="nama pendamping" {...field} />
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
                    <Input placeholder="nomor telepon pendamping" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <Plus />
                {form.formState.isSubmitting
                  ? "Menambahkan..."
                  : "Tambah instansi"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInstitutionForm;
