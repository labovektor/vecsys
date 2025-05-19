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
import { Institution } from "../dto";

const DeleteInstitutionForm = ({ institution }: { institution: Institution }) => {
  const queryClient = getQueryClient();
  const deleteInstitution = useMutation({
    mutationKey: [institution.id],
    mutationFn: () =>
      handleRequest("DELETE", `/admin/institution/${institution.id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("instansi berhasil dihapus");
        queryClient.refetchQueries({ queryKey: ["institutions", institution.event_id] });
      }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={deleteInstitution.isPending}
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
            onClick={() => deleteInstitution.mutate()}
          >
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInstitutionForm;
