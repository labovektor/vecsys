export type ParticipantProgressStep =
  | "registered"
  | "categorized"
  | "paid"
  | "verified"
  | "select_institution"
  | "fill_biodatas"
  | "locked";

export type Participant = {
  id: string;
  event_id: string;
  region_id: string;
  category_id: string;
  name: string;
  institution_id: string;
  email: string;
  progress_step: ParticipantProgressStep;
  created_at: "2025-04-29T20:48:13.96622+07:00";
  updated_at: "2025-04-29T20:48:13.978481+07:00";
};
