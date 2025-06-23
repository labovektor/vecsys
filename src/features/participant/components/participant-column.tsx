import { ColumnDef } from "@tanstack/react-table";
import { Participant, PaymentStatus } from "../dto";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export function getParticipantColumn(status: PaymentStatus): ColumnDef<Participant>[] {
  const participantColumn: ColumnDef<Participant>[] = [
    {
      accessorKey: "id",
      header: "Nomor Peserta",
    },
    {
      accessorKey: "name",
      header: "Nama Peserta"
    },
    {
      accessorKey: "region_id",
      header: "Region"
    },
    {
      accessorKey: "category_id",
      header: "Jenjang"
    },
    {
      accessorKey: "voucher",
      header: "Voucher?"
    },
    {
      accessorKey: "verified_at",
      header: "Verifikasi?"
    },
    {
      id: "action",
      header: "Aksi",
      cell : ({row}) => <ParticipantAction participant={row.original}/>,
      enableGlobalFilter: false,
    }
  ];

  const unpaidExtraColumn: ColumnDef<Participant> = {
    accessorKey: "progress_step",
    header: "Status"
  };

  return status === "paid"
    ? participantColumn 
    : [...participantColumn.slice(0, -3), unpaidExtraColumn, ...participantColumn.slice(-3)]
}

function ParticipantAction({ participant }: { participant: Participant }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <DropdownMenuItem>Detail peserta</DropdownMenuItem>
        <DropdownMenuItem>Verifikasi</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:!bg-red-500 hover:!text-white">Tolak</DropdownMenuItem>
        <DropdownMenuItem>Cetak kartu peserta</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}