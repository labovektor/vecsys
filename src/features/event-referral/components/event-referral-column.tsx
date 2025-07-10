import { ColumnDef } from "@tanstack/react-table";
import { EventReferral } from "../dto";
import DeleteReferralDialog from "../forms/delete-referral-form";

export const eventReferralColumn: ColumnDef<EventReferral>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "code",
    header: "Kode Referral",
  },
  {
    accessorKey: "desc",
    header: "Deskripsi"
  },
  {
    accessorKey: "discount",
    header: "Diskon (%)",
  },
  {
    accessorKey: "seat_available",
    header: "Jumlah Tersedia",
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <EventReferralAction referral={row.original}/>,
    enableGlobalFilter: false
  }
];

function EventReferralAction({ referral }: {referral: EventReferral}) {
  return (
    <div className="flex gap-2">
      <DeleteReferralDialog id={referral.id}/>
    </div>
  );
}