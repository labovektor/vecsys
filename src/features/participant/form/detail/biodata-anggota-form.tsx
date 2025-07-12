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

interface BiodataAnggotaFormProps {
  anggotaNumber: number;
  participantId: string;
  initialData?: Partial<BiodataAnggotaSchemaType>;
  onSubmit?: (data: BiodataAnggotaSchemaType) => void;
}

const BiodataAnggotaForm = ({
  anggotaNumber,
  participantId,
  initialData,
  onSubmit
}: BiodataAnggotaFormProps) => {
  const form = useForm<BiodataAnggotaSchemaType>({
    resolver: zodResolver(biodataAnggotaSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      gender: initialData?.gender || "laki-laki",
      no_telepon: initialData?.no_telepon || "",
      nis_nisn: initialData?.nis_nisn || "",
      email: initialData?.email || "",
    },
  });

  const handleSubmit = (data: BiodataAnggotaSchemaType) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log(`Anggota ${anggotaNumber} data:`, data);
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">Anggota {anggotaNumber}</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nama"
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
                      <RadioGroupItem value="laki-laki" id={`laki-${anggotaNumber}`} />
                      <Label htmlFor={`laki-${anggotaNumber}`}>Laki-Laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perempuan" id={`perempuan-${anggotaNumber}`} />
                      <Label htmlFor={`perempuan-${anggotaNumber}`}>Perempuan</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_telepon"
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
            name="nis_nisn"
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
