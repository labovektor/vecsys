import { beautifyDate } from "@/lib/utils";
import type { IColumn } from "json-as-xlsx";

interface ExcelParticipantRow {
  no?: string;
  name?: string;
  region?: { name: string } | null;
  category?: { name: string } | null;
  progress_step?: string;
  verified_at?: string | null;
}

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
    value: (row: ExcelParticipantRow) => (row.region ? row.region.name : "-"),
  },
  {
    label: "Jenjang",
    value: (row: ExcelParticipantRow) =>
      row.category ? row.category.name : "-",
  },
  { label: "Status", value: "progress_step" },
  {
    label: "Verifikasi",
    value: (row: ExcelParticipantRow) =>
      row.verified_at
        ? beautifyDate(new Date(row.verified_at).toISOString(), "FULL")
        : "-",
  },
];

export const excelBiodataColumn: IColumn[] = [
  {
    label: "name",
    value: "name",
  },
  {
    label: "email",
    value: "email",
  },
  {
    label: "team_id",
    value: "participant_id",
  },
];
