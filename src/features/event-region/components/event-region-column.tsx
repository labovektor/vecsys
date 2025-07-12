import { ColumnDef } from "@tanstack/react-table";
import { EventRegion } from "../dto";
import DeleteRegionDialog from "../forms/delete-region-form";
import EditRegionForm from "../forms/edit-region-form";

export const evenRegionColumn: ColumnDef<EventRegion>[] = [
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
    accessorKey: "contact_name",
    header: "Nama kontak",
  },
  {
    accessorKey: "contact_number",
    header: "Nomor kontak",
  },
  {
    accessorKey: "visible",
    header: "Tampilkan di pendaftaran?",
    cell: ({ row }) => (row.getValue<boolean>("visible") ? "Ya" : "Tidak"),
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <EventCategoryAction region={row.original} />,
    enableGlobalFilter: false,
  },
];

function EventCategoryAction({ region }: { region: EventRegion }) {
  return (
    <div className=" flex gap-2">
      <DeleteRegionDialog id={region.id} />
      <EditRegionForm id={region.id} currentVal={region} />
    </div>
  );
}
