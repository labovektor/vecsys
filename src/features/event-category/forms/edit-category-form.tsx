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
import { editCategorySchema, EditCategorySchemaType } from "../schema";
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
import { EventCategory } from "../dto";

const EditCategoryForm = ({
  id,
  currentVal,
}: {
  id: string;
  currentVal: Partial<EventCategory>;
}) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<EditCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: currentVal.name || "",
      is_group: currentVal.is_group || false,
      visible: currentVal.visible || true,
    },
  });

  async function onSubmit(values: EditCategorySchemaType) {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      `/admin/category/${id}`,
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);
    toast.success("Kategori updated");
    queryClient.refetchQueries({ queryKey: ["categories"] });
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
          <DialogTitle>Ubah Kategori</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
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
              {form.formState.isSubmitting ? "Memperbarui..." : "Ubah Kategori"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryForm;
