import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../dto";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

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

  return (
    <div className="flex gap-2">
      <Link href={`/dashboard/event/${event.id}?event_name=${event.name}`} className={buttonVariants({ variant: 'default', size: 'icon' })}>
        <Edit />
      </Link>
      <Button size={"icon"} variant={"destructive"}>
        <Trash2 />
      </Button>
    </div>
  );
}
