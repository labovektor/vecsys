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
import { useParticipant } from "@/hooks/use-participant";
import { useParticipantAdministrationData } from "../providers/participant-administration-data-provider";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import InstitutionCard from "../components/institution-card";

const PickInstitutionForm = ({ choices }: { choices: Institution[] }) => {
  const { user, refetchData } = useParticipant();
  const { toNextStep } = useParticipantAdministrationData();
  const [selectedInstitution, setSelectedInstitution] =
    React.useState<Institution | null>(
      user?.participant.institution_id
        ? choices.find(
            (institution) => institution.id === user?.participant.institution_id
          ) ?? null
        : null
    );

  const form = useForm<PickInstitutionType>({
    resolver: zodResolver(pickInstitutionSchema),
    defaultValues: {
      institution_id: user?.participant.institution_id ?? "",
    },
  });

  const onSubmit = async (data: PickInstitutionType) => {
    const { error } = await handleRequest<unknown>(
      "PATCH",
      "/user/data/institution",
      data
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Institusi berhasil dipilih");
    form.reset();
    toNextStep();
    refetchData();
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="institution_id"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 items-center">
                  <FormLabel className=" text-nowrap">
                    Pilih Institusi
                  </FormLabel>
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
                                  form.setValue(
                                    "institution_id",
                                    institution.id
                                  );
                                  setSelectedInstitution(institution);
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

          {selectedInstitution && (
            <InstitutionCard institution={selectedInstitution} />
          )}

          <BottomNavigatorButton
            leftDisabled
            rightDisabled={form.formState.isSubmitting}
          />
        </form>
      </Form>
      <div className=" pt-5">
        <span className=" text-sm text-center ">
          Tidak menemukan sekolah/kampusmu?{" "}
          <AddInstitutionForm
            callback={() => {
              toNextStep();
              refetchData();
            }}
          />
        </span>
      </div>
    </>
  );
};

export default PickInstitutionForm;
