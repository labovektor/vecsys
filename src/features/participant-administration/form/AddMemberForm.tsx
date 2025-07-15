"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { addMemberSchema, AddMemberType } from "../schema";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createFormData } from "@/lib/utils";

const AddMemberForm = ({
  callback,
  disabled,
}: {
  callback: VoidFunction;
  disabled: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<AddMemberType>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "male",
      phone: "",
      id_number: "",
      id_card: null,
    },
  });

  const [preview, setPreview] = React.useState<string | null>(null);

  const onSubmit = async (data: AddMemberType) => {
    const formData = createFormData(data);
    const { error } = await handleRequest<unknown>(
      "POST",
      "/user/data/member",
      formData
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Anggota berhasil ditambahkan");
    form.reset();
    setOpen(false);
    callback();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" disabled={disabled} className=" w-full">
          Tambahkan Anggota <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Anggota</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className=" flex gap-3 items-center">
                  <FormLabel>Gender: </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-3"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Laki-Laki</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Perempuan</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Telepon</FormLabel>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Identitas</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Biasanya berupa NISN/NIM</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_card"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Foto Kartu Identitas</FormLabel>
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
                  <FormDescription>Biasanya berupa NISN/NIM</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              {preview && (
                <img src={preview} className=" max-h-24 object-contain" />
              )}
            </div>

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

export default AddMemberForm;
