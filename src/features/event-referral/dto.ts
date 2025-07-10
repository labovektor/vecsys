export type EventReferral = {
  id: string;
  event_id: string;
  code: string;
  desc: string;
  seat_available: number;
  is_discount: boolean;
  discount: number;
  created_at: string;
  updated_at: string;
}