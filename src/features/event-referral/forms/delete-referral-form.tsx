"use client";

import handleRequest from "@/axios/request";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteReferralDialog = ({ id }: { id: string }) => {
  const queryClient = getQueryClient();
  const deleteReferral = useMutation({
    mutationKey: [id],
    mutationFn: () => handleRequest("DELETE", `/admin/referal/${id}`).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }
      toast.success("Berhasil menghapus kode referral");
      queryClient.refetchQueries({ queryKey: ["referral"] });
    })
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={deleteReferral.isPending}
        >
          <Trash2/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin ingin menghapus kode referral ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive"})}
            onClick={() => deleteReferral.mutate()}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};

export default DeleteReferralDialog;