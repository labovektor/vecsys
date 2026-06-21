"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import handleRequest from "@/axios/request";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Event } from "../../dto";
import { UpdateEventSchemaType, updateEventSchema } from "../../schema";
import { createFormData } from "@/lib/utils";
import { CircleOff } from "lucide-react";
import { getQueryClient } from "@/lib/get-query-client";
import { getBaseURL } from "@/axios/axios";

interface UpdateEventFormProps {
  eventId: string;
  event: Event;
}

const UpdateEventForm = ({ eventId, event }: UpdateEventFormProps) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const [preview, setPreview] = useState<string | undefined>(
    event.icon && `${getBaseURL()}${event.icon}`,
  );

  const form = useForm<UpdateEventSchemaType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      name: event.name ?? "",
      slug: event.slug ?? "",
      desc: event.desc ?? "",
      group_member_num: event.group_member_num ?? 3,
      participant_target: event.participant_target ?? 0,
      period: event.period ?? "",
      icon: null,
    },
  });

  async function onSubmit(values: UpdateEventSchemaType) {
    const data = createFormData(values);

    const res = await handleRequest<unknown>(
      "PATCH",
      `/admin/event/${eventId}`,
      data,
    );

    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success("Event updated");
    queryClient.refetchQueries({ queryKey: ["events"] });
    queryClient.refetchQueries({ queryKey: [eventId] });
    router.replace(`/dashboard/event/${eventId}?event_name=${values.name}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nama Event" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Deskripsi Event" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder="my-event" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Slug adalah parameter url yang akan diakses peserta. Misalnya
                peserta akan melihat link sebagai vecsys.com/e/[slug]/login
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group_member_num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Beregu</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Jumlah Beregu" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" space-y-2">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { value, ...fieldValues } = field;
              return (
                <FormItem>
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
              );
            }}
          />

          <div>
            {preview ? (
              <div className=" w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src={preview} alt="Preview" className=" object-contain" />
              </div>
            ) : (
              <CircleOff className=" text-muted-foreground" />
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="participant_target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Peserta</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Target Peserta" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Periode Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Priode Event" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            className=""
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateEventForm;
