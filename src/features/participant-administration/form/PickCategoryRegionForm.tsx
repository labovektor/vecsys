"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { pickCategoryRegionSchema, PickCategoryRegionType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParticipant } from "@/hooks/use-participant";
import { EventCategoriesNRegions } from "../dto";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BottomNavigatorButton from "../components/bottom-navigator-button";
import { useParticipantAdministrationProfile } from "../providers/participant-administration-profile-provider";

const PickCategoryRegionForm = ({
  choices,
}: {
  choices: EventCategoriesNRegions;
}) => {
  const { user } = useParticipant();
  const { toNextStep, reloadData } = useParticipantAdministrationProfile();
  const form = useForm<PickCategoryRegionType>({
    resolver: zodResolver(pickCategoryRegionSchema),
    defaultValues: {
      category_id: user?.participant?.category_id ?? "",
      region_id: user?.participant?.region_id ?? "",
    },
  });

  const onSubmit = async (data: PickCategoryRegionType) => {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      "/user/administration/category",
      data
    );

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Data berhasil disimpan");
    toNextStep();
    reloadData();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Kategori</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {choices.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Region</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {choices.regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <BottomNavigatorButton
          leftDisabled
          rightDisabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default PickCategoryRegionForm;
