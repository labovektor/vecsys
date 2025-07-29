import { beautifyDate } from "@/lib/utils";
import { IColumn } from "json-as-xlsx";

export const excelParticipantColumn: IColumn[] = [
  {
    label: "No",
    value: "no",
  },
  {
    label: "Nama Peserta",
    value: "name",
  },
  {
    label: "Region",
    value: (row) => (row.region ? (row.region as any).name : "-"),
  },
  {
    label: "Jenjang",
    value: (row) => (row.category ? (row.category as any).name : "-"),
  },
  { label: "Status", value: "progress_step" },
  {
    label: "Verifikasi",
    value: (row) =>
      row.verified_at
        ? beautifyDate(
            new Date(row.verified_at as string).toISOString(),
            "FULL"
          )
        : "-",
  },
];
