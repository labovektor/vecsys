import { ColumnDef } from "@tanstack/react-table";
import { PaymentOption } from "../dto";
import EditPaymentOptionForm from "../forms/edit-payment-option-form";
import DeletePaymentOptionForm from "../forms/delete-payment-option-form";

export const paymentOptionColumn: ColumnDef<PaymentOption>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "provider",
    header: "Nama Provider",
  },
  {
    accessorKey: "account",
    header: "Nomor Rekening",
  },
  {
    accessorKey: "name",
    header: "Nama Pemilik Akun",
  },
  {
    accessorKey: "as_qr",
    header: "Tampilkan Sebagai QR?",
    cell: ({ row }) => (row.getValue<boolean>("as_qr") ? "Ya" : "Tidak"),
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => <PaymentOptionAction payment={row.original} />,
    enableGlobalFilter: false,
  },
];

function PaymentOptionAction({ payment }: { payment: PaymentOption }) {
  return (
    <div className="flex gap-2">
      <DeletePaymentOptionForm payment={payment} />
      <EditPaymentOptionForm payment={payment} />
    </div>
  );
}
