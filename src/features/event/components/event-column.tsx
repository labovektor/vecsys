import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../dto";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export const eventColumn: ColumnDef<Event>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <EventAction event={row.original} />,
  },
];

function EventAction({ event }: { event: Event }) {
  return (
    <div className="flex gap-2">
      <Button size={"icon"}>
        <Edit />
      </Button>
      <Button size={"icon"} variant={"destructive"}>
        <Trash2 />
      </Button>
    </div>
  );
}
