import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../entity";

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "group_member_num",
    header: "Group Member",
  },
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "participant_target",
    header: "Participant Target",
  },
  {
    accessorKey: "period",
    header: "Period",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
