export type PaymentStep = "all" | "paid" | "unpaid";

export type Participant = {
  id: string;
  event_id: string;
  region_id: string;
  category_id: string;
  name: string;
  institution_id: string;
  email: string;
  progress_step: string;
  verified_at: string;
  locked_at: string;
  created_at: string;
  updated_at: string;
}