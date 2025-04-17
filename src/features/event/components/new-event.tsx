"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { newEventSchema, NewEventSchemaType } from "../schema";
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

const NewEventDialog = () => {
  const queryClient = getQueryClient();
  const form = useForm<NewEventSchemaType>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: NewEventSchemaType) {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/admin/event",
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    queryClient.refetchQueries({ queryKey: ["events"] });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Buat Event Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buat Event Baru</DialogTitle>
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
            <Button type="submit">
              <Plus />
              Tambah Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventDialog;
