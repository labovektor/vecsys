import { ColumnDef } from "@tanstack/react-table";
import { EventCategory } from "../dto";
import EditCategoryForm from "../forms/edit-category-form";
import DeleteCategoryDialog from "../forms/delete-category-form";

export const eventCategoryColumn: ColumnDef<EventCategory>[] = [
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
    accessorKey: "is_group",
    header: "Beregu?",
    cell: ({ row }) => (row.getValue<boolean>("is_group") ? "Ya" : "Bukan"),
  },
  {
    accessorKey: "visible",
    header: "Tampilkan?",
    cell: ({ row }) => (row.getValue<boolean>("visible") ? "Ya" : "Tidak"),
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <EventCategoryAction category={row.original} />,
    enableGlobalFilter: false,
  },
];

function EventCategoryAction({ category }: { category: EventCategory }) {
  return (
    <div className=" flex gap-2">
      <DeleteCategoryDialog id={category.id} />
      <EditCategoryForm id={category.id} currentVal={category} />
    </div>
  );
}
