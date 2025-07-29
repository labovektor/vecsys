"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  participantDetailSchema,
  ParticipantDetailSchemaType,
} from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCategory } from "@/features/event-category/hooks/useCategory";
import { useRegion } from "@/features/event-region/hooks/useRegion";
import { ParticipantDetail } from "../../dto";

const ParticipantDetailForm = ({
  id,
  currentVal,
}: {
  id: string;
  currentVal: ParticipantDetail;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<ParticipantDetailSchemaType>({
    resolver: zodResolver(participantDetailSchema),
    defaultValues: {
      name: currentVal?.name || "",
      category_name: currentVal?.category?.id || "",
      region_name: currentVal?.region?.id || "",
      is_verified: currentVal?.verified_at ? "verified" : "not-verified",
      institution_name: currentVal.institution?.name || "",
      pendamping_name: currentVal.institution?.pendamping_name || "",
      phone_number: currentVal.institution?.pendamping_phone || "",
    },
  });

  const { data: participant } = useQuery({
    queryKey: ["participant", id],
    queryFn: async () => {
      const res = await handleRequest<ParticipantDetail>(
        "GET",
        `/admin/participant/${id}`
      );
      if (res.error) {
        toast.error(res.error.message);
      }
      return res.data;
    },
    enabled: !!id,
  });

  async function onSubmit(values: ParticipantDetailSchemaType) {
    const payload = {
      name: values.name,
      category_id: values.category_name,
      region_id: values.region_name,
    };

    const { error } = await handleRequest<ParticipantDetail>(
      "PATCH",
      `/admin/participant/${id}`,
      payload
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Data updated");
    queryClient.refetchQueries({ queryKey: ["participant"] });
  }

  const { data: categoryData } = useCategory(participant?.event_id || "");
  const { data: regionData } = useRegion(participant?.event_id || "");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-10"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Nama Peserta</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_verified"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Terverifikasi?</FormLabel>
                <FormControl className="flex-1">
                  <RadioGroup
                    disabled
                    className="flex gap-8"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="verified" id="verified" />
                      <Label htmlFor="verified">Sudah</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="not-verified" id="not-verified" />
                      <Label htmlFor="not-verified">Belum</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Kategori</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryData?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
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
            name="region_name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Region</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="flex-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regionData?.map((region) => (
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
        </div>

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="institution_name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Nama Sekolah</FormLabel>
                <FormControl className="flex-1">
                  <Input disabled {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pendamping_name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Nama Pendamping</FormLabel>
                <FormControl className="flex-1">
                  <Input disabled {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="w-40">Nomor Telepon Pendamping</FormLabel>
                <FormControl className="flex-1">
                  <Input disabled {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-4"
            >
              {form.formState.isSubmitting
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ParticipantDetailForm;
