import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getQueryClient } from "@/lib/get-query-client";
import { useForm } from "react-hook-form";
import {
  participantDetailSchema,
  ParticipantDetailSchemaType,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ParticipantDetailForm = ({
  id,
}: // currentVal
{
  id: string;
  // currentVal: Partial<Participant>;
}) => {
  const queryClient = getQueryClient();
  const form = useForm<ParticipantDetailSchemaType>({
    resolver: zodResolver(participantDetailSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
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
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Terverifikasi?</FormLabel>
                <FormControl className="flex-1">
                  <RadioGroup className="flex gap-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="verified" />
                      <Label>Sudah</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="not-verified" />
                      <Label>Belum</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Event</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Region</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Nama Sekolah</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Nama Pendamping</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <FormLabel className="w-40">Nomor Telepon Pendamping</FormLabel>
                <FormControl className="flex-1">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button className="px-4">Simpan Perubahan</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ParticipantDetailForm;
