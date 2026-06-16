import { ColumnDef } from "@tanstack/react-table";
import { Participant, PaymentStep } from "../dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";

export function getParticipantColumn(
  status: PaymentStep,
): ColumnDef<Participant>[] {
  const participantColumn: ColumnDef<Participant>[] = [
    {
      accessorKey: "id",
      header: "Nomor Peserta",
    },
    {
      accessorKey: "name",
      header: "Nama Peserta",
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => {
        const region = row.original.region;
        return region ? region.name : "-";
      },
    },
    {
      accessorKey: "category",
      header: "Jenjang",
      cell: ({ row }) => {
        const category = row.original.category;
        return category ? category.name : "-";
      },
    },
    {
      accessorKey: "voucher",
      header: "Voucher?",
    },
    {
      accessorKey: "verified_at",
      header: "Verifikasi?",
      cell: ({ row }) => {
        const isVerified = row.original.verified_at;
        return (
          <span
            className={cn(
              "px-2 py-1 rounded-full",
              isVerified
                ? "bg-green-200 text-green-600"
                : "bg-red-200 text-red-600",
            )}
          >
            {isVerified ? "Sudah" : "Belum"}
          </span>
        );
      },
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => <ParticipantAction participant={row.original} />,
      enableGlobalFilter: false,
    },
  ];

  const unpaidExtraColumn: ColumnDef<Participant> = {
    accessorKey: "progress_step",
    header: "Status",
  };

  return status === "paid"
    ? participantColumn
    : [
        ...participantColumn.slice(0, -3),
        unpaidExtraColumn,
        ...participantColumn.slice(-3),
      ];
}

function ParticipantAction({ participant }: { participant: Participant }) {
  const router = useRouter();
  const queryClient = getQueryClient();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const toDetailClick = () =>
    router.push(`/dashboard/participant/${participant.id}?eventId=${eventId}`);

  const handleVerifyPeserta = useMutation({
    mutationKey: ["verifyParticipant", participant.id],
    mutationFn: () =>
      handleRequest(
        "PATCH",
        `/admin/participant/${participant.id}/verify`,
      ).then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
      }),
    onSuccess: () => {
      toast.success("Peserta berhasil diverifikasi");
      queryClient.invalidateQueries({ queryKey: ["participant"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <DropdownMenuItem onClick={toDetailClick}>
          Detail peserta
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleVerifyPeserta.mutate()}>
          Verifikasi
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:!bg-red-500 hover:!text-white">
          Tolak
        </DropdownMenuItem>
        <DropdownMenuItem>Cetak kartu peserta</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
