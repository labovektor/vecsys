"use client";

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import handleRequest from '@/axios/request';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Event } from '../../dto';
import { UpdateEventSchemaType, updateEventSchema } from '../../schema';
import { getQueryClient } from '@/lib/get-query-client';

interface UpdateEventFormProps {
  eventId: string;
  event: Event;
}

const UpdateEventForm = ({ eventId, event }: UpdateEventFormProps) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateEventSchemaType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      name: event.name || "",
      desc: event.desc || "",
      group_member_num: event.group_member_num || 0,
      participant_target: event.participant_target || 0,
      period: event.period || "",
    },
  });

  async function onSubmit(values: UpdateEventSchemaType) {
    try {

      const formData = new FormData();
      if (values.name) {
        formData.append("name", values.name);
      }
      if (values.desc) {
        formData.append("desc", values.desc);
      }
      if (values.group_member_num) {
        formData.append("group_member_num", values.group_member_num.toString());
      }
      if (values.participant_target) {
        formData.append("participant_target", values.participant_target.toString());
      }
      if (values.period) {
        formData.append("period", values.period);
      }

      const iconFile = fileInputRef.current?.files?.[0];
      if (iconFile) {
        formData.append("icon", iconFile);
      } const { error } = await handleRequest<unknown>(
        "PATCH",
        `/admin/event/${eventId}`,
        formData
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Event updated successfully");

      queryClient.invalidateQueries({ queryKey: ["event"] });

      const newEventName = values.name || event.name;
      router.push(`/dashboard/event/${eventId}?event_name=${newEventName}`);

      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the event");
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Nama Event'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc" render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Deskripsi Event'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group_member_num" render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Beregu</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder='Jumlah Beregu'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <div>
          <FormLabel htmlFor="icon">Icon</FormLabel>
          <Input
            id="icon"
            name="icon"
            type="file"
            ref={fileInputRef}
            accept="image/*"
          />          
          <div className="mt-2">
            {event.icon ? (
              <div className="flex flex-col items-start gap-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${event.icon}`} 
                  alt={`${event.name} icon`}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain rounded border border-gray-200"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No icon set</p>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="participant_target" render={({ field }) => (
            <FormItem>
              <FormLabel>Target Peserta</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder='Target Peserta'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period" render={({ field }) => (
            <FormItem>
              <FormLabel>Periode Event</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Priode Event'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end w-full'>
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
