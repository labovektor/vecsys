"use client";

import handleRequest from "@/axios/request";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteRegionDialog = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const deleteRegion = useMutation({
    mutationKey: [id],
    mutationFn: () =>
      handleRequest("DELETE", `/admin/region/${id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("Berhasil hapus region");
        queryClient.refetchQueries({ queryKey: ["regions"] });
      }),
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={deleteRegion.isPending}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Kamu Benar-Benar Yakin?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteRegion.mutate()}
          >
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRegionDialog;
