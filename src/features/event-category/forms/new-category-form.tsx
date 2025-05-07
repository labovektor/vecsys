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
import { addCategorySchema, AddcategorySchemaType } from "../schema";
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

const AddEventCategoryDialog = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<AddcategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      is_group: false,
      visible: true,
    },
  });

  async function onSubmit(values: AddcategorySchemaType) {
    const { error } = await handleRequest<unknown>(
      "POST",
      `/admin/event/${id}/category`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    queryClient.refetchQueries({ queryKey: ["categories"] });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Tambahkan Kategori Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan Kategori Baru</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Event</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_group"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Kategori Beregu?</FormLabel>
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
              <Plus />
              {form.formState.isSubmitting
                ? "Menambahkan..."
                : "Tambah Kategori"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventCategoryDialog;
