"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileSchemaType } from "../schema";
import handleRequest from "@/axios/request";
import { Profile } from "../dto";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";
import React from "react";

interface EditProfileFormProps {
  user: Profile;
  selectedImage?: File | null;
  onSubmitSuccess?: () => void;
}

const EditProfileForm = ({ user, selectedImage, onSubmitSuccess }: EditProfileFormProps) => {
  const queryClient = getQueryClient();

  const form = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      display_name: user?.display_name || "",
      email: user?.email || "",
      profile_picture: undefined,
    },
  });

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      form.reset({
        display_name: user.display_name || "",
        email: user.email || "",
        profile_picture: undefined,
      });
    }
  }, [user, form]);

  async function onSubmit(values: UpdateProfileSchemaType) {
    const formData = new FormData();
    formData.append("display_name", values.display_name);
    formData.append("email", values.email);

    // Use selected image if available
    if (selectedImage) {
      formData.append("profile_picture", selectedImage);
    } else if (values.profile_picture) {
      formData.append("profile_picture", values.profile_picture);
    }

    const { error } = await handleRequest<Profile>(
      "PATCH",
      "/admin",
      formData
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated successfully");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    // Call success callback to reset image state
    onSubmitSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-20 text-md text-black font-bold">Nama</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="Enter your display name" className="text-base" />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="w-20 text-md text-black font-bold">Email</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter your email" className="text-base" />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-8"
          >
            {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
