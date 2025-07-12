// components/UploadParticipantsForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createFormData, csvToText } from "@/lib/utils";
import handleRequest from "@/axios/request";
import { getQueryClient } from "@/lib/get-query-client";

export const BulkAddParticipantsForm = ({ eventId }: { eventId: string }) => {
  const queryClient = getQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm();
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvPreview, setCsvPreview] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const onSubmit = async () => {
    if (!csvFile) return;

    const data = createFormData({
      file: csvFile,
    });

    const { error } = await handleRequest<unknown>(
      "POST",
      `/admin/event/${eventId}/participant/bulk`,
      data
    );

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Peserta berhasil ditambahkan");
    setOpen(false);
    queryClient.refetchQueries({
      queryKey: ["participant", eventId, "unpaid"],
    });
  };

  const handleCsvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const textPromise = csvToText(file);
      const text = await textPromise;
      if (
        !text.includes("name") ||
        !text.includes("email") ||
        !text.includes("password")
      ) {
        setCsvError("CSV harus mengandung kolom name, email, dan password");
        setCsvPreview(null);
        return;
      }

      setCsvError(null);
      setCsvPreview(text.slice(0, 300) + (text.length > 300 ? "..." : ""));
      setCsvFile(file);
    } catch (err) {
      setCsvError("Gagal membaca file CSV");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setCsvError(null);
        setCsvPreview(null);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          Import dari CSV
          <CloudUpload />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3xl">
        <DialogHeader>
          <DialogTitle>Tambahkan Peserta</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvChange}
                    />
                  </FormControl>
                  {csvError && (
                    <p className="text-sm text-red-600">{csvError}</p>
                  )}
                  {csvPreview && (
                    <pre className="bg-muted max-h-32 overflow-x-auto rounded p-2 text-xs">
                      {csvPreview}
                    </pre>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!csvFile || form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Mengunggah..." : "Tambah Peserta"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
