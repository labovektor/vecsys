"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { addInstitutionSchema, AddInstitutionType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const AddInstitutionForm = ({ callback }: { callback: VoidFunction }) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<AddInstitutionType>({
    resolver: zodResolver(addInstitutionSchema),
    defaultValues: {
      name: "",
      email: "",
      pendamping_name: "",
      pendamping_phone: "",
    },
  });

  const onSubmit = async (data: AddInstitutionType) => {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/user/data/institution",
      data
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Institusi berhasil ditambahkan");
    form.reset();
    setOpen(false);
    callback();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="link">
          Tambahkan di sini.
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Institusi</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Institusi</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Email Institusi</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>No. Telepon Pendamping</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Menambahkan..."
                : "Tambahkan dan Simpan"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInstitutionForm;
