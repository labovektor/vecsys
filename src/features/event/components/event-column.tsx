import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../dto";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useMutation } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";

export const eventColumn: ColumnDef<Event>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <EventAction event={row.original} />,
    enableGlobalFilter: false,
  },
];

function EventAction({ event }: { event: Event }) {
  const queryClient = getQueryClient();
  const deleteEvent = useMutation({
    mutationKey: [event.id],
    mutationFn: () =>
      handleRequest("DELETE", `/admin/event/${event.id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("Berhasil hapus event");
        queryClient.refetchQueries({ queryKey: ["events"] });
      }),
  });
  return (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/event/${event.id}?event_name=${event.name}`}
        className={buttonVariants({ variant: "default", size: "icon" })}
      >
        <Edit />
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"destructive"}
            disabled={deleteEvent.isPending}
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
              onClick={() => deleteEvent.mutate()}
            >
              Konfirmasi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
