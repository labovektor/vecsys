"use client";

import { Institution } from "@/features/event-instansi/dto";
import React from "react";
import { pickInstitutionSchema, PickInstitutionType } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import BottomNavigatorButton from "../components/bottom-navigator-button";
import AddInstitutionForm from "./AddInstitutionForm";

const PickInstitutionForm = ({ choices }: { choices: Institution[] }) => {
  const form = useForm<PickInstitutionType>({
    resolver: zodResolver(pickInstitutionSchema),
    defaultValues: {
      institution_id: "",
    },
  });

  const onSubmit = async (data: PickInstitutionType) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="institution_id"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel className=" text-nowrap">Pilih Institusi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? choices.find(
                              (institution) => institution.id === field.value
                            )?.name
                          : "Pilih Institusi"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Cari Institusi Tersedia..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          Tidak ada institusi Tersedia.
                        </CommandEmpty>
                        <CommandGroup>
                          {choices.map((institution) => (
                            <CommandItem
                              value={institution.id}
                              key={institution.id}
                              onSelect={() => {
                                form.setValue("institution_id", institution.id);
                              }}
                            >
                              {institution.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  institution.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className=" text-sm text-center ">
          Tidak menemukan sekolah/kampusmu?{" "}
          <AddInstitutionForm callback={() => {}} />
        </span>

        <BottomNavigatorButton
          leftDisabled
          rightDisabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default PickInstitutionForm;
