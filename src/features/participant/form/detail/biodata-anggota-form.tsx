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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { biodataAnggotaSchema, BiodataAnggotaSchemaType } from "../../schema";
import { useEffect } from "react";

interface BiodataAnggotaFormProps {
  anggotaNumber: number;
  initialData: BiodataAnggotaSchemaType;
  onSubmit?: (data: BiodataAnggotaSchemaType) => void;
  onFormRef?: (form: any) => void;
}

const BiodataAnggotaForm = ({
  anggotaNumber,
  initialData,
  onSubmit,
  onFormRef
}: BiodataAnggotaFormProps) => {
  const form = useForm<BiodataAnggotaSchemaType>({
    resolver: zodResolver(biodataAnggotaSchema),
    defaultValues: {
      id: initialData.id,
      name: initialData.name,
      gender: initialData.gender,
      phone: initialData.phone,
      id_number: initialData.id_number,
      email: initialData.email,
    },
  });

  useEffect(() => {
    if (onFormRef) {
      onFormRef(form);
    }
  }, [form, onFormRef]);

  const handleSubmit = (data: BiodataAnggotaSchemaType) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">Anggota {anggotaNumber}</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Hidden field for ID */}
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <input type="hidden" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-32">Nama</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} placeholder="Masukkan nama lengkap" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-32">Gender</FormLabel>
                <FormControl className="flex-1">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id={`male-${anggotaNumber}`} />
                      <Label htmlFor={`male-${anggotaNumber}`}>Laki-Laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id={`female-${anggotaNumber}`} />
                      <Label htmlFor={`female-${anggotaNumber}`}>Perempuan</Label>
                    </div>
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
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-32">No Telepon</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} placeholder="08xxxxxxxxxx" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_number"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-32">NIS/NISN</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} placeholder="Masukkan NIS/NISN" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-32">Email</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} type="email" placeholder="example@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="text-blue-600 border-blue-600"
            >
              Lihat Kartu Identitas
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BiodataAnggotaForm;
