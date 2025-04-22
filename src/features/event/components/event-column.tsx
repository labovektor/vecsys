import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../dto";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const handleEdit = () => {
    router.push(`/dashboard/event/${event.id}`);
  }

  return (
    <div className="flex gap-2">
      <Button size={"icon"} onClick={handleEdit}>
        <Edit />
      </Button>
      <Button size={"icon"} variant={"destructive"}>
        <Trash2 />
      </Button>
    </div>
  );
}
