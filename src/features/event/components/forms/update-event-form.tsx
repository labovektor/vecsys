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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateEventSchemaType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      name: event.name,
      desc: event.desc,
      group_member_num: event.group_member_num,
      participant_target: event.participant_target,
      period: event.period,
    },
  });

  async function onSubmit(values: UpdateEventSchemaType) {
    try {
      setIsSubmitting(true);

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
      } const { error } = await handleRequest(
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

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the event");
    } finally {
      setIsSubmitting(false);
    }
  }

  // log image url
  console.log(event.icon);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group_member_num" render={({ field }) => (
            <FormItem>
              <FormLabel>Group Member Number</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value || ''} />
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
                <p className="text-sm text-gray-500">Current icon:</p>
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
              <FormLabel>Participant Target</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period" render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Event"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateEventForm;
