import { ColumnDef } from "@tanstack/react-table";
import { Institution } from "../dto";
import EditInstitutionForm from "../forms/edit-institution-form";
import DeleteInstitutionForm from "../forms/delete-institution-form";

export const institutionColumn: ColumnDef<Institution>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: "Nama instansi",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "pendamping_name",
    header: "Nama Pendamping",
  },
  {
    accessorKey: "pendamping_phone",
    header: "Nomor Telepon Pendamping",
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <InstitutionAction institution={row.original} />,
    enableGlobalFilter: false,
  },
];

function InstitutionAction({ institution }: { institution: Institution }) {
  return (
    <div className="flex gap-2">
      <DeleteInstitutionForm institution={institution} />
      <EditInstitutionForm institution={institution} />
    </div>
  );
}
